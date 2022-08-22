import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Markers from "./markers";

const WhiteScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background: white;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusBox = styled.div`
  width: 120px;
  height: 120px;
  background: #766ff6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;

  && * {
    color: white;
  }

  && > * + * {
    margin-top: 16px;
  }
`;

const Map = () => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapStyled, setMapStyled] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    /* Шаг 1: Основные настройки карты */
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g";

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/markkabierski/cl5pllom7000j14kf8hheb2au",
      zoom: 16,
      center: [135.762, 35.017],
      pitch: 60,
      antialias: true,
    });

    /* Шаг 2: Настройка контента карты */
    map.on("load", () => {
      setMap(map);
      setMapLoaded(true);

      const layers = map.getStyle().layers;

      /* Шаг 2.1: Выбираем слои и подчищаем лишние элементы */
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      for (const layer of layers) {
        if (layer.type === "symbol" && layer.layout["text-field"]) {
          // remove text labels
          map.removeLayer(layer.id);
        }
      }

      /* Шаг 2.2 Загружаем 3d слой */
      map.addLayer({
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#FCC8E7",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],

          "fill-extrusion-opacity": 0.5,
        },
      });

      setMapStyled(true);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      {!mapStyled && (
        <>
          <WhiteScreen>
            <StatusBox>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 32,
                      color: "white",
                    }}
                    spin
                  />
                }
              />
              <div style={{ fontSize: "12px", textAlign: "center" }}>
                Загружается карта
              </div>
            </StatusBox>
          </WhiteScreen>
        </>
      )}

      <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}>
        {map && mapLoaded && mapStyled && <>{<Markers map={map} />}</>}
      </div>
    </>
  );
};

export default Map;

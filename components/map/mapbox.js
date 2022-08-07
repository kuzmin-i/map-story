import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import RenderMarker from "./render-marker";
import LinePath from "./line";
import handleCustomLayer from "./three-model";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import styled from "styled-components";

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
  width: 150px;
  height: 150px;
  background: #0076ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 20px;

  && * {
    color: white;
  }

  && > * + * {
    margin-top: 16px;
  }
`;

const customLayers = [
  {
    url: "/models/castle23.gltf",
    scale: [100, 100, 100],
    mapPosition: [135.748214, 35.013913],
    rotation: [0, -3, 0],
    id: "castle 1",
  },
  {
    url: "/models/nijocastle1.gltf",
    scale: [20, 20, 20],
    mapPosition: [135.745898, 35.016557],
    rotation: [0, -45, 0],
    id: "nijotext",
  },

  {
    url: "/models/castle28.gltf",
    scale: [120, 120, 120],
    mapPosition: [135.763465, 35.023085],
    rotation: [0, 0, 0],
    id: "castle 27",
  },
  {
    url: "/models/imperialtext1.gltf",
    scale: [80, 80, 80],
    mapPosition: [135.767861, 35.029226],
    rotation: [0, 30, 0],
    id: "castle 278",
  },
];

const Map = () => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapStyled, setMapStyled] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g";

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/markkabierski/cl5pllom7000j14kf8hheb2au",
      zoom: 16,
      center: [135.762, 35.017],
      pitch: /*60*/ 60,
      antialias: true,
    });

    map.on("load", () => {
      setMap(map);
      setMapLoaded(true);

      customLayers.map((item = {}) => {
        return map.addLayer(handleCustomLayer({ ...item }));
      });

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      for (const layer of layers) {
        if (layer.type === "symbol" && layer.layout["text-field"]) {
          // remove text labels
          map.removeLayer(layer.id);
        }
      }

      map.addLayer({
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#FCC8E7",

          // Use an 'interpolate' expression to
          // add a smooth transition effect to
          // the buildings as the user zooms in.
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
        <WhiteScreen>
          <StatusBox>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 48,
                    color: "white",
                  }}
                  spin
                />
              }
            />
            <div>Map is loading</div>
          </StatusBox>
        </WhiteScreen>
      )}

      <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}>
        {map && mapLoaded && (
          <>
            {<RenderMarker map={map} />}
            {<LinePath map={map} /> }
          </>
        )}
      </div>
    </>
  );
};

export default Map;

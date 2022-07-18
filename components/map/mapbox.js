import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import RenderMarker from "./render-marker";
import LinePath from "./line";
import handleCustomLayer from "./three-model";

const customLayers = [
  {
    url: "/models/eif1.gltf",
    scale: [8, 8, 8],
    mapPosition: [148.9824, -35.39817],
    id: "eif",
  },
  {
    url: "/models/towe1.gltf",
    scale: [6, 6, 6],
    mapPosition: [148.9818, -35.39707],
    rotation: [0, 45, 0],
    id: "tower",
  },
  {
    url: "/models/text1.gltf",
    scale: [20, 20, 20],
    mapPosition: [148.9798, -35.39707],
    rotation: [0, 45, 0],
    id: "text",
  },
];

const Map = () => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g";

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/markkabierski/cl5pllom7000j14kf8hheb2au",
      zoom: 18,
      center: [148.9819, -35.3981],
      pitch: 60,
      antialias: true,
    });

    map.on("load", () => {
      setMap(map);
      setMapLoaded(true);

      customLayers.map((item = {}) => {
        return map.addLayer(handleCustomLayer({ ...item }));
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}>
      {map && mapLoaded && (
        <>
          <RenderMarker map={map} />
          <LinePath map={map} />
        </>
      )}
    </div>
  );
};

export default Map;

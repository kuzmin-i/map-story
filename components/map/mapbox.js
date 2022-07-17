import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import CustomLayer from "./threeLayer";
import CustomLayer1 from "./threeLayer1";
import RenderMarker from "./render-marker";
import LinePath from "./line";
import customLayer2 from "./threeLayer2";

const Map = () => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g";

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style:
        /* "mapbox://styles/thxena/cl4vk8ze7000z15o0hhc3t6ra" */ "mapbox://styles/markkabierski/cl5pllom7000j14kf8hheb2au",
      zoom: 18,
      center: [148.9819, -35.3981],
      pitch: 60,
      antialias: true,
    });

    map.on("load", () => {
      setMap(map);
      setMapLoaded(true);

      map.addLayer(CustomLayer /*, "waterway-label"*/);
      map.addLayer(CustomLayer1 /*, "waterway-label"*/);
      map.addLayer(customLayer2);
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

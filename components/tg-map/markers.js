import { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

import Marker from "./anim-marker";
import DefaultMarker from "./default-marker";

import points_positions from "../map/markers/data1.json";

const Markers = ({ map }) => {
  const markerRef = useRef();

  const [markersAdded, setMarkersAdded] = useState(false);

  /* Шаг 1: Добавление маркеров */
  useEffect(() => {
    if (map && !markersAdded) {
      const addMarkers = () => {
        const markerElement_0 = markerRef.current;

        /* Marker 0 */
        new mapboxgl.Marker(markerElement_0, { offset: [0, -60] })
          .setLngLat([135.763096, 35.019058])
          .addTo(map);
      };

      addMarkers();
    }
  }, [map, markersAdded]);

  return (
    <>
      {
        <div ref={markerRef}>
          <Marker isMe />
        </div>
      }
    </>
  );
};

export default Markers;

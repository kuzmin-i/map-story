import { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

import Marker from "./anim-marker";
import DefaultMarker from "./default-marker";

import points_positions from "../map/markers/data1.json";

const Markers1 = ({ map, selPin, setSelPin }) => {
  const [markersAdded, setMarkersAdded] = useState(false);

  const random_markers_count = 30;
  const random_markers_ref = useRef([]);

  /* Что то здесь делает */
  useEffect(() => {
    random_markers_ref.current = random_markers_ref.current.slice(
      0,
      random_markers_count
    );
  }, [random_markers_count]);

  /* Шаг 1: Добавление маркеров */
  useEffect(() => {
    if (map && !markersAdded) {
      const addMarkers = () => {
        /* randomMarkers */
        /*
        const s0 = [135.743556, 35.0341];
        const s1 = [135.777587, 34.999145];

        const generatedArray = Array(random_markers_count - 1).fill(1);

       const points_positions_ = [...generatedArray]
          .map((_, i) => {
            const position = [
              s0[0] + (s1[0] - s0[0]) * Math.random(),
              s0[1] + (s1[1] - s0[1]) * Math.random(),
            ];

            return position;
          })
          .sort((item = [], item1 = []) => {
            return item1[1] - item[1];
          });*/

        points_positions.map((item = {}, i) => {
          const localRef = random_markers_ref.current[i];

          const { points = [] } = item;

          new mapboxgl.Marker(localRef, { offset: [0, -30] })
            .setLngLat([...points])
            .addTo(map);
        });

        setMarkersAdded();
      };

      addMarkers();
    }
  }, [map, markersAdded, random_markers_count]);

  /* Механика приближения поинту */
  useEffect(() => {
    if (typeof selPin === "number" && map) {
      const selItem = points_positions[selPin];
      const { points = [] } = selItem;

      map.flyTo({
        center: [points[0], points[1] + 0.001],
        zoom: 18,
        essential: true,
      });
    } else {
      map.flyTo({
        zoom: 16,
        center: [135.762, 35.017],
        pitch: 60,
        essential: true,
      });
    }
  }, [selPin, points_positions, map]);

  return (
    <>
      {points_positions.map((item = {}, i) => {
        const { type, emotion } = item;

        return (
          <div
            key={`randomMarker::${i}`}
            ref={(el) => (random_markers_ref.current[i] = el)}
            onClick={() => setSelPin(i)}
          >
            <DefaultMarker {...{ type, emotion }} noAnimation />
          </div>
        );
      })}
    </>
  );
};

export default Markers1;

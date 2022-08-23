import { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

import Marker from "./anim-marker";
import DefaultMarker from "./default-marker";

import points_positions from "../map/markers/data1.json";

const Markers1 = ({ map }) => {
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
          });

        points_positions.map((item = {}, i) => {
          const localRef = random_markers_ref.current[i];

          const { points = [] } = item;

          new mapboxgl.Marker(localRef, { offset: [0, -60] })
            .setLngLat([...points])
            .addTo(map);
        });

        setMarkersAdded();
      };

      addMarkers();
    }
  }, [map, markersAdded, random_markers_count]);

  return (
    <>
      {points_positions.map((item = {}, i) => {
        const { type, emotion } = item;

        return (
          <div
            key={`randomMarker::${i}`}
            ref={(el) => (random_markers_ref.current[i] = el)}
          >
            <DefaultMarker {...{ type, emotion }} noAnimation />
          </div>
        );
      })}
    </>
  );
};

export default Markers1;

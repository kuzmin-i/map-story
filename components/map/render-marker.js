import { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import Marker from "./markers/test-marker";
import DefaultMarker from "./markers/marker";
import points_positions from "./markers/data1.json";

const RenderMarker = ({ map }) => {
  const markerRef = useRef();
  const markerStartRef = useRef();

  const [markersAdded, setMarkersAdded] = useState(false);

  const random_markers_count = 50;
  const random_markers_ref = useRef([]);

  useEffect(() => {
    random_markers_ref.current = random_markers_ref.current.slice(
      0,
      random_markers_count
    );
  }, [random_markers_count]);

  useEffect(() => {
    if (map && !markersAdded) {
      const addMarkers = () => {
        const markerElement_0 = markerRef.current;

        /* Marker 0 */
        new mapboxgl.Marker(markerElement_0, { offset: [0, -60] })
          .setLngLat([135.758949, 35.024473])
          .addTo(map);

        /* Marker 1 */
        const markerElement_1 = markerStartRef.current;

        new mapboxgl.Marker(markerElement_1, { offset: [0, -60] })
          .setLngLat([135.751996, 35.012765])
          .addTo(map);

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

  /*useEffect(() => {
    markerRef.current.style.zIndex = "999";
  }, []);*/

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

      <div ref={markerStartRef}>
        <Marker noAnimation />
      </div>

      {<div ref={markerRef}>
        <Marker isMe />
      </div>}
    </>
  );
};

export default RenderMarker;

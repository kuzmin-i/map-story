import { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import Marker from "./markers/test-marker";
import DefaultMarker from "./markers/marker";

const RenderMarker = ({ map }) => {
  const markerRef = useRef();
  const markerStartRef = useRef();

  const [markersAdded, setMarkersAdded] = useState(false);

  const random_markers_count = 30;
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
        /*new mapboxgl.Marker(markerElement_0, { offset: [0, -60] })
          .setLngLat([135.758949, 35.024473])
          .addTo(map);*/

        /* Marker 1 */
        const markerElement_1 = markerStartRef.current;

        new mapboxgl.Marker(markerElement_1, { offset: [0, -60] })
          .setLngLat([135.751996, 35.012765])
          .addTo(map);

        /* randomMarkers */
        const s0 = [135.7301041, 35.032881];
        const s1 = [135.766242, 34.992628];

        const generatedArray = Array(random_markers_count - 1).fill(1);

        const points_positions = [...generatedArray]
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

        generatedArray.map((_, i) => {
          const localRef = random_markers_ref.current[i];

          new mapboxgl.Marker(localRef, { offset: [0, -60] })
            .setLngLat([points_positions[i][0], points_positions[i][1]])
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
      {Array(random_markers_count - 1)
        .fill(1)
        .map((_, i) => {
          return (
            <div
              key={`randomMarker::${i}`}
              ref={(el) => (random_markers_ref.current[i] = el)}
              onChange={() => {
                console.log("sdf111s");
              }}
            >
              <DefaultMarker noAnimation />
            </div>
          );
        })}

      <div ref={markerStartRef}>
        <Marker noAnimation />
      </div>

      {/*<div ref={markerRef}>
        <Marker />
      </div>*/}
    </>
  );
};

export default RenderMarker;

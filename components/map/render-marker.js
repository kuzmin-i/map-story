import { useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import Marker from "./marker";

const RenderMarker = ({ map }) => {
  const markerRef = useRef();
  const markerStartRef = useRef();

  useEffect(() => {
    if (map) {
      const addMarker = () => {
        console.log("map", map);

        if (markerRef && markerRef.current) {
          const markerElement = markerRef.current;

          new mapboxgl.Marker(markerElement, { offset: [0, -60] })
            .setLngLat([135.758949, 35.024473])
            .addTo(map);
        }

        if (markerStartRef && markerStartRef.current) {
          const markerElement = markerStartRef.current;

          new mapboxgl.Marker(markerElement, { offset: [0, -60] })
            .setLngLat([135.751996, 35.012765])
            .addTo(map);
        }
      };

      addMarker();
    }
  }, [map, markerRef, markerStartRef]);

  useEffect(() => {
    if (markerRef && markerRef.current) {
      markerRef.current.style.zIndex = "999";
    }
  }, [markerRef]);

  return (
    <>
      <div ref={markerStartRef}>
        <Marker noAnimation />
      </div>

      <div ref={markerRef}>
        <Marker />
      </div>
    </>
  );
};

export default RenderMarker;

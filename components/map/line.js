import { useEffect, useState } from "react";

const LinePath = ({ map }) => {
  const [sourceAdded, setSourceAdded] = useState(false);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    ],
  };

  const speedFactor = 10;
  let animation;
  let startTime = 0;
  let progress = 0;
  let resetTime = false;

  function animateLine(timestamp) {
    if (resetTime) {
      startTime = performance.now() - progress;
      resetTime = false;
    } else {
      progress = timestamp - startTime;
    }

    if (progress > speedFactor * 360) {
      startTime = timestamp;
      geojson.features[0].geometry.coordinates = [];
    } else {
      const realProgress = progress / speedFactor;

      const xy1 = [135.758949, 35.024473];
      const xy0 = [135.751996, 35.012765];

      const x = xy0[0] + (xy1[0] - xy0[0]) * (realProgress / 360);
      const y = xy0[1] + (xy1[1] - xy0[1]) * (realProgress / 360);

      if (realProgress) {
        geojson.features[0].geometry.coordinates.push([x, y]);
      }

      if (map && map.getSource("line")) {
        map.getSource("line").setData(geojson);
      }
    }

    animation = requestAnimationFrame(animateLine);
  }

  useEffect(() => {
    if (map && !sourceAdded) {
      if (!map.getSource("line")) {
        map.addSource("line", {
          type: "geojson",
          data: geojson,
        });
      }

      if (!map.getSource("line-animation")) {
        map.addLayer({
          id: "line-animation",
          type: "line",
          source: "line",
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#ed6498",
            "line-width": 20,
            "line-opacity": 0.8,
          },
        });
      }

      startTime = performance.now();

      animateLine();
    }

    setSourceAdded(true);
  }, [sourceAdded, map]);

  return <></>;
};

export default LinePath;

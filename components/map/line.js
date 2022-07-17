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

  const speedFactor = 10; // number of frames per longitude degree
  let animation; // to store and cancel the animation
  let startTime = 0;
  let progress = 0; // progress = timestamp - startTime
  let resetTime = false; // indicator of whether time reset is needed for the animation

  function animateLine(timestamp) {
    if (resetTime) {
      // resume previous progress
      startTime = performance.now() - progress;
      resetTime = false;
    } else {
      progress = timestamp - startTime;
    }

    // restart if it finishes a loop
    if (progress > speedFactor * 360) {
      startTime = timestamp;
      geojson.features[0].geometry.coordinates = [];
    } else {
      const realProgress = progress / speedFactor;

      const xy0 = [148.98172, -35.39824];
      const xy1 = [148.97972, -35.39624];

      const x = xy0[0] + (xy1[0] - xy0[0]) * (realProgress / 360);
      const y = xy0[1] + (xy1[1] - xy0[1]) * (realProgress / 360);

      // draw a sine wave with some math.
      //const y = Math.sin((x * Math.PI) / 90) * 40;
      // append new coordinates to the lineString
      if (realProgress) {
        geojson.features[0].geometry.coordinates.push([x, y]);
      }

      if (map && map.getSource("line")) {
        // then update the map
        map.getSource("line").setData(geojson);
      }
    }
    // Request the next frame of the animation.
    animation = requestAnimationFrame(animateLine);
  }

  useEffect(() => {
    console.log("sdfsf", sourceAdded);

    if (map && !sourceAdded) {
      if (!map.getSource("line")) {
        map.addSource("line", {
          type: "geojson",
          data: geojson,
        });
      }

      // add the line which will be modified in the animation
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

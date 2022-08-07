import React, { useEffect, useState } from "react";
import * as turf from "@turf/turf";
import { routes } from "../map/markers/data2";
import mapboxgl from "mapbox-gl";

const Animation = ({ map }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (map && !loaded) {
      if (!map.getSource("trace") && !map.getSource("line-trace")) {
        // this is the path the camera will look at
        const targetRoute = routes.target;
        // this is the path the camera will move along
        const cameraRoute = routes.camera;

        /* Trace */
        map.addSource("trace", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: targetRoute,
            },
          },
        });

        map.addLayer({
          type: "line-trace",
          source: "trace",
          id: "line",
          paint: {
            "line-color": "orange",
            "line-width": 5,
          },
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
        });

        /* ******************************************************************* */
        const animationDuration = 60000;
        const cameraAltitude = 200;
        // get the overall distance of each route so we can interpolate along them
        const routeDistance = turf.lineDistance(turf.lineString(targetRoute));
        const cameraRouteDistance = turf.lineDistance(
          turf.lineString(cameraRoute)
        );

        let start;

        function frame(time) {
          if (!start) start = time;
          // phase determines how far through the animation we are
          const phase = (time - start) / animationDuration;

          // phase is normalized between 0 and 1
          // when the animation is finished, reset start to loop the animation
          if (phase > 1) {
            // wait 1.5 seconds before looping
            setTimeout(() => {
              start = 0.0;
            }, 1500);
          }

          // use the phase to get a point that is the appropriate distance along the route
          // this approach syncs the camera and route positions ensuring they move
          // at roughly equal rates even if they don't contain the same number of points
          const alongRoute = turf.along(
            turf.lineString(targetRoute),
            routeDistance * phase
          ).geometry.coordinates;

          const alongCamera = turf.along(
            turf.lineString(cameraRoute),
            cameraRouteDistance * phase
          ).geometry.coordinates;

          const camera = map.getFreeCameraOptions();

          // set the position and altitude of the camera
          camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            {
              lng: alongCamera[0] - 0.005 * Math.cos(phase * 4),
              lat: alongCamera[1] - 0.005 * Math.sin(phase * 4),
            },
            cameraAltitude
          );

          // tell the camera to look at a point along the route
          camera.lookAtPoint({
            lng: alongRoute[0],
            lat: alongRoute[1],
          });

          map.setFreeCameraOptions(camera);

          window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);

        setLoaded(true);

        /* ********************************************************************* */
      }
    }
  }, [map]);

  return <></>;
};

export default Animation;

import mapboxgl from "mapbox-gl";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
  Vector3,
} from "three";
extend({
  PerspectiveCamera,
  Scene,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
  Vector3,
});

const handleModelTransform = (modelOrigin = []) => {
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 0, 0];

  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  return modelTransform;
};

const handleCustomLayer = ({
  url = "",
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  mapPosition = [148.9824, -35.39817],
  id = 0,
}) => {
  const modelTransform = handleModelTransform(mapPosition);

  return {
    id: `three-model:${id}`,
    type: "custom",
    renderingMode: "3d",
    onAdd: function (map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, -70, 100).normalize();
      this.scene.add(directionalLight);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff);
      directionalLight2.position.set(0, 70, 100).normalize();
      directionalLight2.intensity = 1;
      this.scene.add(directionalLight2);

      const loader = new GLTFLoader();
      loader.load(url, (gltf) => {
        gltf.scene.scale.x = scale[0];
        gltf.scene.scale.y = scale[1];
        gltf.scene.scale.z = scale[2];

        gltf.scene.rotation.x = (rotation[0] * Math.PI) / 180;
        gltf.scene.rotation.y = (rotation[1] * Math.PI) / 180;
        gltf.scene.rotation.z = (rotation[2] * Math.PI) / 180;

        gltf.scene.traverse((child) => {
          /*if (child.isMeshe)*/
          child.material = new THREE.MeshStandardMaterial({
            color: 0x8f00ff,
            transparent: true,
            opacity: 0.6,
          });
          /* */
        });

        this.scene.add(gltf.scene);
      });
      this.map = map;

      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.resetState();
      this.renderer.render(this.scene, this.camera);
      this.map.triggerRepaint();
    },
  };
};

export default handleCustomLayer;

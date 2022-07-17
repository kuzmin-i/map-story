import { useState, useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Mesh, BoxGeometry, MeshStandardMaterial, AmbientLight } from "three";

extend({ Mesh, MeshStandardMaterial, BoxGeometry, AmbientLight });

export default function ThreeFibreModel(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ gl, scene, camera, mouse, viewport }, delta) => {
    mesh.current.rotation.x += 0.01;
    // console.log(mouse.x, mouse.y, viewport);
    gl.resetState();
    gl.render(scene, camera);
  }, 1);
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
      <ambientLight />
      <mesh
        {...props}
        ref={mesh}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => {
          setHover(true);
        }}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    </>
  );
}

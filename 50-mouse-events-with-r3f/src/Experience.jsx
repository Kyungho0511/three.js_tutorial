import { useFrame } from "@react-three/fiber";
import { meshBounds, OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { SRGBColorSpace } from "three";

export default function Experience() {
  const hamburger = useGLTF("./hamburger.glb");
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const clickHandler = (e) => {
    cube.current.material.color.setRGB(
      Math.random(),
      Math.random(),
      Math.random(),
      SRGBColorSpace
    );
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onPointerEnter={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        raycast={meshBounds} // meshbounds is great for performance (only works with a single mesh)
        position-x={2}
        scale={1.5}
        onClick={clickHandler}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        onClick={(e) => e.stopPropagation()}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e.object.name);
        }}
      />
    </>
  );
}

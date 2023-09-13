import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls: OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    // rotate around camera looking at the origin
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
    cubeRef.current.rotation.y += delta * 2;
    groupRef.current.rotation.y -= delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={2} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh ref={cubeRef} position={[-3, 0, 0]} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          rotation={[Math.PI * 0.25, 0, 0]}
          position={[2, 0, 0]}
          scale={[1, 1.5, 1]}
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="red" wireframe />
        </mesh>
      </group>
      <mesh position-y={-2} rotation-x={-Math.PI * 0.5} scale={15}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <CustomObject />
    </>
  );
}

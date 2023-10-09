import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Lights() {
  const light = useRef();

  useFrame((state) => {
    // move both light and target position forawrd so that shadow map is not wasted behind the camera
    light.current.position.z = state.camera.position.z + 1 - 4;
    light.current.target.position.z = state.camera.position.z - 4;
    // three.js only updates matrix of those objects in the scene
    // light target should be added to the scene to update its matrix(position, rotation, scale)
    // otherwise, we can manually update matrix of light target here
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}

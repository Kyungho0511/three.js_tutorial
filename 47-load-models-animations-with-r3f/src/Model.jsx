import { Clone, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model() {
  const model = useGLTF("./hamburger-draco.glb");
  // const model = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("./draco");
  //   loader.setDRACOLoader(dracoLoader);
  // });
  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />;
      <Clone object={model.scene} scale={0.35} position-x={0} />;
      <Clone object={model.scene} scale={0.35} position-x={4} />;
    </>
  );
}

useGLTF.preload("./hamburger-draco.glb");

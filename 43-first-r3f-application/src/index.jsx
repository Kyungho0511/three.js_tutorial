import "./style.css";
import { Canvas } from "@react-three/fiber";
import ReactDOM from "react-dom/client";
import Experience from "./Experience";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    // dpr={[1, 2]}
    // gl={{
    //   antialias: true,
    //   toneMapping: THREE.ACESFilmicToneMapping,
    // }}
    orthographic
    camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6], zoom: 80 }}
  >
    <Experience />
  </Canvas>
);

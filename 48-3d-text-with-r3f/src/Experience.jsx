import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";

export default function Experience() {
  const donutsGroup = useRef();
  const [torusGeometry, setTorusGeometry] = useState();
  const [torusMaterial, setTorusMaterial] = useState();
  const [matcapTexture] = useMatcapTexture("E6BF3C_5A4719_977726_FCFC82", 256);

  useFrame((state, delta) => {
    donutsGroup.current.children.map((donut) => {
      donut.rotation.y += delta * 0.2;
    });
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello R3F
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setTorusMaterial} matcap={matcapTexture} />
      <group ref={donutsGroup}>
        {[...Array(100)].map((value, index) => (
          <mesh
            key={index}
            geometry={torusGeometry}
            material={torusMaterial}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
}

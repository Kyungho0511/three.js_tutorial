import {
  Float,
  Environment,
  useGLTF,
  PresentationControls,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <>
      <Environment preset="city" />

      <color args={["#241a1a"]} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 1.5, tension: 200 }}
        // snap={{ mass: 5, tension: 200 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={15}
            color={"white"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              className="htmlScreen"
              transform
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://kyungho0511.github.io/digital_volatility/"></iframe>
            </Html>
          </primitive>
          <Text
            fontSize={0.7}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign="center"
          >
            KLEE ARCH
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export default function Experience() {
  const [hitSound] = useState(() => new Audio("./hit.mp3"));

  const cube = useRef();
  const twister = useRef();

  const cubeJump = () => {
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    });
  };

  // Twister kinetics
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 4, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const x = Math.cos(time * 0.5) * 2;
    const z = Math.sin(time * 0.5) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  // Performant way to create many cubes (using R3F)
  // Update instancedMesh shader matrix4(translation, rotation, scale)
  const cubesCountR3F = 3;
  const cubes = useRef();
  useEffect(() => {
    for (let i = 0; i < cubesCountR3F; i++) {
      const matrix = new THREE.Matrix4();
      matrix.compose(
        new THREE.Vector3(i * 2 + 5, 0, 0), // translation
        new THREE.Quaternion(), // rotation
        new THREE.Vector3(1, 1, 1) // scale
      );
      cubes.current.setMatrixAt(i, matrix);
    }
  }, []);

  // Performant and simple way to create many cubes with physics (using R3F Rafier)
  const cubesCountR3FRapier = 100;
  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCountR3FRapier; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }

    return instances;
  }, []);

  const collisionEnter = () => {
    hitSound.currentTime = 0;
    // hitSound.play();
  };

  const hamburger = useGLTF("./hamburger.glb");

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug={false} gravity={[0, -9.81, 0]}>
        {/* SPHERE */}
        <RigidBody colliders="ball" gravityScale={0.08}>
          <mesh castShadow position={[-4, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* TORUS */}
        <RigidBody colliders="trimesh">
          <mesh
            castShadow
            position={[-4, 1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        {/* CUBE */}
        <RigidBody
          ref={cube}
          restitution={1}
          friction={0.7}
          colliders={false}
          position={[0, 0, 4]}
          onCollisionEnter={collisionEnter}
          // onCollisionExit={() => console.log("exit!")}
          // onSleep={() => console.log("sleep!")}
          // onWake={() => console.log("wake!")}
        >
          <mesh castShadow onClick={cubeJump}>
            <CuboidCollider mass={10} args={[0.5, 0.5, 0.5]} />
            <boxGeometry />
            <meshStandardMaterial color="white" />
          </mesh>
        </RigidBody>

        {/* RED TWISTER */}
        <RigidBody
          type="kinematicPosition"
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
        >
          <mesh castShadow scale={[0.4, 0.4, 4]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        {/* WALLS*/}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        {/* HAMBURGER */}
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <CylinderCollider args={[0.5, 1.25]} />
          <primitive object={hamburger.scene} scale={0.25} />
        </RigidBody>

        {/* CUBE INSTANCES using R3F */}
        <instancedMesh
          ref={cubes}
          castShadow
          args={[null, null, cubesCountR3F]}
        >
          <boxGeometry />
          <meshStandardMaterial color="tomato" />
        </instancedMesh>

        {/* CUBE INSTANCES using R3F Rapier */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh castShadow args={[null, null, cubesCountR3FRapier]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>

        {/* GROUND */}
        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}

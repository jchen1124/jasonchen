import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { exp } from "three/tsl";

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;

    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.color.set("purple");
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 200, 32]} />
      <meshStandardMaterial emissive="white" emissiveIntensity={0.4} />
    </mesh>
  );
}

const GeometricScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <TorusKnot />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default GeometricScene;

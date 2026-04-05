import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function WavePlane() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const geometry = meshRef.current.geometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      const z =
        Math.sin(x * 0.4 + time) * 0.4 +
        Math.cos(y * 0.4 + time) * 0.4;

      position.setZ(i, z);
    }

    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial
        color="#ff6b00"
        wireframe
        transparent
        opacity={0.08}   // 👈 softer (important)
      />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <Canvas
      camera={{ position: [0, 10, 12] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.5} />
      <WavePlane />
    </Canvas>
  );
}
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Edges } from '@react-three/drei';

function WireframeCube() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.4;
    ref.current.rotation.y = clock.getElapsedTime() * 0.6;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshBasicMaterial color="#0a1628" transparent opacity={0.3} />
      <Edges scale={1} threshold={15} color="#00d4ff" />
    </mesh>
  );
}

function InnerCube() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = -clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = -clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshBasicMaterial color="#0d1520" transparent opacity={0.5} />
      <Edges scale={1} threshold={15} color="#7c3aed" />
    </mesh>
  );
}

export default function FloatingCube({ height = '200px' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: '100%', height }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <WireframeCube />
      <InnerCube />
    </Canvas>
  );
}

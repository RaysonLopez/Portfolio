import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Partículas de red orbitando ──
function NetworkParticles() {
  const ref = useRef();
  const count = 2000;

  // Distribución esférica de partículas
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi   = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const r     = 1.5 + Math.random() * 0.8;
    positions[i * 3]     = r * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    ref.current.rotation.x = mouse.y * 0.2;
    ref.current.rotation.z = mouse.x * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// ── Anillo exterior ──
function OuterRing() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = Math.PI / 4 + Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
  });

  const curve = new THREE.TorusGeometry(2.2, 0.003, 16, 180);
  return (
    <mesh ref={ref} geometry={curve}>
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
    </mesh>
  );
}

// ── Anillo interior ──
function InnerRing() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
    ref.current.rotation.x = -Math.PI / 6;
  });
  const geo = new THREE.TorusGeometry(1.8, 0.002, 16, 120);
  return (
    <mesh ref={ref} geometry={geo}>
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.35} />
    </mesh>
  );
}

export default function NetworkGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d4ff" />
      <NetworkParticles />
      <OuterRing />
      <InnerRing />
    </Canvas>
  );
}

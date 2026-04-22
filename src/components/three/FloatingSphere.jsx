import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function SphereMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
      
      {/* Inner solid sphere to give it body */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#050a0f" />
      </mesh>
      
      {/* Outer subtle glow sphere */}
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.15} />
      </mesh>
    </mesh>
  );
}

export default function FloatingSphere({ height = '200px' }) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <SphereMesh />
      </Canvas>
    </div>
  );
}

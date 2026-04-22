import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function TorusKnotMesh() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.9, 0.3, 64, 8, 2, 3]} />
      <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.6} />
      
      <mesh>
        <torusKnotGeometry args={[1.0, 0.1, 64, 8, 2, 3]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
      </mesh>
    </mesh>
  );
}

export default function FloatingTorusKnot({ height = '200px' }) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <TorusKnotMesh />
      </Canvas>
    </div>
  );
}

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function PyramidMesh() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    
    if (innerRef.current) {
        innerRef.current.rotation.y -= delta * 0.8;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <coneGeometry args={[1.5, 2.5, 4]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.7} />
      </mesh>
      
      <mesh ref={innerRef} position={[0, -0.3, 0]}>
        <coneGeometry args={[0.8, 1.3, 4]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function FloatingPyramid({ height = '200px' }) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <PyramidMesh />
      </Canvas>
    </div>
  );
}

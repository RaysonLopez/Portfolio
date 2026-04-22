import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RingsMesh() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state, delta) => {
    ring1.current.rotation.x += delta * 0.4;
    ring1.current.rotation.y += delta * 0.5;
    
    ring2.current.rotation.x -= delta * 0.3;
    ring2.current.rotation.z += delta * 0.6;
    
    ring3.current.rotation.y -= delta * 0.5;
    ring3.current.rotation.z -= delta * 0.2;
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[1.4, 0.05, 16, 64]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.1, 0.05, 16, 64]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[0.8, 0.05, 16, 64]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.8} />
      </mesh>
      
      {/* Center dot */}
      <mesh>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function FloatingRings({ height = '200px' }) {
  return (
    <div style={{ height, width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <RingsMesh />
      </Canvas>
    </div>
  );
}

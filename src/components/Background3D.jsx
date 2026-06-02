import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';

function MapPin({ position, scale, color, scrollYProgress }) {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    const scroll = scrollYProgress.get();
    group.current.rotation.y = scroll * Math.PI * 4 + state.clock.elapsedTime * 0.2;
    // Bouncing effect based on scroll
    group.current.position.y = position[1] + Math.sin(scroll * Math.PI * 8) * 0.5;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Top Sphere of the pin */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Bottom Cone of the pin */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.8, 2, 32]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Inner hole */}
      <mesh position={[0, 1.2, 0.75]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
    </group>
  );
}

function NavArrow({ position, scale, color, scrollYProgress }) {
  const group = useRef();
  
  useFrame((state) => {
    if (!group.current) return;
    const scroll = scrollYProgress.get();
    group.current.rotation.x = scroll * Math.PI * 2;
    group.current.rotation.z = state.clock.elapsedTime * 0.5;
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={[Math.PI/2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0, 1, 2, 3]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function Background3D({ scrollYProgress }) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <spotLight position={[-10, -10, 10]} intensity={1} color="#E54E57" />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <MapPin position={[4, 2, -5]} scale={1.5} color="#E54E57" scrollYProgress={scrollYProgress} />
        </Float>

        <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
          <NavArrow position={[-5, 0, -8]} scale={2} color="#005F56" scrollYProgress={scrollYProgress} />
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
           <MapPin position={[-3, -4, -10]} scale={1} color="#F8E71C" scrollYProgress={scrollYProgress} />
        </Float>

      </Canvas>
    </div>
  );
}

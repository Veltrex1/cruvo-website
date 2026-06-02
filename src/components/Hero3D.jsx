import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

// A stylized abstract shape representing the 'C' logo or a curving road
function AbstractRoad() {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <meshStandardMaterial 
          color="#E54E57" 
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <section id="hero" style={{ height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#005F56" />
          <AbstractRoad />
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Canvas>
      </div>
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', lineHeight: 1.1 }}
        >
          The Road is <br/>
          <span style={{ color: 'var(--coral-red)' }}>better in Pack.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', textAlign: 'center', marginBottom: '2.5rem' }}
        >
          The social and navigation app built for the motorcycle community. Zero Downtime. Maximum Miles.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ pointerEvents: 'auto' }}
        >
          <button className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            Get Cruvo
          </button>
        </motion.div>
      </div>
    </section>
  );
}

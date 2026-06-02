import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF } from '@react-three/drei';

function MotorcycleWheel(props) {
  const wheelRef = useRef();
  // Load the GLB model from the public folder
  const { scene } = useGLTF('/koenigsegg_tyre.glb');

  useFrame((state, delta) => {
    // Spin the wheel rapidly like it's rolling
    wheelRef.current.rotation.z -= delta * 15;
    // Gentle floating motion
    wheelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    // Slight tilt to see the tread and rim
    wheelRef.current.rotation.y = 0.4;
    wheelRef.current.rotation.x = -0.1;
  });

  return (
    <group ref={wheelRef} {...props}>
      {/* If the model is lying flat, we can stand it up by rotating the primitive. For now, we adjust scale. */}
      <primitive object={scene} scale={0.6} />
    </group>
  );
}

// Pre-cache the model so it loads instantly during the splash screen
useGLTF.preload('/koenigsegg_tyre.glb');

export default function Preloader({ onComplete }) {
  const [loadingText, setLoadingText] = useState("Starting engines...");
  const texts = ["Starting engines...", "Mapping the curves...", "Connecting the crew...", "Ready to ride."];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < texts.length) {
        setLoadingText(texts[index]);
      }
      if (index === texts.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Wait a bit on the last text before triggering exit
      }
    }, 800);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--snowdrift)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      {/* <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Environment preset="studio" />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff" />
          
          <MotorcycleWheel position={[0, 0, 0]} />
          
          <ContactShadows position={[0, -1.9, 0]} opacity={0.15} scale={8} blur={2.5} far={4} color="#000" />
        </Canvas>
      </div> */}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        {/* Coral Red Brand Logo */}
        <img src="/logos/Logomark - Coral Red.svg" alt="Cruvo Loading" style={{ height: '40px', marginBottom: '1.5rem' }} />

        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              color: 'var(--coral-red)',
              fontFamily: 'var(--font-axiforma)',
              fontSize: '1.2rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>

    </motion.div>
  );
}

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Sphere, Instances, Instance, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --------------------------------------------------------
// MOON COMPONENT
// --------------------------------------------------------
const Moon = ({ distance, speed, size, color }) => {
  const moonRef = useRef();
  const [startAngle] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={moonRef} rotation={[0, startAngle, 0]}>
      <group position={[distance, 0, 0]}>
        <Sphere args={[size, 16, 16]}>
          <meshStandardMaterial color={color} roughness={0.9} emissive={color} emissiveIntensity={0.2} />
        </Sphere>
      </group>
    </group>
  );
};

// --------------------------------------------------------
// THE PLANET COMPONENT
// --------------------------------------------------------
const SolarPlanet = ({ orbitRadius, orbitSpeed, size, color, name, label, hasMoon, moonColor }) => {
  const groupRef = useRef();
  const [hovered, setHover] = useState(false);
  const [rotationOffset] = useState(() => Math.random() * Math.PI * 2);
  const planetMeshRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * orbitSpeed;
    }
    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y += delta * 0.5; // planetary rotation
    }
  });

  return (
    <group>
      {/* Orbital Path Line (Visible Ring) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.03, orbitRadius + 0.03, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      <group ref={groupRef} rotation={[0, rotationOffset, 0]}>
        <group position={[orbitRadius, 0, 0]}>
          <group
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
          >
            {/* The Planet Sphere */}
            <Sphere ref={planetMeshRef} args={[size, 64, 64]}>
              <meshStandardMaterial 
                color={color} 
                roughness={0.7} 
                metalness={0.2} 
                emissive={color} 
                emissiveIntensity={hovered ? 0.6 : 0.05} 
              />
            </Sphere>
            
            {/* Atmosphere layer */}
            <Sphere args={[size * 1.25, 32, 32]}>
              <meshBasicMaterial color={color} transparent opacity={hovered ? 0.3 : 0.05} blending={THREE.AdditiveBlending} />
            </Sphere>

            {/* Optional Moon */}
            {hasMoon && (
              <Moon distance={size * 2.5} speed={1.5} size={size * 0.3} color={moonColor} />
            )}

            {/* Planet HUD / Label */}
            {hovered && (
              <Html distanceFactor={15} center 
                style={{
                  background: 'rgba(5, 5, 8, 0.9)', border: `1px solid ${color}`, boxShadow: `0 0 15px ${color}60`,
                  padding: '10px 15px', borderRadius: '10px', color: '#fff',
                  fontFamily: '"Fira Code", monospace', minWidth: '180px',
                  transform: 'translate3d(0, -60px, 0)', zIndex: 1000, pointerEvents: 'none'
                }}
              >
                <div style={{ color, fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>{name}</div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>{label}</div>
              </Html>
            )}
          </group>
        </group>
      </group>
    </group>
  );
};

// --------------------------------------------------------
// THE CENTER SUN (USER DETAILS)
// --------------------------------------------------------
const CenterSun = () => {
  const sunRef = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
      sunRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      <group 
        ref={sunRef}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
      >
        {/* Core Sun with realistic plasma distortion */}
        <Sphere args={[3, 128, 128]}>
          <MeshDistortMaterial 
            color="#ff5500" emissive="#ff3300" emissiveIntensity={1.5} 
            distort={0.3} speed={2} roughness={0.4}
          />
        </Sphere>
        {/* Inner Corona */}
        <Sphere args={[3.2, 64, 64]}>
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </Sphere>
        {/* Outer Heat Glow */}
        <Sphere args={[3.8, 64, 64]}>
          <meshBasicMaterial color="#ff3300" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </Sphere>

        {/* User Details Overlay (Only visible on hover) */}
        {hovered && (
          <Html distanceFactor={25} center 
            style={{
              background: 'rgba(10, 10, 15, 0.9)', border: '1px solid #ffcc00', boxShadow: '0 0 30px #ffcc0060',
              padding: '20px 30px', borderRadius: '15px', color: '#fff',
              fontFamily: '"Fira Code", monospace', textAlign: 'center', minWidth: '350px',
              pointerEvents: 'none', transform: 'translate3d(0, -100px, 0)'
            }}
          >
            <div style={{ color: '#ffcc00', fontWeight: '900', fontSize: '26px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Naveen Kumar
            </div>
            <div style={{ fontSize: '16px', color: '#ffaa00', marginTop: '8px', fontWeight: 'bold' }}>
              Software Engineer
            </div>
            <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.9, lineHeight: '1.4' }}>
              Information Technology Student<br/>
              Backend & AI Enthusiast
            </div>
          </Html>
        )}
      </group>

      {/* Sun Light Source */}
      <pointLight intensity={3} color="#ffffff" distance={200} decay={1.5} />
      <ambientLight intensity={0.05} />
    </group>
  );
};

// --------------------------------------------------------
// ASTEROID BELT (USING INSTANCED MESH)
// --------------------------------------------------------
const AsteroidBelt = ({ count = 300, orbitRadius = 13.5, spread = 1.2 }) => {
  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = orbitRadius + (Math.random() - 0.5) * spread;
      // Convert polar angle directly to x, z coordinates on extreme planar flat axis
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;
      const scale = 0.05 + Math.random() * 0.15;
      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
      temp.push({ position: [x, y, z], scale, rotation: rot });
    }
    return temp;
  }, [count, orbitRadius, spread]);

  const groupRef = useRef();
  useFrame((state, delta) => {
    if(groupRef.current) groupRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={groupRef}>
      <Instances limit={count} range={count}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#888888" roughness={1} metalness={0.1} />
        {asteroids.map((ast, i) => (
          <Instance key={i} position={ast.position} scale={ast.scale} rotation={ast.rotation} />
        ))}
      </Instances>
    </group>
  );
};

// --------------------------------------------------------
// THE SOLAR SYSTEM ROOT
// --------------------------------------------------------
const SolarSystem = () => {
  return (
    <group>
      <CenterSun />

      {/* Inner Planets - Fundamentals */}
      <SolarPlanet orbitRadius={6} orbitSpeed={0.8} size={0.3} color="#e34c26" name="HTML / CSS" label="Frontend Foundation" />
      <SolarPlanet orbitRadius={8} orbitSpeed={0.6} size={0.45} color="#f0db4f" name="JavaScript" label="Core Web Language" />
      
      {/* React has a small white moon */}
      <SolarPlanet orbitRadius={10} orbitSpeed={0.45} size={0.5} color="#61DBFB" name="React.js" label="UI Component Library" hasMoon={true} moonColor="#ffffff" />
      
      {/* Mid Planets - Backend & Databases */}
      <SolarPlanet orbitRadius={12} orbitSpeed={0.35} size={0.55} color="#8CC84B" name="Node.js" label="Backend Runtime" hasMoon={true} moonColor="#333333" />
      
      {/* THE ASTEROID BELT DIVIDING INNER/OUTER PLANETS */}
      <AsteroidBelt count={600} orbitRadius={14.5} spread={1.5} />

      <SolarPlanet orbitRadius={17} orbitSpeed={0.3} size={0.65} color="#306998" name="Python" label="AI & Data Pipelines" hasMoon={true} moonColor="#ffd43b" />
      <SolarPlanet orbitRadius={19.5} orbitSpeed={0.22} size={0.8} color="#f89820" name="Java" label="Enterprise Backend Systems" />
      
      {/* Outer Planets - Data & Infrastructure */}
      <SolarPlanet orbitRadius={22} orbitSpeed={0.18} size={0.5} color="#47A248" name="MongoDB" label="NoSQL Database" />
      <SolarPlanet orbitRadius={24} orbitSpeed={0.15} size={0.4} color="#00758F" name="SQL" label="Relational Database" />
      <SolarPlanet orbitRadius={26.5} orbitSpeed={0.12} size={0.6} color="#FFCA28" name="Firebase" label="BaaS & Real-Time Sync" />
      <SolarPlanet orbitRadius={29} orbitSpeed={0.1} size={0.35} color="#f1502f" name="Git / GitHub" label="Version Control System" />
    </group>
  );
};

// --------------------------------------------------------
// THE OVERLAY CONTAINER
// --------------------------------------------------------
const CyberObject = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'radial-gradient(circle at center, rgba(5, 5, 8, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)',
            backdropFilter: 'blur(15px)', zIndex: 40000, display: 'flex', 
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute', top: '40px', right: '40px', color: '#fff',
              fontFamily: '"Fira Code", monospace', fontSize: '16px', cursor: 'pointer',
              padding: '12px 24px', border: '1px solid rgba(255, 204, 0, 0.4)',
              borderRadius: '8px', background: 'rgba(255, 204, 0, 0.1)',
              zIndex: 40001, boxShadow: '0 0 20px rgba(255, 204, 0, 0.2)'
            }} 
            onClick={onClose}
          >
            [ EXIT UNIVERSE ]
          </motion.div>
          
          <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <Canvas camera={{ position: [0, 20, 50], fov: 55 }}>
              {/* Deep Space Background */}
              <Stars radius={300} depth={60} count={15000} factor={6} saturation={1} fade speed={1.5} />
              
              <SolarSystem />
              
              <OrbitControls 
                enableZoom={true} 
                maxDistance={80} 
                minDistance={8} 
                enablePan={true} 
                autoRotate={false} 
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>
          </div>
          
          <div style={{
            position: 'absolute', bottom: '40px', color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: '"Fira Code", monospace', textAlign: 'center', pointerEvents: 'none',
            fontSize: '15px', background: 'rgba(0,0,0,0.6)', padding: '15px 30px', 
            borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px' }}>
              [ PORTFOLIO SOLAR SYSTEM ]
            </span><br/><br/>
            Hover over the sun or planets for telemetry.<br/>
            Left Click: Adjust Camera Orbit | Scroll: Zoom In/Out
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CyberObject;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfrastructureMap = ({ isOpen, onClose }) => {
  const [activeNode, setActiveNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nodes = [
    { id: 'client', x: isMobile ? 100 : 100, y: isMobile ? 100 : 300, name: 'Client Browser', tech: 'React 19 / Vite', desc: 'The "entry point" where the UI is rendered and telemetry is captured.' },
    { id: 'edge', x: isMobile ? 300 : 300, y: isMobile ? 100 : 300, name: 'Vercel Edge', tech: 'Global CDN', desc: 'Distributed infrastructure that serves content from the nearest global node.' },
    { id: 'engine', x: isMobile ? 100 : 500, y: isMobile ? 250 : 200, name: 'React Engine', tech: 'Framer Motion / BS5', desc: 'State management, 3D orchestration, and terminal logic.' },
    { id: 'api', x: isMobile ? 300 : 500, y: isMobile ? 250 : 400, name: 'Serverless API', tech: 'Node.js / Vercel', desc: 'On-demand backend logic for contact handling and system logs.' },
    { id: 'analytics', x: isMobile ? 100 : 700, y: isMobile ? 400 : 150, name: 'Vercel Analytics', tech: 'Data Sink', desc: 'Captures real-time user metrics, performance vitals, and error tracking.' },
    { id: 'smtp', x: isMobile ? 300 : 700, y: isMobile ? 400 : 450, name: 'SMTP Node', tech: 'Nodemailer / Gmail', desc: 'Secure mailing layer for automated contact notifications.' },
  ];

  const connections = [
    { from: 'client', to: 'edge' },
    { from: 'edge', to: 'engine' },
    { from: 'edge', to: 'api' },
    { from: 'client', to: 'analytics' },
    { from: 'api', to: 'smtp' },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      className="infra-map-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(5, 5, 10, 0.98)', backdropFilter: 'blur(20px)',
        zIndex: 50000, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '100px 10px 20px' : '20px', overflowY: 'auto'
      }}
    >
      <div style={{ 
        position: isMobile ? 'fixed' : 'absolute', 
        top: isMobile ? '15px' : '30px', 
        left: isMobile ? '15px' : '40px',
        zIndex: 10
      }}>
        <h2 className="infra-title" style={{ 
          color: '#00f2ff', 
          fontWeight: '200', 
          margin: 0, 
          fontSize: isMobile ? '14px' : '24px' 
        }}>SYSTEM_TOPOLOGY</h2>
        <p style={{ color: '#AA367C', fontSize: '9px', margin: 0 }}>Live Architectural Schematic</p>
      </div>

      <div style={{ 
        position: isMobile ? 'fixed' : 'absolute', 
        top: isMobile ? '15px' : '30px', 
        right: isMobile ? '15px' : '40px', 
        display: 'flex', gap: '8px',
        zIndex: 10
      }}>
        <button 
          onClick={() => {
            setIsSimulating(true);
            setTimeout(() => setIsSimulating(false), 3000);
          }}
          disabled={isSimulating}
          style={{
            background: isSimulating ? 'rgba(0, 242, 255, 0.1)' : 'rgba(0, 242, 255, 0.05)',
            border: '1px solid #00f2ff', color: '#00f2ff',
            padding: isMobile ? '5px 12px' : '8px 20px', borderRadius: '50px', cursor: 'pointer',
            fontSize: isMobile ? '9px' : '11px', fontWeight: 'bold', letterSpacing: '1px'
          }}
        >
          {isSimulating ? 'RUNNING...' : isMobile ? 'SIMULATE' : 'SIMULATE_TRAFFIC'}
        </button>
        <button 
          onClick={onClose}
          style={{
            background: 'none', border: '1px solid #AA367C', color: '#AA367C',
            padding: isMobile ? '5px 12px' : '8px 20px', borderRadius: '50px', cursor: 'pointer',
            fontSize: isMobile ? '9px' : '12px'
          }}
        >
          {isMobile ? '✕' : 'CLOSE_MAP'}
        </button>
      </div>

      {/* SVG Map Container */}
      <div style={{ 
        width: isMobile ? '100%' : '850px', 
        height: isMobile ? '500px' : '600px', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg width="100%" height="100%" viewBox={isMobile ? "0 0 400 550" : "0 0 850 600"}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 242, 255, 0.03)" strokeWidth="1"/>
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            return (
              <g key={i}>
                <line 
                  x1={fromNode.x} y1={fromNode.y} 
                  x2={toNode.x} y2={toNode.y} 
                  stroke={isSimulating ? "rgba(0, 242, 255, 0.4)" : "rgba(0, 242, 255, 0.15)"} 
                  strokeWidth={isSimulating ? "2" : "1.5"} 
                />
                
                <motion.circle
                  r="1.5"
                  fill="#00f2ff"
                  animate={{
                    cx: [fromNode.x, toNode.x],
                    cy: [fromNode.y, toNode.y],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: isMobile ? 2 : 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                />

                {isSimulating && (
                  <motion.circle
                    r="3"
                    fill="#AA367C"
                    animate={{
                      cx: [fromNode.x, toNode.x],
                      cy: [fromNode.y, toNode.y],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: 3,
                      ease: "easeInOut"
                    }}
                    filter="url(#glow)"
                  />
                )}
              </g>
            );
          })}

          {nodes.map((node) => (
            <g 
              key={node.id} 
              onClick={() => setActiveNode(node)}
              onMouseEnter={() => !isMobile && setActiveNode(node)}
              style={{ cursor: 'pointer' }}
            >
              <motion.circle
                cx={node.x} cy={node.y} r={isMobile ? 22 : 28}
                fill="rgba(5, 5, 10, 0.9)"
                stroke={activeNode?.id === node.id ? "#AA367C" : "#00f2ff"}
                strokeWidth="2"
                whileHover={{ scale: 1.1 }}
                style={{ filter: activeNode?.id === node.id ? 'url(#glow)' : 'none' }}
              />
              <text 
                x={node.x} y={node.y + 4} 
                textAnchor="middle" 
                fill={activeNode?.id === node.id ? "#AA367C" : "#00f2ff"} 
                style={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold', fontFamily: 'monospace' }}
              >
                {node.id.substring(0, 1).toUpperCase()}
              </text>
              <text 
                x={node.x} y={node.y + (isMobile ? 38 : 48)} 
                textAnchor="middle" 
                fill="#fff" 
                style={{ fontSize: isMobile ? '8px' : '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>

        {/* Info Panel */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={isMobile ? { y: 100, opacity: 0 } : { x: 20, opacity: 0 }}
              animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={isMobile ? { y: 100, opacity: 0 } : { x: 20, opacity: 0 }}
              style={{
                position: isMobile ? 'fixed' : 'absolute', 
                bottom: isMobile ? '0' : 'auto', 
                top: isMobile ? 'auto' : '50%', 
                left: isMobile ? '0' : 'auto',
                right: isMobile ? '0' : '-100px',
                transform: isMobile ? 'none' : 'translateY(-50%)', 
                width: isMobile ? '100%' : '280px',
                background: isMobile ? 'rgba(10, 10, 15, 0.98)' : 'rgba(0,0,0,0.85)', 
                padding: '20px',
                borderLeft: isMobile ? 'none' : '4px solid #AA367C', 
                borderTop: isMobile ? '3px solid #AA367C' : 'none',
                borderRadius: isMobile ? '20px 20px 0 0' : '0 12px 12px 0',
                backdropFilter: 'blur(15px)',
                zIndex: 100
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ color: '#00f2ff', margin: '0 0 5px 0', fontSize: isMobile ? '16px' : '18px' }}>{activeNode.name}</h4>
                  <p style={{ color: '#AA367C', fontSize: '10px', fontWeight: 'bold', margin: '0 0 10px 0' }}>{activeNode.tech}</p>
                </div>
                {isMobile && (
                  <button 
                    onClick={() => setActiveNode(null)}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '20px' }}
                  >✕</button>
                )}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? '13px' : '12px', lineHeight: '1.5', margin: 0 }}>
                {activeNode.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!activeNode && (
        <div style={{ position: 'fixed', bottom: '40px', width: '100%', textAlign: 'center', zIndex: 5 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {isMobile ? 'Tap a node for documentation' : 'Select a node to view technical documentation'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default InfrastructureMap;

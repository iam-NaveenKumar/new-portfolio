import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemDashboard = ({ isOpen, onClose }) => {
  const [uptime, setUptime] = useState(0);
  const [latency, setLatency] = useState(0);
  const [logs, setLogs] = useState([
    { id: 1, text: 'System initialized...', type: 'info' },
    { id: 2, text: 'Observability layer active', type: 'success' }
  ]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);

    const pingInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 40 + 20));
      if (Math.random() > 0.8) {
        const events = [
          'Heartbeat detected',
          'Memory heap optimized',
          'Static assets served',
          'HMR signal received'
        ];
        const newLog = {
          id: Date.now(),
          text: events[Math.floor(Math.random() * events.length)],
          type: 'info'
        };
        setLogs(prev => [newLog, ...prev].slice(0, 5));
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const services = [
    { name: 'React 19', status: 'Operational', color: '#61DAFB' },
    { name: 'Framer Motion', status: 'Operational', color: '#FF0055' },
    { name: 'Vercel Analytics', status: 'Active', color: '#000000' },
    { name: 'Terminal CLI', status: 'Standby', color: '#AA367C' }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      style={{
        position: 'fixed', top: '100px', left: '20px',
        width: '280px', background: 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px', padding: '20px', zIndex: 9000,
        fontFamily: '"Fira Code", monospace', color: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
        <h3 style={{ fontSize: '14px', margin: 0, color: 'var(--accent-color)' }}>SYSTEM_HEALTH</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>✕</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>UPTIME</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatTime(uptime)}</div>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>LATENCY</div>
          <div style={{ color: latency < 40 ? '#4CAF50' : '#FFC107' }}>{latency}ms</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#888', marginBottom: '4px' }}>STATUS</div>
          <div style={{ color: '#4CAF50' }}>STABLE</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '10px', color: '#888', marginBottom: '8px' }}>SERVICES</div>
        {services.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px' }}>
            <span>{s.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }}
              />
              <span style={{ color: '#888' }}>{s.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ fontSize: '10px', color: '#888', marginBottom: '8px' }}>LIVE_LOGS</div>
        <div style={{ fontSize: '10px', height: '80px', overflow: 'hidden' }}>
          <AnimatePresence>
            {logs.map(log => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '4px', borderLeft: `2px solid ${log.type === 'success' ? '#4CAF50' : '#AA367C'}`, paddingLeft: '6px' }}
              >
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemDashboard;

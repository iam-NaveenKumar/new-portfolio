import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KernelLogs = () => {
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState({
    scrollY: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    mem: 'N/A',
    cores: navigator.hardwareConcurrency || 'unk',
    net: 'Detecting...',
    battery: 'Scanning...',
    fcp: 'Measuring...',
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lang: navigator.language,
    dpr: window.devicePixelRatio
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    // 1. Initial System Diagnostics
    const paintMetrics = performance.getEntriesByType('paint');
    const fcpEntry = paintMetrics.find(entry => entry.name === 'first-contentful-paint');
    const fcpTime = fcpEntry ? Math.round(fcpEntry.startTime) + 'ms' : 'N/A';

    setLogs([
      { id: 1, text: `[LOAD]: Page interactive in ${Math.round(performance.now())}ms`, type: 'info' },
      { id: 2, text: `[PERF]: First Contentful Paint: ${fcpTime}`, type: 'success' },
      { id: 3, text: `[HW]: Arch: ${navigator.platform} | Cores: ${metrics.cores}`, type: 'info' },
      { id: 4, text: `[LOC]: TZ: ${metrics.tz} | Lang: ${metrics.lang}`, type: 'info' }
    ]);

    // 2. Continuous Network Monitoring
    const updateNetwork = () => {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        setMetrics(prev => ({ ...prev, net: `${conn.effectiveType.toUpperCase()} | ${conn.downlink}Mbps | ${conn.rtt}ms RTT` }));
      }
    };
    updateNetwork();
    if (navigator.connection) navigator.connection.addEventListener('change', updateNetwork);

    // 3. Battery Awareness
    if (navigator.getBattery) {
      navigator.getBattery().then(bat => {
        const updateBattery = () => {
          setMetrics(prev => ({ ...prev, battery: `${Math.round(bat.level * 100)}% ${bat.charging ? '(Charging)' : '(Discharging)'}` }));
        };
        updateBattery();
        bat.addEventListener('levelchange', updateBattery);
        bat.addEventListener('chargingchange', updateBattery);
      });
    }

    // 4. Interaction & Event Handling
    const handleInspect = (e) => {
      const { name, width, height, top } = e.detail;
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      setLogs(prev => [...prev, {
        id: Date.now(),
        text: `[INSPECT]: <${name} /> [W:${width} H:${height} Y:${top}]`,
        type: 'success'
      }].slice(-50));
    };

    const handleMetrics = () => {
      setMetrics(prev => ({
        ...prev,
        scrollY: Math.round(window.scrollY),
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    window.addEventListener('scroll', handleMetrics);
    window.addEventListener('resize', handleMetrics);
    window.addEventListener('xray-inspect', handleInspect);

    // 5. Advanced System Events
    const handleVisibility = () => {
      setLogs(prev => [...prev, {
        id: Date.now(),
        text: `[SYS]: Focus ${document.hidden ? 'LOST' : 'GAINED'} (VisibilityChange)`,
        type: 'info'
      }].slice(-50));
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const navType = performance.getEntriesByType('navigation')[0]?.type || 'fresh';
    setLogs(prev => [...prev, { id: Date.now(), text: `[LOAD]: Entry Type detected: ${navType.toUpperCase()}`, type: 'info' }].slice(-50));

    const logInterval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      const realEvents = [
        `[SCROLL]: Current Y: ${Math.round(window.scrollY)}px`,
        `[DOM]: Live Node Count: ${document.querySelectorAll('*').length}`,
        `[MEM]: JS Heap: ${performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + 'MB' : 'Secured'}`,
        `[NET]: Online Status: ${navigator.onLine ? 'STABLE' : 'DROPPED'}`,
        `[PERF]: Frame composition sync (0.2ms)`
      ];
      
      setLogs(prev => [...prev, {
        id: Date.now(),
        text: `[${timestamp}] ${realEvents[Math.floor(Math.random() * realEvents.length)]}`,
        type: 'real'
      }].slice(-50));
    }, 2500);

    return () => {
      window.removeEventListener('scroll', handleMetrics);
      window.removeEventListener('resize', handleMetrics);
      window.removeEventListener('xray-inspect', handleInspect);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (navigator.connection) navigator.connection.removeEventListener('change', updateNetwork);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="kernel-logs-panel" style={{
      position: 'fixed', top: '100px', left: '20px',
      width: '320px', height: '400px', background: 'rgba(5, 5, 10, 0.95)',
      backdropFilter: 'blur(12px)', padding: '15px', borderRadius: '12px',
      borderLeft: '4px solid #00f2ff', borderTop: '1px solid rgba(255,255,255,0.1)',
      fontFamily: '"Fira Code", monospace', color: '#00f2ff',
      zIndex: 20002, display: 'flex', flexDirection: 'column',
      boxShadow: '0 10px 40px rgba(0,0,0,0.6)', pointerEvents: 'auto'
    }}>
      <div style={{ 
        marginBottom: '12px', fontWeight: 'bold', fontSize: '12px', 
        display: 'flex', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,242,255,0.3)', paddingBottom: '8px'
      }}>
        <span>CORE_DIAGNOSTICS_V5.0</span>
        <span style={{ color: '#AA367C', animation: 'pulsate 2s infinite' }}>● LIVE</span>
      </div>

      {/* Telemetry Dashboard Layer */}
      <div style={{ 
        fontSize: '9px', color: 'rgba(0, 242, 255, 0.7)', 
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
        background: 'rgba(0,242,255,0.05)', padding: '10px', borderRadius: '8px',
        marginBottom: '15px', border: '1px solid rgba(0,242,255,0.1)'
      }}>
        <div style={{ borderBottom: '1px solid rgba(0,242,255,0.1)' }}>NET: {metrics.net}</div>
        <div style={{ borderBottom: '1px solid rgba(0,242,255,0.1)' }}>PWR: {metrics.battery}</div>
        <div>VIEW: {metrics.width}x{metrics.height} (S:{metrics.scrollY})</div>
        <div>OS: {navigator.platform.split(' ')[0]} | DPR: {metrics.dpr}</div>
      </div>

      {/* Scrolling Logs */}
      <div 
        ref={scrollRef}
        style={{ 
          flexGrow: 1, overflowY: 'auto', fontSize: '9px', 
          lineHeight: '1.5', paddingRight: '8px'
        }}
      >
        <AnimatePresence initial={false}>
          {logs.map(log => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ 
                marginBottom: '6px', 
                borderLeft: `2px solid ${log.type === 'success' ? '#00f2ff' : log.type === 'info' ? '#AA367C' : 'rgba(0,242,255,0.2)'}`, 
                paddingLeft: '8px',
                color: log.type === 'success' ? '#fff' : log.type === 'info' ? 'rgba(0,242,255,0.8)' : '#00f2ff'
              }}
            >
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '8px', color: 'rgba(255,255,255,0.3)', textAlign: 'right', letterSpacing: '1px' }}>
        STREAM_BUFFER: {logs.length}/50_ENTRIES
      </div>
    </div>
  );
};

export default KernelLogs;

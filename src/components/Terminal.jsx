import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', content: 'Naveen Portfolio OS [Version 13.3.2026]' },
    { type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const commands = {
    help: 'Commands: about, stack, systems, projects, cv, secret, clear, exit',
    about: 'Naveen Kumar — Engineering student focused on building AI-powered learning systems and production-ready web backends. Interested in system design, LLM integrations, and scalable application architecture.',
    stack: () => {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      return 'Core stack: java, python, JavaScript, React, Node.js, Express, Firebase, REST APIs. Exploring: LLM APIs, routing strategies, performance optimization, and distributed AI inference.';
    },
    systems: 'Currently working on an AI Tutor platform with multi-model routing, adaptive content generation, quiz intelligence, and real-time chat assistance. Focus areas include latency control, API orchestration, and backend modularization.',
    projects: () => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return 'Navigating to Projects section...';
    },
    cv: () => {
      window.open('/Naveen_Kumar_Resume.pdf', '_blank');
      return 'Downloading CV...';
    },
    resume: () => {
      window.open('/Naveen_Kumar_Resume.pdf', '_blank');
      return 'Downloading Resume...';
    },
    contact: () => {
      document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
      return 'Instagram 🤫 : _i.am.naveen_ | Directing to contact section...';
    },
    clear: () => setHistory([]),
    secret: 'Hidden note.\n\nI am Naveen — a 20-year-old who genuinely enjoys technology and continuous learning.\nNaturally introverted, I spend most of my time building, experimenting, and trying to understand how real systems work.\n\nMy journey has not been perfectly planned. Studying in a place that did not fully match my expectations forced me to rely more on self-learning, online communities, and hands-on projects.\nThat struggle shaped my independence and persistence.\n\nI like helping people solve technical problems, sharing knowledge, and collaborating on ideas.\nIf you are curious about what I am building or want to discuss something interesting, type "contact".',
    exit: () => setIsOpen(false)
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      const newHistory = [...history, { type: 'input', content: `> ${input}` }];

      if (cmd === 'clear') {
        setHistory([]);
      } else if (commands[cmd]) {
        if (typeof commands[cmd] === 'function') {
          const result = commands[cmd]();
          if (result) {
            newHistory.push({ type: 'output', content: result });
            setHistory(newHistory);
          }
        } else {
          newHistory.push({ type: 'output', content: commands[cmd] });
          setHistory(newHistory);
        }
      } else if (cmd !== '') {
        newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type "help" for a list of commands.` });
        setHistory(newHistory);
      }

      setInput('');
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{
              position: 'fixed',
              bottom: '160px',
              right: '40px',
              background: 'var(--accent-color)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              zIndex: 9999,
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              pointerEvents: 'none'
            }}
          >
            Try my CLI! 🚀
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '18px',
              width: '12px',
              height: '12px',
              background: 'var(--accent-color)',
              transform: 'rotate(45deg)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        className="terminal-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '40px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        {isOpen ? '✕' : '>_'}
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="terminal-window"
            style={{
              position: 'fixed',
              bottom: '160px',
              right: '40px',
              width: '400px',
              maxWidth: '90vw',
              height: '300px',
              background: 'rgba(10, 10, 12, 0.95)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(170, 54, 124, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              zIndex: 9998,
              fontFamily: '"Fira Code", monospace',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            <div className="terminal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px', marginBottom: '10px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
              Developer Console
            </div>
            
            <div 
              ref={terminalRef}
              className="terminal-history" 
              style={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                marginBottom: '10px',
                fontSize: '14px',
                scrollbarWidth: 'none'
              }}
            >
              {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '8px', color: line.type === 'input' ? '#AA367C' : '#fff', opacity: line.type === 'system' ? 0.7 : 1 }}>
                  {line.content}
                </div>
              ))}
            </div>

            <div className="terminal-input-row" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#AA367C', marginRight: '8px' }}>&gt;</span>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  width: '100%',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;

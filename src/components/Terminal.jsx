import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = ({ setWeather, toggleDashboard, toggleXray }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', content: 'Naveen Portfolio OS [Version 13.3.2026]' },
    { type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: 'Commands: about, stack, systems, projects, cv, rain, snow, dashboard, xray, ping, ls, clear, exit',
    about: 'Naveen Kumar — Engineering student focused on building AI-powered learning systems and production-ready web backends.',
    stack: () => {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      return 'Core stack: Java, Python, JavaScript, React, Node.js, Express, Firebase. Exploring: LLM APIs, System Design.';
    },
    systems: 'Currently working on an AI Tutor platform with multi-model routing and adaptive content generation.',
    projects: () => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return 'Navigating to Projects section...';
    },
    ls: 'drwxr-xr-x  banner/  skills/  experience/  projects/  connect/  footer/',
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
      return 'Instagram: _i.am.naveen_ | Directing to contact section...';
    },
    rain: () => {
      setWeather('rain');
      return 'Rain initialized (15s). Type "end" to stop.';
    },
    snow: () => {
      setWeather('snow');
      return 'Snow initialized (15s). Type "end" to stop.';
    },
    dashboard: () => {
      toggleDashboard();
      return 'Toggling system health dashboard...';
    },
    stats: () => {
      toggleDashboard();
      return 'Toggling system health dashboard...';
    },
    xray: () => {
      toggleXray();
      return 'Toggle X-Ray structural Dev mode... Blueprints visible.';
    },
    ping: () => {
      return `PONG: ${Math.floor(Math.random() * 50 + 20)}ms`;
    },
    end: () => {
      setWeather(null);
      toggleXray(false);
      return 'All active effects and Dev modes cleared.';
    },
    clear: () => setHistory([]),
    exit: () => setIsOpen(false)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (input.trim()) {
      const match = Object.keys(commands).find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match && match !== input.toLowerCase()) {
        setSuggestion(match.slice(input.length));
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  }, [input]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      const newHistory = [...history, { type: 'input', content: `> ${input}` }];

      if (cmd !== '') {
        setCommandHistory(prev => [input, ...prev]);
        setHistoryIndex(-1);
      }

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
        newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Type "help" for a list.` });
        setHistory(newHistory);
      }

      setInput('');
      setSuggestion('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(input + suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
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
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{
              position: 'fixed', bottom: '160px', right: '40px',
              background: 'var(--accent-color)', color: '#fff',
              padding: '8px 16px', borderRadius: '12px', fontSize: '14px',
              fontWeight: '600', zIndex: 9999, boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              pointerEvents: 'none'
            }}
          >
            Try my CLI! 🚀
            <div style={{
              position: 'absolute', bottom: '-6px', right: '18px',
              width: '12px', height: '12px', background: 'var(--accent-color)',
              transform: 'rotate(45deg)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="terminal-toggle"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        style={{
          position: 'fixed', bottom: '100px', right: '40px',
          width: '50px', height: '50px', borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff',
          fontSize: '20px', cursor: 'pointer', zIndex: 30000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
      >
        {isOpen ? '✕' : '>_'}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="terminal-window"
            style={{
              position: 'fixed', bottom: '160px', right: '40px',
              width: '400px', maxWidth: '90vw', height: '300px',
              background: 'rgba(10, 10, 12, 0.95)', backdropFilter: 'blur(15px)',
              border: '1px solid rgba(170, 54, 124, 0.3)', borderRadius: '12px',
              padding: '20px', zIndex: 30000, fontFamily: '"Fira Code", monospace',
              display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px', marginBottom: '10px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
              Developer Console
            </div>
            
            <div ref={terminalRef} style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px', fontSize: '14px', scrollbarWidth: 'none' }}>
              {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '8px', color: line.type === 'input' ? '#AA367C' : '#fff', opacity: line.type === 'system' ? 0.7 : 1 }}>
                  {line.content}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <span style={{ color: '#AA367C', marginRight: '8px' }}>&gt;</span>
              <div style={{ position: 'relative', flexGrow: 1 }}>
                {suggestion && (
                  <div style={{
                    position: 'absolute', left: 0, top: 0, padding: '0',
                    color: 'rgba(255, 255, 255, 0.3)', pointerEvents: 'none',
                    fontSize: '14px', whiteSpace: 'pre'
                  }}>
                    <span style={{ visibility: 'hidden' }}>{input}</span>
                    {suggestion}
                  </div>
                )}
                <input 
                  ref={inputRef} type="text" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  style={{
                    background: 'transparent', border: 'none', color: '#fff',
                    width: '100%', outline: 'none', fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;

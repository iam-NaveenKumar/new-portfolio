import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react"
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Skills from './components/Skills';
import { Experience } from './components/Experience';
import {Projects} from './components/Projects';
import {Contact} from './components/Contact';
import {Footer} from './components/Footer';
import Terminal from './components/Terminal';
import WeatherEffects from './components/WeatherEffects';
import SystemDashboard from './components/SystemDashboard';
import KernelLogs from './components/KernelLogs';
import InfrastructureMap from './components/InfrastructureMap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeWeather, setActiveWeather] = useState(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isXrayMode, setIsXrayMode] = useState(false);
  const [isInfraMapOpen, setIsInfraMapOpen] = useState(false);

  useEffect(() => {
    if (activeWeather) {
      const timer = setTimeout(() => {
        setActiveWeather(null);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [activeWeather]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDashboard = () => {
    setIsDashboardOpen(prev => !prev);
  };

  const toggleXray = (value) => {
    setIsXrayMode(prev => (typeof value === 'boolean' ? value : !prev));
  };

  const toggleInfraMap = (value) => {
    setIsInfraMapOpen(prev => (typeof value === 'boolean' ? value : !prev));
  };

  // Component Inspector Logic
  const handleAppClick = (e) => {
    if (!isXrayMode) return;
    
    const component = e.target.closest('[data-component]');
    if (component) {
      const name = component.getAttribute('data-component');
      const rect = component.getBoundingClientRect();
      const info = {
        name,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top + window.scrollY)
      };
      
      // Dispatch custom event for KernelLogs
      const event = new CustomEvent('xray-inspect', { detail: info });
      window.dispatchEvent(event);
    }
  };

  return (
    <div 
      className={`App ${isXrayMode ? 'x-ray-active' : ''}`}
      onClick={handleAppClick}
    >
      {/* Structural Overlays (Fixed) */}
      <div className="x-ray-overlay" />
      
      <motion.div
        className="progress-bar"
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))',
          transformOrigin: '0%',
          zIndex: 10000
        }}
      />
      
      {/* 3D Content Layer */}
      <div className="x-ray-tilt-container">
        <NavBar />
        <Banner />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
      
      {/* Fixed UI Tools */}
      <div className="fixed-tools-layer" style={{ position: 'relative', zIndex: 10001 }}>
        <Terminal 
          setWeather={setActiveWeather} 
          toggleDashboard={toggleDashboard}
          toggleXray={toggleXray}
          toggleInfraMap={toggleInfraMap}
        />
        
        <WeatherEffects type={activeWeather} />
        
        <AnimatePresence>
          {isDashboardOpen && (
            <SystemDashboard 
              isOpen={isDashboardOpen} 
              onClose={() => setIsDashboardOpen(false)} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isXrayMode && <KernelLogs />}
      </AnimatePresence>

      <AnimatePresence>
        {isInfraMapOpen && (
          <InfrastructureMap 
            isOpen={isInfraMapOpen} 
            onClose={() => setIsInfraMapOpen(false)} 
          />
        )}
      </AnimatePresence>
      </div>

      <Analytics />

      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--accent-color)',
            color: '#fff',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}
        >
          ↑
        </motion.button>
      )}
    </div>
  );
}

export default App;

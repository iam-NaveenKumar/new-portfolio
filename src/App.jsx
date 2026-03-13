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
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeWeather, setActiveWeather] = useState(null);

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

  return (
    <div className="App">
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
      
      <NavBar />
      <Banner />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <Terminal setWeather={setActiveWeather} />
      <WeatherEffects type={activeWeather} />
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

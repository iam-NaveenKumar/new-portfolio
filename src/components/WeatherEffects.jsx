import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherEffects = ({ type }) => {
  if (!type) return null;

  const particleCount = type === 'rain' ? 100 : 50;
  const particles = Array.from({ length: particleCount });

  return (
    <div className="weather-overlay">
      <AnimatePresence>
        {particles.map((_, i) => (
          <motion.div
            key={`${type}-${i}`}
            className={`particle ${type}`}
            initial={{ 
              top: '-10%', 
              left: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            animate={{ 
              top: '110%',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: type === 'rain' ? 0.5 + Math.random() * 0.5 : 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WeatherEffects;

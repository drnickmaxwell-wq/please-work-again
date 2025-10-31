'use client';

import React, { useEffect, useRef, useState } from 'react';
import './scroll-cue.css';

export default function ScrollCue() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setScrollProgress(Math.min(progress, 100));
      
      // Reset idle state
      setIsIdle(false);
      
      // Clear existing timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      
      // Set new idle timer (5 seconds)
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 5000);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={`scroll-cue ${isIdle ? 'idle' : ''}`}>
      <div className="scroll-track">
        <div 
          className="scroll-indicator" 
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}


'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { easeInOutCubic, easeOutCubic, linearEase } from '@/lib/motion/easing';

// Dynamically import 3D components to enable code splitting
const ToothModelViewer = dynamic(() => import('@/components/3d/tooth-model-viewer'), {
  ssr: false,
  loading: () => <Lazy3DLoader />
});

interface Lazy3DModelProps {
  className?: string;
  posterSrc?: string;
}

// Luxury loading component with brand colors
const Lazy3DLoader = () => (
  <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-50 via-pink-25 to-teal-25 rounded-2xl flex items-center justify-center relative overflow-hidden">
    {/* Animated background pattern */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/10 via-teal-500/10 to-yellow-500/10 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/5 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-teal-500/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-yellow-500/5 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
    </div>

    {/* Loading content */}
    <div className="text-center z-10">
      {/* 3D Loading Icon */}
      <div className="relative mb-6">
        <motion.div
          animate={{ 
            rotateY: 360,
            rotateX: [0, 15, 0, -15, 0]
          }}
          transition={{
            rotateY: { duration: 3, repeat: Infinity, ease: linearEase },
            rotateX: { duration: 2, repeat: Infinity, ease: easeInOutCubic }
          }}
          className="w-16 h-16 mx-auto"
        >
          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-teal-500 rounded-lg shadow-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </motion.div>

        {/* Orbital rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: linearEase }}
          className="absolute inset-0 border-2 border-pink-200 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: linearEase }}
          className="absolute inset-2 border border-teal-200 rounded-full"
        />
      </div>

      {/* Loading text with brand fonts */}
      <h3 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
        Loading 3D Model
      </h3>
      <p className="text-slate-600 mb-4" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
        Preparing interactive dental visualization...
      </p>

      {/* Progress indicator */}
      <div className="w-48 mx-auto">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Loading</span>
          <span>Please wait</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-teal-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: easeInOutCubic }}
          />
        </div>
      </div>

      {/* Feature highlights */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
        <div className="text-center">
          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="text-slate-600">Interactive</span>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-slate-600">Real-time</span>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-1">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-slate-600">Accurate</span>
        </div>
      </div>
    </div>
  </div>
);

const Lazy3DModel: React.FC<Lazy3DModelProps> = ({
  className = '',
  posterSrc,
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isInView ? (
        <Lazy3DLoader />
      ) : (
        <Suspense fallback={<Lazy3DLoader />}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOutCubic }}
            className="w-full h-full"
          >
            <ToothModelViewer
              className="w-full h-full object-contain"
              posterSrc={posterSrc}
            />
          </motion.div>
        </Suspense>
      )}
    </div>
  );
};

export default Lazy3DModel;


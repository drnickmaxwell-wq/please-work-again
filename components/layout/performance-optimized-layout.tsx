'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { linearEase } from '@/lib/motion/easing';
import StickyHeader from './sticky-header';
import { ScrollProgress } from '@/components/effects/parallax-scroll';

// Brand Colors: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)
// Fonts: Montserrat headings, Lora body text

// Lazy load components for performance
const FloatingActionButtons = lazy(() => import('@/components/ui/floating-action-buttons'));

interface PerformanceOptimizedLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFloatingButtons?: boolean;
  className?: string;
}

// Brand-consistent loading component
function BrandLoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-4 border-transparent rounded-full"
        style={{
          borderTopColor: 'var(--brand-magenta)',
          borderRightColor: 'var(--brand-teal)',
          borderBottomColor: 'var(--brand-gold)',
          borderLeftColor: 'transparent'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: linearEase }}
      />
      <span 
        className="ml-3 text-slate-600"
        style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
      >
        Loading...
      </span>
    </div>
  );
}

export default function PerformanceOptimizedLayout({
  children,
  showHeader = true,
  showFloatingButtons = true,
  className = ''
}: PerformanceOptimizedLayoutProps) {
  return (
    <div className={`min-h-screen bg-transparent ${className}`}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress className="fixed top-0 left-0 right-0 z-50" />
      
      {/* Sticky Header */}
      {showHeader && (
        <Suspense fallback={<BrandLoadingSpinner />}>
          <StickyHeader />
        </Suspense>
      )}
      
      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
      
      {/* Floating Action Buttons */}
      {showFloatingButtons && (
        <Suspense fallback={null}>
          <FloatingActionButtons />
        </Suspense>
      )}
    </div>
  );
}


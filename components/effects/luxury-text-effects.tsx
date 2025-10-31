'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { easeInOutCubic } from '@/lib/motion/easing';

const SHIMMER_DIRECTION_CONFIG = {
  'left-to-right': ['-200% 0', '200% 0'] as const,
  'right-to-left': ['200% 0', '-200% 0'] as const,
  'center-out': ['0% 0', '-200% 0', '200% 0'] as const,
} satisfies Record<'left-to-right' | 'right-to-left' | 'center-out', readonly string[]>;

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left-to-right' | 'right-to-left' | 'center-out';
  trigger?: 'hover' | 'always' | 'viewport';
}

const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  className = '',
  intensity = 'medium',
  speed = 'medium',
  direction = 'left-to-right',
  trigger = 'hover',
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  const intensityConfig = {
    subtle: {
      gradient: 'var(--smh-shimmer-subtle)',
      size: '200%',
    },
    medium: {
      gradient: 'var(--smh-shimmer-medium)',
      size: '300%',
    },
    strong: {
      gradient: 'var(--smh-shimmer-strong)',
      size: '400%',
    },
  } as const;

  // Speed configurations
  const speedConfig = {
    slow: '3s',
    medium: '2s',
    fast: '1.5s',
  };

  const config = intensityConfig[intensity];
  const animationDuration = speedConfig[speed];

  const positions = SHIMMER_DIRECTION_CONFIG[direction];
  const startPosition = positions[0];
  const endPosition = positions[positions.length - 1];
  const shimmerStyle = {
    background: config.gradient,
    backgroundSize: config.size,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundPosition: startPosition,
  };

  const animationClass = `shimmer-${trigger}-${intensity}-${speed}-${direction}`;

  useEffect(() => {
    // Inject CSS animation
    const style = document.createElement('style');
    const currentPositions = SHIMMER_DIRECTION_CONFIG[direction];
    const keyframes = currentPositions.length === 3
      ? `
        0% { background-position: ${currentPositions[0]}; }
        50% { background-position: ${currentPositions[1]}; }
        100% { background-position: ${currentPositions[2]}; }
      `
      : `
        0% { background-position: ${currentPositions[0]}; }
        100% { background-position: ${currentPositions[1]}; }
      `;

    style.textContent = `
      @keyframes ${animationClass} {
        ${keyframes}
      }

      .${animationClass} {
        animation: ${animationClass} ${animationDuration} ease-in-out;
      }
      
      .${animationClass}-hover:hover {
        animation: ${animationClass} ${animationDuration} ease-in-out;
      }
      
      .${animationClass}-always {
        animation: ${animationClass} ${animationDuration} ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [animationClass, animationDuration, direction]);

  const triggerClass = trigger === 'always' 
    ? `${animationClass}-always` 
    : trigger === 'hover' 
    ? `${animationClass}-hover` 
    : '';

  return (
    <motion.div
      ref={textRef}
      className={`${className} ${triggerClass}`}
      style={shimmerStyle}
      initial={trigger === 'viewport' ? { backgroundPosition: startPosition } : undefined}
      whileInView={trigger === 'viewport' ? { backgroundPosition: endPosition } : undefined}
      transition={trigger === 'viewport' ? { duration: parseFloat(animationDuration), ease: easeInOutCubic } : undefined}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'rainbow';
  animate?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  variant = 'primary',
  animate = false,
}) => {
  const gradientClasses: Record<Exclude<GradientTextProps['variant'], undefined>, string> = {
    primary: 'bg-[var(--gradient-cta)]',
    secondary: 'bg-[var(--smh-gradient-secondary)]',
    accent: 'bg-[var(--smh-gradient-accent)]',
    rainbow: 'bg-[var(--smh-gradient-rainbow)]'
  };

  const gradientBackgrounds: Record<Exclude<GradientTextProps['variant'], undefined>, string | undefined> = {
    primary: undefined,
    secondary: 'var(--smh-gradient-secondary)',
    accent: 'var(--smh-gradient-accent)',
    rainbow: 'var(--smh-gradient-rainbow)',
  };

  const baseStyle = {
    background: gradientBackgrounds[variant],
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: animate ? '200% 200%' : '100% 100%',
  };

  const combinedClassName = [
    'bg-clip-text text-transparent',
    gradientClasses[variant],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.span
      className={combinedClassName}
      style={baseStyle}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : undefined}
      transition={animate ? {
        duration: 3,
        repeat: Infinity,
        ease: easeInOutCubic,
      } : undefined}
    >
      {children}
    </motion.span>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [showCursor, setShowCursor] = React.useState(cursor);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        
        if (index >= text.length) {
          clearInterval(interval);
          if (cursor) {
            setTimeout(() => setShowCursor(false), 1000);
          }
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, cursor, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-[1em] bg-gradient-to-b from-pink-500 to-teal-500 ml-1"
        />
      )}
    </span>
  );
};

interface FloatingTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  direction?: 'up' | 'down' | 'random';
}

const FloatingText: React.FC<FloatingTextProps> = ({
  children,
  className = '',
  intensity = 'medium',
  direction = 'up',
}) => {
  const intensityConfig = {
    subtle: { y: [-2, 2], duration: 3 },
    medium: { y: [-5, 5], duration: 2.5 },
    strong: { y: [-8, 8], duration: 2 },
  };

  const config = intensityConfig[intensity];
  const yValues = direction === 'up' 
    ? [-Math.abs(config.y[0]), Math.abs(config.y[1])]
    : direction === 'down'
    ? [Math.abs(config.y[0]), -Math.abs(config.y[1])]
    : config.y;

  return (
    <motion.div
      className={className}
      animate={{
        y: yValues,
        rotate: [-0.5, 0.5, -0.5],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: easeInOutCubic,
      }}
    >
      {children}
    </motion.div>
  );
};

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'magenta' | 'turquoise' | 'gold' | 'white';
  intensity?: 'subtle' | 'medium' | 'strong';
  pulse?: boolean;
}

const GlowText: React.FC<GlowTextProps> = ({
  children,
  className = '',
  color = 'gold',
  intensity = 'medium',
  pulse = false,
}) => {
  const colorConfig = {
    magenta: 'var(--smh-primary-magenta)',
    turquoise: 'var(--smh-primary-teal)',
    gold: 'var(--smh-accent-gold)',
    white: '#FFFFFF',
  };

  const intensityConfig = {
    subtle: '0 0 10px',
    medium: '0 0 20px',
    strong: '0 0 30px',
  };

  const glowColor = colorConfig[color];
  const glowIntensity = intensityConfig[intensity];

  const textStyle = {
    textShadow: `${glowIntensity} ${glowColor}`,
    color: glowColor,
  };

  return (
    <motion.span
      className={className}
      style={textStyle}
      animate={pulse ? {
        textShadow: [
          `${glowIntensity} ${glowColor}`,
          `0 0 ${parseInt(glowIntensity.split(' ')[2]) * 1.5}px ${glowColor}`,
          `${glowIntensity} ${glowColor}`,
        ],
      } : undefined}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: easeInOutCubic,
      } : undefined}
    >
      {children}
    </motion.span>
  );
};

// Export all components
export {
  ShimmerText,
  GradientText,
  TypewriterText,
  FloatingText,
  GlowText,
};

type TextEffect = 'shimmer' | 'gradient' | 'glow' | 'float';

type EffectComponentProps = { children: React.ReactNode } & Record<string, unknown>;

const effectComponents: Record<TextEffect, React.ComponentType<EffectComponentProps>> = {
  shimmer: ShimmerText,
  gradient: GradientText,
  glow: GlowText,
  float: FloatingText,
};

const getEffectComponent = (effect: TextEffect) => effectComponents[effect];

// Utility function to apply text effects to existing components
export const withTextEffect = <Props extends object>(
  Component: React.ComponentType<Props>,
  effect: TextEffect,
  options?: Record<string, unknown>
) => {
  const EffectComponent = getEffectComponent(effect);
  const effectProps = options ?? {};

  const WrappedComponent: React.FC<Props> = (props) => (
    <EffectComponent {...effectProps}>
      <Component {...props} />
    </EffectComponent>
  );

  WrappedComponent.displayName = `WithTextEffect(${Component.displayName ?? Component.name ?? 'Component'})`;

  return WrappedComponent;
};


'use client';

import type { RefObject } from 'react';

import { easeInOutCubic as baseEaseInOutCubic } from '@/lib/motion/easing';
import { useParallax as baseUseParallax } from '@/components/brand/hooks/useParallax';

export const easeInOutCubic = baseEaseInOutCubic;

export function useParallaxLayer(target: RefObject<HTMLElement | null>) {
  return baseUseParallax(target);
}

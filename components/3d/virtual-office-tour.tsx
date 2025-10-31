'use client';
import Image from 'next/image';
import React from 'react';
import { TOOTH_FALLBACK_DATA_URL } from './tooth-fallback';

export type VirtualOfficeTourProps = { className?: string; posterSrc?: string };

export default function VirtualOfficeTour({ className, posterSrc }: VirtualOfficeTourProps) {
  const src = posterSrc ?? TOOTH_FALLBACK_DATA_URL;

  return (
    <Image
      className={className}
      src={src}
      alt="Virtual office tour"
      width={800}
      height={600}
      sizes="100vw"
    />
  );
}

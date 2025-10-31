'use client';
import Image from 'next/image';
import React from 'react';
import { TOOTH_FALLBACK_DATA_URL } from './tooth-fallback';

export type ToothModelViewerProps = { className?: string; posterSrc?: string };

export default function ToothModelViewer({ className, posterSrc }: ToothModelViewerProps) {
  const src = posterSrc ?? TOOTH_FALLBACK_DATA_URL;

  return (
    <Image
      className={className}
      src={src}
      alt="Tooth model"
      width={800}
      height={600}
      sizes="100vw"
    />
  );
}

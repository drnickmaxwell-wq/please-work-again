'use client';
import Image from 'next/image';
import React from 'react';
import { TOOTH_FALLBACK_DATA_URL } from './tooth-fallback';

export type ARSmileTryOnProps = { className?: string; posterSrc?: string };

export default function ARSmileTryOn({ className, posterSrc }: ARSmileTryOnProps) {
  const src = posterSrc ?? TOOTH_FALLBACK_DATA_URL;

  return (
    <Image
      className={className}
      src={src}
      alt="AR smile try-on"
      width={800}
      height={600}
      sizes="100vw"
    />
  );
}

'use client';

import React from 'react';

export default function ToothViewer() {
  return (
    <div
      role="img"
      aria-label="3D viewer placeholder"
      className="aspect-video w-full rounded-3xl border border-white/10 bg-black/10 shadow-inner"
    >
      <div className="flex h-full items-center justify-center text-sm font-medium text-white/70">
        3D model preview coming soon
      </div>
    </div>
  );
}
// TODO: wire react-three/fiber + drei when assets are available.

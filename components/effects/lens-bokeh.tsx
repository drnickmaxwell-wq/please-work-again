'use client';
import React from 'react';
export default function LensBokeh({ className='' }:{ className?:string }){
  return <div className={`pointer-events-none ${className}`} style={{ background:'radial-gradient(300px circle at 20% 30%, rgba(255,255,255,0.12), transparent), radial-gradient(220px circle at 80% 40%, rgba(255,255,255,0.08), transparent)' }} aria-hidden="true" />;
}

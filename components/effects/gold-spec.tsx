'use client';
import React from 'react';
export default function GoldSpec({ className='' }:{className?:string}){
  return <div className={`pointer-events-none ${className}`} style={{ background:'conic-gradient(from 120deg at 50% 50%, rgba(255,245,220,0.28), rgba(255,255,255,0) 40%, rgba(225,195,110,0.28))', mixBlendMode:'screen' }} aria-hidden="true" />;
}

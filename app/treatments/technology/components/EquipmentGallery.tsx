'use client';

import React, { useEffect, useRef } from 'react';
import './equipment-gallery.css';

const equipment = [
  { name: 'iTero Element 5D', category: 'Digital Scanner', tooltip: 'Real-time 3D scanning with NIRI technology' },
  { name: 'CEREC Primescan', category: 'Intraoral Scanner', tooltip: 'Sub-micron precision for perfect restorations' },
  { name: 'Planmeca ProMax 3D', category: 'CBCT Imaging', tooltip: 'Low-dose 3D imaging for implant planning' },
  { name: 'Zeiss OPMI', category: 'Surgical Microscope', tooltip: '25x magnification for endodontic precision' },
  { name: 'CEREC MC XL', category: 'Milling Unit', tooltip: 'In-house same-day crown fabrication' },
  { name: 'Medit i700', category: 'AI Scanner', tooltip: 'AI-powered scan optimization' },
];

export default function EquipmentGallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.equipment-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="equipment-gallery-section">
      <div className="gallery-container">
        <h2 className="section-title iridescent-text">Our Equipment Gallery</h2>
        <p className="section-subtitle">Precision technology at every step</p>
        
        <div ref={gridRef} className="equipment-grid">
          {equipment.map((item, index) => (
            <div key={index} className="equipment-card card-reflection subsurface-glow">
              {/* Gradient Fallback Poster */}
              <div className="equipment-poster">
                <div className="poster-gradient"></div>
                <div className="poster-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 9l6 6M15 9l-6 6"/>
                  </svg>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="equipment-content">
                <h3 className="equipment-name">{item.name}</h3>
                <p className="equipment-category">{item.category}</p>
              </div>
              
              {/* Hover Tooltip */}
              <div className="equipment-tooltip">
                {item.tooltip}
              </div>
              
              {/* Glass Reflect Edge */}
              <div className="glass-reflect-edge"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


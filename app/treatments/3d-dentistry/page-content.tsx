'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Microscope,
  Zap,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Camera,
  Printer,
  Scan
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Same-Day Results',
    description: 'Complete treatments in a single visit with our advanced 3D technology.'
  },
  {
    icon: Shield,
    title: 'Precision Accuracy',
    description: 'Digital impressions are 50x more accurate than traditional methods.'
  },
  {
    icon: Star,
    title: 'Comfort First',
    description: 'No messy impressions or multiple appointments required.'
  },
  {
    icon: Zap,
    title: 'Faster Healing',
    description: 'Minimally invasive procedures promote quicker recovery times.'
  }
];

const technologies = [
  {
    icon: Scan,
    title: 'Intraoral 3D Scanning',
    description: 'High-resolution digital impressions captured in minutes, not hours.',
    features: ['No gag reflex triggers', 'Instant results', 'Perfect accuracy', 'Comfortable experience']
  },
  {
    icon: Camera,
    title: 'Digital Smile Design',
    description: 'Visualize your new smile before treatment begins with advanced imaging.',
    features: ['Preview results', 'Custom planning', 'Patient involvement', 'Realistic expectations']
  },
  {
    icon: Printer,
    title: '3D Printing & Milling',
    description: 'On-site fabrication of crowns, bridges, and other restorations.',
    features: ['Same-day delivery', 'Perfect fit', 'High-quality materials', 'Immediate placement']
  }
];

const procedures = [
  'Same-Day Crowns',
  'Digital Implant Planning',
  'Invisalign Treatment',
  'Porcelain Veneers',
  'Bridges & Onlays',
  'Surgical Guides',
  'Orthodontic Planning',
  'Bite Analysis'
];

export default function ThreeDDentistryPageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
              <Microscope className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-magenta-600 to-pink-600 bg-clip-text text-transparent">
              3D Digital Dentistry
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of dental care with our revolutionary 3D technology.
              From digital impressions to same-day restorations, we’re redefining what’s possible in modern dentistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Why Choose 3D Dentistry?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our advanced 3D technology transforms the dental experience, making treatments 
              faster, more comfortable, and incredibly precise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Advanced 3D Technologies
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We utilize the latest in 3D dental technology to provide unparalleled 
              precision and comfort in every treatment.
            </p>
          </motion.div>

          <div className="space-y-16">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">
                      {tech.title}
                    </h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {tech.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tech.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <IconComponent className="w-32 h-32 text-purple-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              3D-Enhanced Procedures
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our 3D technology enhances a wide range of dental procedures, 
              making them more precise, comfortable, and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procedures.map((procedure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-slate-800">{procedure}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Experience 3D Dentistry Today
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover how our revolutionary 3D technology can transform your dental experience. 
              Book a consultation to see the difference advanced technology makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
                >
                  Book 3D Consultation
                </motion.button>
              </Link>
              <Link href="/treatments">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-purple-600 transition-colors"
                >
                  View All Treatments
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


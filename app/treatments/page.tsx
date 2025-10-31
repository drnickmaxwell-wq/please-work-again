'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Heart,
  Shield,
  Star,
  ArrowRight,
  Microscope,
  Smile,
  Crown,
  Circle
} from 'lucide-react';

const treatments = [
  {
    id: '3d-dentistry',
    title: '3D Digital Dentistry',
    description: 'Revolutionary 3D scanning and printing technology for precise, comfortable treatments.',
    icon: Microscope,
    color: 'from-purple-500 to-pink-500',
    features: ['3D Scanning', 'Digital Impressions', 'Same-Day Crowns', 'Precision Planning']
  },
  {
    id: 'veneers',
    title: 'Porcelain Veneers',
    description: 'Transform your smile with ultra-thin, custom-crafted porcelain veneers.',
    icon: Sparkles,
    color: 'from-blue-500 to-teal-500',
    features: ['Natural Look', 'Stain Resistant', 'Minimal Prep', 'Long Lasting']
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solution that looks and feels completely natural.',
    icon: Circle,
    color: 'from-green-500 to-emerald-500',
    features: ['Titanium Posts', 'Bone Integration', 'Natural Feel', 'Lifetime Solution']
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more confident smile.',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    features: ['Professional Grade', 'Safe & Effective', 'Immediate Results', 'Custom Trays']
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Straighten your teeth with modern orthodontic solutions including Invisalign.',
    icon: Smile,
    color: 'from-indigo-500 to-purple-500',
    features: ['Invisalign', 'Clear Braces', 'Digital Planning', 'Comfortable Treatment']
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description: 'Pain-free root canal treatment using advanced techniques and technology.',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    features: ['Pain-Free', 'Single Visit', 'Microscopic Precision', 'Tooth Preservation']
  },
  {
    id: 'crowns-bridges',
    title: 'Crowns & Bridges',
    description: 'Restore damaged teeth with beautiful, durable crowns and bridges.',
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    features: ['Ceramic Materials', 'Perfect Fit', 'Natural Color', 'Strong & Durable']
  },
  {
    id: 'preventive',
    title: 'Preventive Care',
    description: 'Comprehensive preventive treatments to maintain optimal oral health.',
    icon: Shield,
    color: 'from-teal-500 to-cyan-500',
    features: ['Regular Cleanings', 'Oral Exams', 'Fluoride Treatment', 'Sealants']
  }
];

const animationEase: [number, number, number, number] = [0.42, 0, 0.58, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: animationEase
    }
  }
};

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-magenta-600/10 to-turquoise-600/10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-magenta-600 via-purple-600 to-turquoise-600 bg-clip-text text-transparent">
              Advanced Dental Treatments
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of dentistry with our comprehensive range of advanced treatments, 
              combining cutting-edge technology with luxury coastal comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {treatments.map((treatment) => {
              const IconComponent = treatment.icon;
              return (
                <motion.div
                  key={treatment.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <Link href={`/treatments/${treatment.id}`}>
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${treatment.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${treatment.color} mb-6`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-magenta-600 transition-colors">
                        {treatment.title}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {treatment.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {treatment.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-slate-500">
                            <div className="w-1.5 h-1.5 bg-turquoise-500 rounded-full mr-3" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Learn More Button */}
                      <div className="flex items-center text-magenta-600 font-semibold group-hover:text-magenta-700 transition-colors">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-magenta-600 to-turquoise-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Book a consultation today and discover how our advanced treatments
              can give you the smile you’ve always dreamed of.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-magenta-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
                >
                  Book Consultation
                </motion.button>
              </Link>
              <Link href="/emergency-dentist">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-magenta-600 transition-colors"
                >
                  Emergency Care
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


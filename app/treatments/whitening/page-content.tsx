'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Star,
  Zap,
  Clock,
  Shield,
  CheckCircle,
  Sun,
  Home,
  Award
} from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Immediate Results',
    description: 'See dramatic whitening results in just one professional treatment session.'
  },
  {
    icon: Shield,
    title: 'Safe & Effective',
    description: 'Professional-grade whitening that protects your enamel while removing stains.'
  },
  {
    icon: Clock,
    title: 'Long Lasting',
    description: 'Results can last 1-3 years with proper care and maintenance.'
  },
  {
    icon: Star,
    title: 'Confidence Boost',
    description: 'A brighter smile enhances your appearance and self-confidence.'
  }
];

const whiteningOptions = [
  {
    title: 'In-Office Professional Whitening',
    description: 'The fastest and most effective whitening treatment available.',
    duration: '60-90 minutes',
    results: 'Up to 8 shades whiter',
    icon: Award,
    features: [
      'Professional-grade whitening gel',
      'LED light activation',
      'Immediate dramatic results',
      'Dentist-supervised treatment',
      'Gum protection included'
    ],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    title: 'Take-Home Whitening Kits',
    description: 'Custom-fitted trays for convenient whitening at your own pace.',
    duration: '1-2 weeks',
    results: 'Up to 6 shades whiter',
    icon: Home,
    features: [
      'Custom-fitted whitening trays',
      'Professional whitening gel',
      'Flexible treatment schedule',
      'Gradual, comfortable whitening',
      'Touch-up treatments available'
    ],
    color: 'from-blue-400 to-cyan-500'
  },
  {
    title: 'Combination Treatment',
    description: 'In-office treatment followed by take-home maintenance.',
    duration: 'Ongoing',
    results: 'Maximum whitening potential',
    icon: Sun,
    features: [
      'Best of both treatments',
      'Maximum whitening results',
      'Long-term maintenance',
      'Optimal value and convenience',
      'Sustained bright smile'
    ],
    color: 'from-purple-400 to-pink-500'
  }
];

const stainTypes = [
  {
    type: 'Surface Stains',
    causes: ['Coffee', 'Tea', 'Wine', 'Tobacco'],
    treatment: 'Easily removed with professional whitening',
    success: '95%'
  },
  {
    type: 'Age-Related Stains',
    causes: ['Natural aging', 'Enamel thinning', 'Dentin yellowing'],
    treatment: 'Responds well to professional treatment',
    success: '85%'
  },
  {
    type: 'Intrinsic Stains',
    causes: ['Medications', 'Fluorosis', 'Trauma'],
    treatment: 'May require multiple sessions or veneers',
    success: '70%'
  }
];

const aftercareInstructions = [
  {
    category: 'First 48 Hours',
    instructions: [
      'Avoid dark-colored foods and drinks',
      'No coffee, tea, wine, or berries',
      'Use a straw for colored beverages',
      'Avoid tobacco products',
      'Stick to white/clear foods'
    ]
  },
  {
    category: 'Long-Term Care',
    instructions: [
      'Regular dental cleanings every 6 months',
      'Use whitening toothpaste',
      'Rinse after consuming staining foods',
      'Consider touch-up treatments',
      'Maintain excellent oral hygiene'
    ]
  }
];

export default function WhiteningPageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-6">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Teeth Whitening
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Achieve a brilliantly white smile with our professional whitening treatments. 
              Safe, effective, and dramatically whiter teeth in just one visit.
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
              Why Professional Whitening?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional whitening delivers superior results compared to over-the-counter products, 
              with safety and effectiveness you can trust.
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
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 mb-6">
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

      {/* Whitening Options Section */}
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
              Whitening Treatment Options
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the whitening solution that best fits your lifestyle and goals. 
              All our treatments use professional-grade materials for optimal results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {whiteningOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${option.color} mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {option.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {option.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-sm text-slate-500 mb-1">Duration</div>
                      <div className="font-semibold text-slate-800">{option.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-500 mb-1">Results</div>
                      <div className="font-semibold text-slate-800">{option.results}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stain Types Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Types of Tooth Stains
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Understanding the type of staining you have helps us recommend 
              the most effective whitening treatment for your specific needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stainTypes.map((stain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {stain.type}
                </h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-700 mb-2">Common Causes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {stain.causes.map((cause, causeIndex) => (
                      <span 
                        key={causeIndex}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-700 mb-2">Treatment:</h4>
                  <p className="text-slate-600">{stain.treatment}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Success Rate:</span>
                  <span className="text-2xl font-bold text-green-600">{stain.success}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aftercare Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Maintaining Your Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow these simple guidelines to keep your smile bright and beautiful 
              for as long as possible after your whitening treatment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aftercareInstructions.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  {section.category}
                </h3>
                <div className="space-y-4">
                  {section.instructions.map((instruction, instructionIndex) => (
                    <div key={instructionIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{instruction}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for a Brighter Smile?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Transform your smile with professional teeth whitening. 
              Schedule your consultation today and discover how white your teeth can be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
                >
                  Book Whitening Consultation
                </motion.button>
              </Link>
              <Link href="/treatments">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Explore Other Treatments
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AlertTriangle,
  Clock,
  Phone,
  Shield,
  Heart,
  Zap
} from 'lucide-react';

const emergencyTypes = [
  {
    title: 'Severe Toothache',
    description: 'Intense, persistent tooth pain that interferes with daily activities.',
    urgency: 'High',
    treatment: 'Immediate pain relief, diagnosis, and treatment of underlying cause.',
    icon: AlertTriangle
  },
  {
    title: 'Broken or Chipped Tooth',
    description: 'Fractured teeth from trauma, accidents, or biting hard objects.',
    urgency: 'Medium-High',
    treatment: 'Emergency repair, bonding, or temporary restoration.',
    icon: Shield
  },
  {
    title: 'Knocked-Out Tooth',
    description: 'Complete tooth avulsion requiring immediate attention.',
    urgency: 'Critical',
    treatment: 'Immediate reimplantation if possible, or emergency stabilization.',
    icon: Zap
  },
  {
    title: 'Lost Filling or Crown',
    description: 'Dental restorations that have fallen out, exposing sensitive tooth structure.',
    urgency: 'Medium',
    treatment: 'Temporary or permanent restoration replacement.',
    icon: Heart
  },
  {
    title: 'Dental Abscess',
    description: 'Serious infection that can spread and become life-threatening.',
    urgency: 'Critical',
    treatment: 'Immediate drainage, antibiotics, and root canal or extraction.',
    icon: AlertTriangle
  },
  {
    title: 'Soft Tissue Injury',
    description: 'Cuts, tears, or trauma to gums, lips, cheeks, or tongue.',
    urgency: 'Medium-High',
    treatment: 'Cleaning, suturing, and infection prevention.',
    icon: Heart
  }
];

export default function EmergencyDentistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 mr-3" />
          <span className="text-lg font-semibold">DENTAL EMERGENCY? Call 01273 123456 for immediate assistance</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 mb-6">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Emergency Dentist
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              When dental emergencies strike, we’re here to help. Our experienced emergency team
              provides immediate pain relief and same-day treatment in our comfortable Shoreham-by-Sea practice.
            </p>
          </motion.div>

          {/* Emergency Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl border border-red-200"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Need Immediate Help?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:01273123456"
                  className="flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-colors shadow-lg"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  Call 01273 123456
                </a>
                <div className="text-slate-600">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-5 h-5 mr-2" />
                    Emergency Hours
                  </div>
                  <div className="text-sm">24/7 Emergency Line</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Types Section */}
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
              Common Dental Emergencies
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We treat all types of dental emergencies with immediate care and attention. 
              Here are the most common situations we handle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {emergencyTypes.map((emergency, index) => {
              const IconComponent = emergency.icon;
              const urgencyColor = emergency.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                                 emergency.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                                 emergency.urgency === 'Medium-High' ? 'bg-yellow-100 text-yellow-800' :
                                 'bg-blue-100 text-blue-800';
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-500">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgencyColor}`}>
                      {emergency.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {emergency.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {emergency.description}
                  </p>
                  <div className="border-t border-red-200 pt-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Treatment:</h4>
                    <p className="text-slate-600 text-sm">{emergency.treatment}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don’t Wait - Get Help Now
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Dental emergencies require immediate attention. Our experienced team is ready to 
              provide the urgent care you need to relieve pain and protect your oral health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:01273123456"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
              >
                <Phone className="w-6 h-6 mr-3" />
                Call Emergency Line
              </a>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-red-600 transition-colors"
                >
                  Contact Information
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


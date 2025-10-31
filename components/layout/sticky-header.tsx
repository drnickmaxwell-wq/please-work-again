'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MAIN_NAV, TREATMENTS, RESOURCES, type NavLink } from '@/lib/nav';
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Clock
} from 'lucide-react';

// Brand Colors: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)
// Fonts: Montserrat headings, Lora body text

interface StickyHeaderProps {
  className?: string;
}

export default function StickyHeader({ className = '' }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerScale = useTransform(scrollY, [0, 100], [1.02, 1]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getEnabledLinks = (links: NavLink[]) => links.filter((link) => link.enabled !== false);

  const mainNavigation = getEnabledLinks(MAIN_NAV);
  const treatmentLinks = getEnabledLinks(TREATMENTS);
  const resourceLinks = getEnabledLinks(RESOURCES);

  const navigationItems = [
    ...mainNavigation.map((item) => ({
      name: item.label,
      href: item.href,
      dropdown:
        item.href === '/treatments'
          ? treatmentLinks.map((link) => ({ name: link.label, href: link.href }))
          : undefined,
    })),
    ...(resourceLinks.length
      ? [
          {
            name: 'Resources',
            href: resourceLinks[0].href,
            dropdown: resourceLinks.map((link) => ({ name: link.label, href: link.href })),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Emergency Banner */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-[var(--z-header)] bg-white/10 px-4 py-2 text-center text-xs font-medium backdrop-blur-sm md:text-sm"
        style={{ color: 'var(--smh-text)' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2" style={{ opacity: 0.85 }}>
            <Phone className="h-4 w-4 text-current" />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>Emergency: 01273 453109</span>
          </div>
          <div className="hidden items-center gap-2 md:flex" style={{ opacity: 0.7 }}>
            <MapPin className="h-4 w-4 text-current" />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>Shoreham-by-Sea, West Sussex</span>
          </div>
          <div className="hidden items-center gap-2 lg:flex" style={{ opacity: 0.7 }}>
            <Clock className="h-4 w-4 text-current" />
            <span style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>24/7 Emergency Care</span>
          </div>
        </div>
      </motion.div>

      {/* Main Sticky Header */}
      <motion.header
        ref={headerRef}
        data-brand-header
        data-scrolled={isScrolled ? 'true' : 'false'}
        style={{
          opacity: headerOpacity,
          scale: headerScale,
        }}
        className={[
          'sticky-header header sticky top-0 z-50 w-full border-b border-transparent text-[color:var(--smh-text)] transition-colors duration-300',
          isScrolled ? 'scrolled' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div
              style={{ scale: logoScale }}
              className="flex items-center space-x-3"
            >
              <Link
                href="/"
                className="flex items-center space-x-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--champagne-keyline-gold)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--smh-gradient)]">
                  <span
                    className="text-lg font-bold"
                    style={{ color: 'var(--smh-text)', fontFamily: 'var(--font-inter), system-ui, Arial' }}
                  >
                    SMH
                  </span>
                </div>
                <div className="hidden sm:block">
                  <h1
                    className="text-lg font-bold"
                    style={{ color: 'var(--smh-text)', fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    St Mary’s House
                  </h1>
                  <p className="text-sm opacity-70" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                    Dental Care
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-8 lg:flex">
              {navigationItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 transition-opacity duration-200 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--champagne-keyline-gold)]"
                    data-nav-link={index === 0 ? 'primary' : undefined}
                    style={{ fontFamily: 'var(--font-inter), system-ui, Arial', opacity: 0.8 }}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown className="h-4 w-4 text-current" />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 z-50 mt-2 w-64 rounded-xl border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/90 py-2 text-[color:var(--smh-text)] shadow-2xl backdrop-blur-xl"
                        style={{ opacity: 0.9 }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-sm transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--champagne-keyline-gold)]"
                            style={{ fontFamily: 'var(--font-inter), system-ui, Arial', opacity: 0.85 }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden items-center space-x-4 md:flex">
              <motion.a
                href="tel:01273453109"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-4 py-2 text-[color:var(--smh-text)] transition-transform duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)]"
                style={{ opacity: 0.9 }}
              >
                <Phone className="h-4 w-4 text-current" />
                <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                  Call Now
                </span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-2 font-medium text-[color:var(--smh-text)] transition-transform duration-300 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] shadow-[0_12px_28px_rgba(11,13,15,0.25)]"
              >
                <Calendar className="h-4 w-4 text-current" />
                <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                  Book Free Consultation
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/80 p-2 transition-colors duration-200 text-[color:var(--smh-text)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--champagne-keyline-gold)]"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-current" />
              ) : (
                <Menu className="h-6 w-6 text-current" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[var(--z-header)] overflow-y-auto bg-[color:var(--champagne-glass-bg)]/92 backdrop-blur-xl text-[color:var(--smh-text)] lg:hidden"
            >
              <div className="space-y-8 px-6 py-24" style={{ opacity: 0.9 }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.4em]" style={{ opacity: 0.6 }}>
                    Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent text-[color:var(--smh-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)]"
                  >
                    <X className="h-5 w-5 text-current" />
                    <span className="sr-only">Close navigation</span>
                  </button>
                </div>
                {navigationItems.map((item, index) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-lg font-medium transition-opacity duration-200 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--champagne-keyline-gold)]"
                      data-nav-link={index === 0 ? 'primary' : undefined}
                      style={{ fontFamily: 'var(--font-inter), system-ui, Arial', opacity: 0.85 }}
                    >
                      {item.name}
                    </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-2 text-sm" style={{ opacity: 0.7 }}>
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1 transition-opacity duration-200 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--champagne-keyline-gold)]"
                          style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="space-y-3 pt-8">
                  <motion.a
                    href="tel:01273453109"
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 text-[color:var(--smh-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)]"
                    style={{ opacity: 0.9 }}
                  >
                    <Phone className="h-4 w-4 text-current" />
                    <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                      Call Now
                    </span>
                  </motion.a>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-medium text-[color:var(--smh-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] shadow-[0_12px_24px_rgba(11,13,15,0.25)]"
                  >
                    <Calendar className="h-4 w-4 text-current" />
                    <span className="font-medium" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
                      Book Free Consultation
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-24" />
    </>
  );
}


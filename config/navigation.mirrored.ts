/**
 * Navigation data mirrored from AI24 export on 2025-10-25T16:02:37Z.
 * This file acts as the single source of truth for primary, footer, and treatment menus.
 */
export const primary = [
  { "label": "Home", "path": "/" },
  { "label": "About", "path": "/about" },
  {
    "label": "Treatments",
    "path": "/treatments",
    "submenu": [
      { "label": "General Dentistry", "path": "/treatments/general" },
      { "label": "Cosmetic Dentistry", "path": "/treatments/cosmetic" },
      { "label": "3D Dentistry", "path": "/treatments/3d-dentistry" },
      { "label": "Orthodontics", "path": "/treatments/orthodontics" },
      { "label": "Implants", "path": "/treatments/implants" },
      { "label": "Technology", "path": "/treatments/technology" }
    ]
  },
  { "label": "Fees & Plans", "path": "/fees" },
  { "label": "Patient Info", "path": "/patient-info" },
  { "label": "Contact", "path": "/contact" }
];

export const footer = [
  {
    "section": "Our Services",
    "key": "services",
    "items": [
      { "label": "General Dentistry", "path": "/treatments/general" },
      { "label": "3D Printed Veneers", "path": "/treatments/veneers" },
      { "label": "Dental Implants", "path": "/treatments/implants" },
      { "label": "Teeth Whitening", "path": "/treatments/whitening" },
      { "label": "Emergency Dentist", "path": "/emergency" },
      { "label": "Digital Twin Simulation", "path": "/digital-twin" }
    ]
  },
  {
    "section": "Patient Care",
    "key": "patient",
    "items": [
      { "label": "New Patients", "path": "/new-patients" },
      { "label": "Dental Anxiety", "path": "/dental-anxiety" },
      { "label": "Payment Plans", "path": "/fees" },
      { "label": "Dental Plan", "path": "/dental-plan" },
      { "label": "Patient Stories", "path": "/patient-stories" },
      { "label": "FAQs", "path": "/faqs" }
    ]
  },
  {
    "section": "Practice Info",
    "key": "practice",
    "items": [
      { "label": "About Us", "path": "/about" },
      { "label": "Our Team", "path": "/team" },
      { "label": "Technology", "path": "/technology" },
      { "label": "Blog", "path": "/blog" },
      { "label": "Careers", "path": "/careers" },
      { "label": "Contact", "path": "/contact" }
    ]
  },
  {
    "section": "Legal",
    "key": "legal",
    "items": [
      { "label": "Privacy Policy", "path": "/privacy" },
      { "label": "Terms of Service", "path": "/terms" },
      { "label": "Cookie Policy", "path": "/cookies" },
      { "label": "Complaints", "path": "/complaints" },
      { "label": "Accessibility", "path": "/accessibility" }
    ]
  }
];

export const treatmentsMenu = [
  {
    "groupKey": "general",
    "title": "General Dentistry",
    "items": [
      { "slug": "check-ups", "label": "Check-ups (incl. oral cancer check)", "path": "/treatments/general/check-ups" },
      { "slug": "tooth-coloured-fillings", "label": "Tooth-Coloured Fillings", "path": "/treatments/general/tooth-coloured-fillings" },
      { "slug": "crowns-and-bridges", "label": "Crowns & Bridges", "path": "/treatments/general/crowns-and-bridges" },
      { "slug": "extractions", "label": "Extractions", "path": "/treatments/general/extractions" },
      { "slug": "root-canal-treatment", "label": "Root Canal Treatment", "path": "/treatments/general/root-canal-treatment" },
      { "slug": "childrens-dentistry", "label": "Children’s Dentistry", "path": "/treatments/general/childrens-dentistry" },
      { "slug": "sedation", "label": "Sedation", "path": "/treatments/general/sedation" },
      { "slug": "emergency-dentistry", "label": "Emergency Dentistry", "path": "/treatments/general/emergency-dentistry" }
    ]
  },
  {
    "groupKey": "cosmetic",
    "title": "Cosmetic Dentistry",
    "items": [
      { "slug": "veneers", "label": "Veneers", "path": "/treatments/cosmetic/veneers" },
      { "slug": "teeth-whitening", "label": "Teeth Whitening", "path": "/treatments/cosmetic/teeth-whitening" },
      { "slug": "composite-bonding", "label": "Composite Bonding", "path": "/treatments/cosmetic/composite-bonding" }
    ]
  },
  {
    "groupKey": "3d-dentistry",
    "title": "3D Dentistry",
    "items": [
      { "slug": "3d-printed-veneers", "label": "3D Printed Veneers", "path": "/treatments/3d-dentistry/3d-printed-veneers" },
      { "slug": "3d-same-day-dentures", "label": "3D Same-Day Dentures", "path": "/treatments/3d-dentistry/3d-same-day-dentures" },
      { "slug": "3d-restorative-dentistry", "label": "3D Restorative Dentistry", "path": "/treatments/3d-dentistry/3d-restorative-dentistry" },
      { "slug": "3d-implants-overview", "label": "3D Implants Overview", "path": "/treatments/3d-dentistry/3d-implants-overview" }
    ]
  },
  {
    "groupKey": "orthodontics",
    "title": "Orthodontics",
    "items": [
      { "slug": "spark-aligners", "label": "Spark Aligners", "path": "/treatments/orthodontics/spark-aligners" },
      { "slug": "fixed-braces", "label": "Fixed Braces", "path": "/treatments/orthodontics/fixed-braces" }
    ]
  },
  {
    "groupKey": "implants",
    "title": "Dental Implants",
    "items": [
      { "slug": "3d-surgically-guided-implants", "label": "3D Surgically-Guided Implants", "path": "/treatments/implants/3d-surgically-guided-implants" },
      { "slug": "same-day-implants", "label": "Same-day Implants", "path": "/treatments/implants/same-day-implants" },
      { "slug": "3d-printed-restorations", "label": "3D Printed Restorations", "path": "/treatments/implants/3d-printed-restorations" },
      { "slug": "all-on-4-6-same-day", "label": "All-on-4/6 Same Day", "path": "/treatments/implants/all-on-4-6-same-day" }
    ]
  },
  {
    "groupKey": "technology",
    "title": "Technology",
    "items": [
      { "slug": "soft-tissue-laser", "label": "Soft Tissue Laser", "path": "/treatments/technology/soft-tissue-laser" },
      { "slug": "3d-scanning-and-printing", "label": "3D Scanning & Printing", "path": "/treatments/technology/3d-scanning-and-printing" },
      { "slug": "the-wand-painless-numbing", "label": "The Wand — Painless Numbing", "path": "/treatments/technology/the-wand-painless-numbing" }
    ]
  }
];

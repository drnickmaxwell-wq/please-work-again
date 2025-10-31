// Image optimization utilities for St Mary's House Dental Care
// Maintains brand consistency across all image loading states
import { SMH_BRAND_COLOR_FALLBACKS, SMH_BRAND_COLOR_TOKENS } from '@/lib/brand/palette';
import { TOKENS as NEUTRAL_TOKENS } from '@/styles/tokens/neutrals';

export interface OptimizedImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  placeholder?: 'blur' | 'empty' | 'brand';
}

const BRAND_COLOR_METADATA = {
  magenta: { token: SMH_BRAND_COLOR_TOKENS.magenta, fallback: SMH_BRAND_COLOR_FALLBACKS.magenta },
  turquoise: { token: SMH_BRAND_COLOR_TOKENS.teal, fallback: SMH_BRAND_COLOR_FALLBACKS.teal },
  gold: { token: SMH_BRAND_COLOR_TOKENS.gold, fallback: SMH_BRAND_COLOR_FALLBACKS.gold }
} as const;

type BrandCoreColor = keyof typeof BRAND_COLOR_METADATA;

export const BRAND_COLORS = {
  magenta: `var(${SMH_BRAND_COLOR_TOKENS.magenta})`,
  turquoise: `var(${SMH_BRAND_COLOR_TOKENS.teal})`,
  gold: `var(${SMH_BRAND_COLOR_TOKENS.gold})`,
  neutrals: {
    surface: NEUTRAL_TOKENS.graySubtle,
    base: NEUTRAL_TOKENS.white,
    depth: NEUTRAL_TOKENS.navy,
  },
};

function resolveBrandColor(color: BrandCoreColor): string {
  if (typeof window === 'undefined') {
    return BRAND_COLOR_METADATA[color].fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(BRAND_COLOR_METADATA[color].token)
    .trim();

  return value || BRAND_COLOR_METADATA[color].fallback;
}

function resolveNeutralValue(tokenValue: string): string {
  const fallbackMatch = tokenValue.match(/#([0-9a-f]{6})/i);
  const fallback = fallbackMatch ? `#${fallbackMatch[1]}` : tokenValue;

  if (typeof window === 'undefined') {
    return fallback;
  }

  if (!tokenValue.startsWith('var(')) {
    return tokenValue;
  }

  const varBody = tokenValue.slice(4, -1);
  const [variable, fallbackValue = fallback] = varBody.split(',').map((part) => part.trim());

  if (!variable) {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  return value || fallbackValue || fallback;
}

function hexWithAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  const alphaValue = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${normalized}${alphaValue}`;
}

// Generate brand-consistent blur data URL
export function generateBrandBlurDataURL(type: 'gradient' | 'solid' | 'pattern' = 'gradient'): string {
  const canvas = document.createElement('canvas');
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  switch (type) {
    case 'gradient':
      const magenta = resolveBrandColor('magenta');
      const turquoise = resolveBrandColor('turquoise');
      const gold = resolveBrandColor('gold');

      const gradient = ctx.createLinearGradient(0, 0, 40, 40);
      gradient.addColorStop(0, hexWithAlpha(magenta, 0.125));
      gradient.addColorStop(0.5, hexWithAlpha(turquoise, 0.125));
      gradient.addColorStop(1, hexWithAlpha(gold, 0.125));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 40, 40);
      break;

    case 'solid':
      ctx.fillStyle = resolveNeutralValue(BRAND_COLORS.neutrals.base);
      ctx.fillRect(0, 0, 40, 40);
      break;

    case 'pattern':
      // Create a subtle pattern with brand colors
      ctx.fillStyle = resolveNeutralValue(BRAND_COLORS.neutrals.surface);
      ctx.fillRect(0, 0, 40, 40);
      
      // Add dots pattern
      ctx.fillStyle = hexWithAlpha(resolveBrandColor('magenta'), 0.0625);
      for (let i = 0; i < 40; i += 8) {
        for (let j = 0; j < 40; j += 8) {
          ctx.beginPath();
          ctx.arc(i, j, 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      break;
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// SVG placeholder with brand styling
export function generateBrandSVGPlaceholder(
  width: number = 400, 
  height: number = 300, 
  text: string = 'Loading...'
): string {
  const magenta = resolveBrandColor('magenta');
  const turquoise = resolveBrandColor('turquoise');
  const gold = resolveBrandColor('gold');
  const neutralSurface = resolveNeutralValue(BRAND_COLORS.neutrals.surface);
  const neutralDepth = resolveNeutralValue(BRAND_COLORS.neutrals.depth);

  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${magenta};stop-opacity:0.05" />
          <stop offset="50%" style="stop-color:${turquoise};stop-opacity:0.05" />
          <stop offset="100%" style="stop-color:${gold};stop-opacity:0.05" />
        </linearGradient>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${neutralSurface};stop-opacity:0" />
          <stop offset="50%" style="stop-color:${neutralSurface};stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:${neutralSurface};stop-opacity:0" />
          <animateTransform attributeName="transform" type="translate" 
                           values="-${width};0;${width};0" dur="2s" repeatCount="indefinite"/>
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#shimmer)" />
      
      <!-- Brand logo placeholder -->
      <circle cx="${width/2}" cy="${height/2 - 20}" r="20" fill="${magenta}" opacity="0.2" />
      <circle cx="${width/2}" cy="${height/2 - 20}" r="15" fill="${turquoise}" opacity="0.3" />
      <circle cx="${width/2}" cy="${height/2 - 20}" r="10" fill="${gold}" opacity="0.4" />
      
      <!-- Loading text -->
      <text x="${width/2}" y="${height/2 + 20}" text-anchor="middle" 
            font-family="var(--font-inter), system-ui, Arial" font-size="14" font-weight="600" 
            fill="${neutralDepth}">${text}</text>
      
      <!-- Decorative elements -->
      <circle cx="${width * 0.2}" cy="${height * 0.3}" r="3" fill="${magenta}" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="${width * 0.8}" cy="${height * 0.7}" r="2" fill="${turquoise}" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="${width * 0.7}" cy="${height * 0.2}" r="2.5" fill="${gold}" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  `)}`;
}

// Responsive image sizes for different breakpoints
export const RESPONSIVE_SIZES = {
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
  thumbnail: '(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 150px',
  gallery: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px',
  avatar: '(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 80px',
  fullWidth: '100vw',
};

// Image quality settings for different use cases
export const QUALITY_SETTINGS = {
  hero: 90,
  gallery: 85,
  thumbnail: 75,
  avatar: 80,
  background: 70,
  icon: 95,
};

// WebP conversion utility
export function getOptimizedImageUrl(
  src: string, 
  width?: number, 
  height?: number, 
  quality: number = 85
): string {
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const params = new URLSearchParams();
  
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('f', 'webp');
  
  // For Next.js Image Optimization API
  return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
}

// Generate srcSet for responsive images
export function generateSrcSet(
  src: string, 
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
  quality: number = 85
): string {
  return widths
    .map(width => `${getOptimizedImageUrl(src, width, undefined, quality)} ${width}w`)
    .join(', ');
}

// Image preloading utility
export function preloadImage(src: string, priority: boolean = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    
    if (priority) {
      img.fetchPriority = 'high';
    }
    
    img.src = src;
  });
}

// Batch image preloading
export async function preloadImages(
  sources: string[], 
  options: { priority?: boolean; concurrent?: number } = {}
): Promise<void> {
  const { priority = false, concurrent = 3 } = options;
  
  const chunks = [];
  for (let i = 0; i < sources.length; i += concurrent) {
    chunks.push(sources.slice(i, i + concurrent));
  }
  
  for (const chunk of chunks) {
    await Promise.allSettled(
      chunk.map(src => preloadImage(src, priority))
    );
  }
}

// Image format detection
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

// Get optimal image format
export function getOptimalFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

// Image loading performance monitoring
export class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private metrics: Map<string, { loadTime: number; size: number; format: string }> = new Map();
  
  static getInstance(): ImagePerformanceMonitor {
    if (!ImagePerformanceMonitor.instance) {
      ImagePerformanceMonitor.instance = new ImagePerformanceMonitor();
    }
    return ImagePerformanceMonitor.instance;
  }
  
  trackImageLoad(src: string, startTime: number, endTime: number, size: number, format: string): void {
    this.metrics.set(src, {
      loadTime: endTime - startTime,
      size,
      format,
    });
  }
  
  getMetrics(): Array<{ src: string; loadTime: number; size: number; format: string }> {
    return Array.from(this.metrics.entries()).map(([src, metrics]) => ({
      src,
      ...metrics,
    }));
  }
  
  getAverageLoadTime(): number {
    const times = Array.from(this.metrics.values()).map(m => m.loadTime);
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }
  
  getTotalDataTransfer(): number {
    return Array.from(this.metrics.values()).reduce((total, m) => total + m.size, 0);
  }
}

// Brand-specific image configurations
export const BRAND_IMAGE_CONFIGS = {
  hero: {
    quality: QUALITY_SETTINGS.hero,
    sizes: RESPONSIVE_SIZES.hero,
    priority: true,
    placeholder: 'brand' as const,
  },
  
  treatment: {
    quality: QUALITY_SETTINGS.gallery,
    sizes: RESPONSIVE_SIZES.card,
    priority: false,
    placeholder: 'brand' as const,
  },
  
  testimonial: {
    quality: QUALITY_SETTINGS.avatar,
    sizes: RESPONSIVE_SIZES.avatar,
    priority: false,
    placeholder: 'brand' as const,
  },
  
  gallery: {
    quality: QUALITY_SETTINGS.gallery,
    sizes: RESPONSIVE_SIZES.gallery,
    priority: false,
    placeholder: 'brand' as const,
  },
  
  background: {
    quality: QUALITY_SETTINGS.background,
    sizes: RESPONSIVE_SIZES.fullWidth,
    priority: true,
    placeholder: 'brand' as const,
  },
};

// Error handling for image loading
export function handleImageError(src: string, fallbackSrc?: string): string {
  console.warn(`Failed to load image: ${src}`);
  
  if (fallbackSrc) {
    return fallbackSrc;
  }
  
  // Return brand-consistent error placeholder
  return generateBrandSVGPlaceholder(400, 300, 'Image Unavailable');
}


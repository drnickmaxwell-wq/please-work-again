import dynamic from 'next/dynamic';

// Brand-consistent loading component
const BrandLoadingComponent = () => (
  <div className="min-h-[400px] bg-gradient-to-br from-slate-50 via-pink-25 to-teal-25 flex items-center justify-center">
    <div className="text-center">
      {/* Luxury loading animation with brand colors */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full animate-spin" />
          </div>
        </div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 border-2 border-pink-200 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-2 border border-teal-200 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
      </div>

      {/* Loading text with brand fonts */}
      <h3 className="text-lg font-semibold text-slate-800 mb-2" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
        Loading...
      </h3>
      <p className="text-slate-600 text-sm" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
        Preparing your luxury dental experience
      </p>
    </div>
  </div>
);

// Page-specific loading components
const TreatmentPageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50" 
       style={{ backgroundImage: 'url(/waves-bg-2560.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-white/80" />
    <div className="relative py-20 px-6 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Loading Treatment Information
        </h2>
        <p className="text-slate-600" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
          Preparing detailed treatment insights...
        </p>
      </div>
    </div>
  </div>
);

const BlogPageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50" 
       style={{ backgroundImage: 'url(/waves-bg-2560.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="absolute inset-0 bg-white/80" />
    <div className="relative py-20 px-6 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
          Loading Dental Health Insights
        </h2>
        <p className="text-slate-600" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
          Preparing expert articles and tips...
        </p>
      </div>
    </div>
  </div>
);

// Dynamic imports with brand-consistent loading states
export const DynamicComponents = {
  // Treatment pages
  TreatmentsPage: dynamic(() => import('@/app/treatments/page'), {
    loading: TreatmentPageLoader,
    ssr: true,
  }),

  ThreeDDentistryPage: dynamic(() => import('@/app/treatments/3d-dentistry/page'), {
    loading: TreatmentPageLoader,
    ssr: true,
  }),

  VeneersPage: dynamic(() => import('@/app/treatments/veneers/page'), {
    loading: TreatmentPageLoader,
    ssr: true,
  }),

  ImplantsPage: dynamic(() => import('@/app/treatments/implants/page'), {
    loading: TreatmentPageLoader,
    ssr: true,
  }),

  WhiteningPage: dynamic(() => import('@/app/treatments/whitening/page'), {
    loading: TreatmentPageLoader,
    ssr: true,
  }),

  // Content pages
  BlogPage: dynamic(() => import('@/app/blog/page'), {
    loading: BlogPageLoader,
    ssr: true,
  }),

  PatientStoriesPage: dynamic(() => import('@/app/patient-stories/page'), {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50" 
           style={{ backgroundImage: 'url(/waves-bg-2560.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative py-20 px-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Loading Patient Stories
            </h2>
            <p className="text-slate-600" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
              Preparing inspiring transformation stories...
            </p>
          </div>
        </div>
      </div>
    ),
    ssr: true,
  }),

  // Interactive components
  AISmileQuiz: dynamic(() => import('@/components/ai/ai-smile-quiz'), {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            Initializing AI Smile Quiz
          </h2>
          <p className="text-slate-600" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
            Preparing your personalized assessment...
          </p>
        </div>
      </div>
    ),
    ssr: false,
  }),

  // 3D Components
  ToothModelViewer: dynamic(() => import('@/components/3d/tooth-model-viewer'), {
    loading: () => <BrandLoadingComponent />,
    ssr: false,
  }),

  VirtualOfficeTour: dynamic(() => import('@/components/3d/virtual-office-tour'), {
    loading: () => <BrandLoadingComponent />,
    ssr: false,
  }),

  ARSmileTryOn: dynamic(() => import('@/components/3d/ar-smile-tryOn'), {
    loading: () => <BrandLoadingComponent />,
    ssr: false,
  }),

  // Heavy components
  LuxuryChatbot: dynamic(() => import('@/components/ai/luxury-chatbot'), {
    loading: () => (
      <div className="w-full h-64 bg-gradient-to-br from-slate-50 to-pink-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-sm text-slate-600" style={{ fontFamily: 'var(--font-inter), system-ui, Arial' }}>
            Loading AI Assistant...
          </p>
        </div>
      </div>
    ),
    ssr: false,
  }),
};

// Route-based code splitting configuration
export const RouteConfig = {
  // Critical routes (loaded immediately)
  critical: [
    '/',
    '/treatments',
    '/contact',
  ],

  // Important routes (preloaded on hover)
  important: [
    '/about',
    '/team',
    '/emergency-dentist',
    '/anxiety-dentistry',
  ],

  // Secondary routes (lazy loaded)
  secondary: [
    '/blog',
    '/patient-stories',
    '/ai-smile-quiz',
    '/treatments/3d-dentistry',
    '/treatments/veneers',
    '/treatments/implants',
    '/treatments/whitening',
  ],
};

// Preload function for important routes
export const preloadRoute = (route: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }
};

// Bundle analysis helper
export const getBundleInfo = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    };
  }
  return null;
};


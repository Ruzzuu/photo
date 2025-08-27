import { Camera, Sparkles, ArrowRight } from 'lucide-react';

interface LandingScreenProps {
  onStartSession: () => void;
  onShowCredits: () => void;
}

export default function LandingScreen({ onStartSession, onShowCredits }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Next Button - Top Right */}
      <button 
        className="fixed top-6 right-6 z-20 flex items-center justify-center w-12 h-12 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300"
        style={{
          transform: 'translateY(0px)',
          boxShadow: '0 0 0 rgba(255,255,255,0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.boxShadow = '0 0 0 rgba(255,255,255,0)';
        }}
        onClick={onShowCredits}
      >
        <ArrowRight size={20} />
      </button>
      {/* Floating Birthday Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-12 text-6xl opacity-20 floating-animation">🎂</div>
        <div className="absolute top-32 right-16 text-5xl opacity-30 floating-animation" style={{animationDelay: '1s'}}>🎉</div>
        <div className="absolute bottom-24 left-20 text-4xl opacity-25 floating-animation" style={{animationDelay: '2s'}}>🎈</div>
        <div className="absolute bottom-40 right-24 text-5xl opacity-20 floating-animation" style={{animationDelay: '3s'}}>🎁</div>
        <div className="absolute top-1/2 left-8 text-3xl opacity-30 floating-animation" style={{animationDelay: '4s'}}>✨</div>
        <div className="absolute top-1/3 right-8 text-4xl opacity-25 floating-animation" style={{animationDelay: '0.5s'}}>🌟</div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12 bg-white/20 rounded-3xl p-8 border border-white/30">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="font-pixelify text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-6">
            Birthday
          </h1>
          <h2 className="font-pixelify text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Photo Booth
          </h2>
          <p className="font-pixelify text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Capture magical moments and create unforgettable memories with friends and family. 
            Add fun filters, festive overlays, and share the joy!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <button 
            onClick={onStartSession}
            className="btn-primary flex items-center gap-3 group relative overflow-hidden bg-white/30 border border-white/40 hover:bg-white/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Camera className="w-6 h-6 relative z-10 text-white" />
            <span className="font-pixelify relative z-10 text-white font-semibold">Start Photo Session</span>
          </button>
        </div>

        {/* Credit Footer */}
        <div className="mt-16 text-center">
          <p className="font-pixelify text-sm text-white/70 hover:text-white transition-colors duration-300">
            Made with ❤️ by{' '}
            <a 
              href="https://www.instagram.com/fairuuzzfd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-pixelify text-pink-400 hover:text-pink-100 underline decoration-pink-400/60 hover:decoration-pink-100 transition-all duration-300 font-bold"
            >
              Fairuzd
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
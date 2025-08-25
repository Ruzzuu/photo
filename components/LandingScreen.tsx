import { Camera, Heart, Sparkles } from 'lucide-react';

interface LandingScreenProps {
  onStartSession: () => void;
}

export default function LandingScreen({ onStartSession }: LandingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
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
        <div className="mb-12">
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
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-6">
            Birthday
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Photo Booth
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Capture magical moments and create unforgettable memories with friends and family. 
            Add fun filters, festive overlays, and share the joy!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <button 
            onClick={onStartSession}
            className="btn-primary flex items-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Camera className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Start Photo Session</span>
            <Heart className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>
    </div>
  );
}
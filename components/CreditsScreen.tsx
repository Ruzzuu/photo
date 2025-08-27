import { ArrowRight } from 'lucide-react';

interface CreditsScreenProps {
  onNext: () => void;
}

export default function CreditsScreen({ onNext }: CreditsScreenProps) {
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
        onClick={onNext}
      >
        <ArrowRight size={20} />
      </button>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Credits Section */}
        <div className="mb-12 bg-white/20 rounded-3xl p-8 border border-white/30">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🙏</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                <span className="text-lg">❤️</span>
              </div>
            </div>
          </div>
          
          <h1 className="font-pixelify text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Credits
          </h1>
          <h2 className="font-pixelify text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
            Mad Respect
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="font-pixelify text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md mb-8">
              Big love and mad respect to all the folks holdin' it down with the dope assets — shoutout to{' '}
              <span className="text-cyan-300 font-bold">CraftPix</span> for the fire pixel art,{' '}
              <span className="text-pink-300 font-bold">Pinterest</span> for all that inspo, and{' '}
              <span className="text-blue-300 font-bold">Google</span> comin' through with the fonts.
            </p>
            
            <p className="font-pixelify text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md">
              And can't forget the real ones at the frontlines —{' '}
              <span className="text-purple-300 font-bold">Dario Amodei</span> at Anthropic and{' '}
              <span className="text-green-300 font-bold">Sam Altman</span> at OpenAI — y'all the MVPs fr.{' '}
              <span className="text-yellow-300 font-bold">Much love, keep pushin' the culture forward</span> 🚀
            </p>
          </div>
        </div>

        {/* Developer Credit Footer */}
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

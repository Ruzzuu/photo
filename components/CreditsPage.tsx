import React from 'react';
import './PixelAnimations.css';

interface CreditsPageProps {
  onBackToLanding?: () => void;
}

const CreditsPage: React.FC<CreditsPageProps> = ({ onBackToLanding }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-center px-8 relative">
      
      {/* Animated Background Elements */}
      <div className="pixel-bird bird-1"></div>
      <div className="pixel-bird bird-2"></div>
      
      {/* Back Button */}
      {onBackToLanding && (
        <button 
          className="fixed top-6 left-6 z-20 flex items-center justify-center w-12 h-12 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300"
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
          onClick={onBackToLanding}
        >
          ←
        </button>
      )}

      {/* Main Title */}
      <h1 
        className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-8 drop-shadow-2xl"
        style={{ fontFamily: 'Pixelify Sans, monospace' }}
      >
        Credits & Thanks
      </h1>

      {/* Main Content */}
      <div className="max-w-4xl">
        <p 
          className="text-lg md:text-xl text-white leading-relaxed drop-shadow-lg"
          style={{ fontFamily: 'Pixelify Sans, monospace' }}
        >
          First and foremost, all praise to Allah SWT for blessing me with the chance and strength to bring this prototype to life.
          <br /><br />
          Big love and mad respect to all the folks holdin' it down with the dope assets shoutout to <span className="text-purple-400 font-semibold">CraftPix</span> for the fire pixel art, <span className="text-pink-400 font-semibold">Pinterest</span> for all that inspo, and <span className="text-orange-400 font-semibold">Google</span> comin' through with the fonts. And can't forget the real ones at the frontlines — <span className="text-purple-400 font-semibold">Dario Amodei</span> at <span className="text-pink-400 font-semibold">Anthropic</span> and <span className="text-orange-400 font-semibold">Sam Altman</span> at <span className="text-purple-400 font-semibold">OpenAI</span> y'all the MVPs fr.
          <br /><br />
          May every single one of y'all stay blessed, stay inspired, and keep grindin'.
          <br /><br />
          If you got feedback, ideas, or even complaints, don't be shy — Contact me at the link below.
        </p>
      </div>

      {/* Footer Credits - Same style as Landing Page */}
      <footer 
        className="absolute bottom-6 text-gray-400 text-sm"
        style={{ fontFamily: 'Pixelify Sans, monospace' }}
      >
        Made with ❤️ by{' '}
        <a 
          href="https://www.instagram.com/fairuuzzfd" 
          className="underline hover:text-white transition-colors duration-300 text-purple-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fairuzd
        </a>
      </footer>
    </div>
  );
};

export default CreditsPage;

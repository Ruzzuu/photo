import { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import CreditsScreen from './components/CreditsScreen';
import CreditsPage from './components/CreditsPage';
import Designer from './components/Designer';
import PhotoBoothCustomizer from './components/PhotoBooth';
import PixelAnimations from './components/PixelAnimations';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  const handleStartSession = () => {
    setCurrentScreen('customizer');
  };

  const handleShowCredits = () => {
    setCurrentScreen('credits');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay untuk memperhalus background */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Pixel Animations */}
      <PixelAnimations />
      
      {/* Keep balloon animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-orange-200 rounded-full opacity-12 floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {currentScreen === 'landing' && (
          <LandingScreen 
            onStartSession={handleStartSession} 
            onShowCredits={handleShowCredits}
          />
        )}
        
        {currentScreen === 'credits' && (
          <CreditsScreen onNext={handleBackToLanding} />
        )}
        
        {currentScreen === 'designer' && (
          <Designer onBackToLanding={handleBackToLanding} />
        )}

        {currentScreen === 'customizer' && (
          <PhotoBoothCustomizer 
            onBackToLanding={handleBackToLanding}
          />
        )}

        {currentScreen === 'finalCredits' && (
          <CreditsPage onBackToLanding={handleBackToLanding} />
        )}
      </div>
    </div>
  );
}
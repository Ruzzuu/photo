import { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import Designer from './components/Designer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  const handleStartSession = () => {
    setCurrentScreen('designer');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 floating-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-orange-200 rounded-full opacity-25 floating-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-16 w-36 h-36 bg-yellow-200 rounded-full opacity-20 floating-animation" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {currentScreen === 'landing' && (
          <LandingScreen onStartSession={handleStartSession} />
        )}
        
        {currentScreen === 'designer' && (
          <Designer onBackToLanding={handleBackToLanding} />
        )}
      </div>
    </div>
  );
}
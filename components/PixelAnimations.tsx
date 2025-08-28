import { useEffect, useState, useCallback, memo } from 'react';
import './PixelAnimations.css';

const PixelAnimations = memo(() => {
  // Animation state with better performance
  const [birdFrame, setBirdFrame] = useState(0);
  const [dogFrame, setDogFrame] = useState(0);
  const [catFrame, setCatFrame] = useState(0);
  const [kucingFrame, setKucingFrame] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Memoized animation frames for better performance
  const birdFrames = useState(["bird1.png", "bird2.png", "bird3.png", "bird4.png"])[0];
  const dogFrames = useState(["dog1.png", "dog2.png", "dog3.png", "dog4.png"])[0];
  const catFrames = useState(["cat1.png", "cat2.png"])[0];
  const kucingFrames = useState(["kucing1.png", "kucing2.png", "kucing3.png", "kucing4.png"])[0];

  // Pause animations when not visible for performance
  const handleVisibilityChange = useCallback(() => {
    setIsVisible(!document.hidden);
  }, []);

  // Visibility change listener for performance
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  // Bird animation (flying in sky) - pauses when not visible
  useEffect(() => {
    if (!isVisible) return;
    
    const birdInterval = setInterval(() => {
      setBirdFrame((prev) => (prev + 1) % birdFrames.length);
    }, 200);

    return () => clearInterval(birdInterval);
  }, [birdFrames.length, isVisible]);

  // Dog animation (ground level) - pauses when not visible
  useEffect(() => {
    if (!isVisible) return;
    
    const dogInterval = setInterval(() => {
      setDogFrame((prev) => (prev + 1) % dogFrames.length);
    }, 250);

    return () => clearInterval(dogInterval);
  }, [dogFrames.length, isVisible]);

  // Cat animation (ground level) - pauses when not visible
  useEffect(() => {
    if (!isVisible) return;
    
    const catInterval = setInterval(() => {
      setCatFrame((prev) => (prev + 1) % catFrames.length);
    }, 300);

    return () => clearInterval(catInterval);
  }, [catFrames.length, isVisible]);

  // Kucing animation (ground level) - pauses when not visible
  useEffect(() => {
    if (!isVisible) return;
    
    const kucingInterval = setInterval(() => {
      setKucingFrame((prev) => (prev + 1) % kucingFrames.length);
    }, 220);

    return () => clearInterval(kucingInterval);
  }, [kucingFrames.length, isVisible]);

  return (
    <div className="pixel-animations-container">
      {/* Bird flying in sky - center top */}
      <div className="pixel-anim bird-anim sky-position">
        <img 
          src={`/${birdFrames[birdFrame]}`} 
          alt="Flying bird animation"
          className="pixel-sprite bird-sprite"
        />
      </div>

      {/* Second bird flying in sky - mirrored direction (right side) */}
      <div className="pixel-anim bird-anim sky-position-right">
        <img 
          src={`/${birdFrames[(birdFrame + 2) % birdFrames.length]}`} 
          alt="Flying bird animation 2"
          className="pixel-sprite bird-sprite-mirrored"
        />
      </div>

      {/* Main ground animals positioned at bottom center */}
      <div className="pixel-anim dog-anim ground-center">
        <img 
          src={`/${dogFrames[dogFrame]}`} 
          alt="Dog animation"
          className="pixel-sprite dog-sprite"
        />
      </div>

      {/* Left side ground animals */}
      <div className="pixel-anim cat-anim ground-left">
        <img 
          src={`/${catFrames[catFrame]}`} 
          alt="Cat animation"
          className="pixel-sprite cat-sprite"
        />
      </div>

      <div className="pixel-anim dog-anim ground-far-left">
        <img 
          src={`/${dogFrames[(dogFrame + 2) % dogFrames.length]}`} 
          alt="Dog animation 2"
          className="pixel-sprite dog-sprite-small"
        />
      </div>

      {/* Right side ground animals */}
      <div className="pixel-anim kucing-anim ground-right">
        <img 
          src={`/${kucingFrames[kucingFrame]}`} 
          alt="Kucing animation"
          className="pixel-sprite kucing-sprite"
        />
      </div>

      <div className="pixel-anim kucing-anim ground-far-right">
        <img 
          src={`/${kucingFrames[(kucingFrame + 1) % kucingFrames.length]}`} 
          alt="Kucing animation 2"
          className="pixel-sprite kucing-sprite-small"
        />
      </div>

      {/* Additional center animals for more life */}
      <div className="pixel-anim cat-anim ground-center-left">
        <img 
          src={`/${catFrames[(catFrame + 1) % catFrames.length]}`} 
          alt="Cat animation 2"
          className="pixel-sprite cat-sprite-small"
        />
      </div>

      <div className="pixel-anim kucing-anim ground-center-right">
        <img 
          src={`/${kucingFrames[(kucingFrame + 3) % kucingFrames.length]}`} 
          alt="Kucing animation 3"
          className="pixel-sprite kucing-sprite-small"
        />
      </div>
    </div>
  );
});

// Display name for debugging
PixelAnimations.displayName = 'PixelAnimations';

export default PixelAnimations;

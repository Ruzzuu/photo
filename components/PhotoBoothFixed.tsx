import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import './PhotoBoothNew.css';

interface PhotoBoothProps {
  onBackToLanding?: () => void;
  onNext?: () => void;
}

interface Slot {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ThemeConfig {
  themeName: string;
  canvas: {
    width: number;
    height: number;
  };
  slots: Slot[];
}

const PhotoBoothFixed: React.FC<PhotoBoothProps> = ({ onBackToLanding, onNext }) => {
  const [config, setConfig] = useState<ThemeConfig[] | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('blacktheme1');
  const [photos, setPhotos] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [photoFitMode, setPhotoFitMode] = useState<'cover' | 'contain' | 'fill'>('cover');
  const [showCamera, setShowCamera] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load theme config
  useEffect(() => {
    const loadThemeConfig = async () => {
      try {
        const response = await fetch('/themes_new_config.json');
        if (!response.ok) {
          throw new Error('Failed to load theme configuration');
        }
        const themeConfig = await response.json();
        setConfig(themeConfig);
        setLoading(false);
      } catch (err) {
        console.error('Error loading theme config:', err);
        setError('Failed to load themes');
        setLoading(false);
      }
    };

    loadThemeConfig();
  }, []);

  const theme = config?.find(t => t.themeName === currentTheme);

  // Get canvas display dimensions with proper scaling
  const getDisplayDimensions = () => {
    if (!theme) return { width: 300, height: 900, scale: 0.5 };
    
    const baseWidth = theme.canvas.width;
    const baseHeight = theme.canvas.height;
    
    // Adjust scale based on canvas orientation and size
    let scale = 0.4;
    if (baseWidth > baseHeight) {
      // Landscape (like blacktheme3: 1800x1200)
      scale = 0.25; // Smaller scale for landscape
    } else if (baseHeight > 1500) {
      // Portrait with large height (like 600x1800)
      scale = 0.35;
    }
    
    return {
      width: Math.round(baseWidth * scale),
      height: Math.round(baseHeight * scale),
      scale
    };
  };

  const displayDimensions = getDisplayDimensions();

  // Handle photo upload
  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, slotIndex: number) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotos(prev => ({ ...prev, [slotIndex]: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle photo drag and drop
  const handlePhotoDrop = useCallback((e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotos(prev => ({ ...prev, [slotIndex]: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handlePhotoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle theme change
  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName);
    setPhotos({}); // Reset photos when theme changes
  };

  // Camera functions
  const startCamera = async (slotIndex: number) => {
    try {
      setActiveSlotIndex(slotIndex);
      setShowCamera(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Front camera for selfies
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions and try again.');
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || activeSlotIndex === null) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    // Stop camera
    stopCamera();

    // Add photo to slot
    setPhotos(prev => ({
      ...prev,
      [activeSlotIndex]: dataUrl
    }));
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setActiveSlotIndex(null);
  };

  // Helper function to load image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Function to draw image in slot with proper object-fit calculation
  const drawImageInSlot = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    slot: { x: number; y: number; width: number; height: number },
    mode: 'cover' | 'contain' | 'fill'
  ) => {
    if (mode === 'fill') {
      // Fill: stretch to fit exactly (may distort)
      ctx.drawImage(img, slot.x, slot.y, slot.width, slot.height);
      return;
    }

    const imgRatio = img.width / img.height;
    const slotRatio = slot.width / slot.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (mode === 'cover') {
      // Cover: crop supaya penuh memenuhi slot
      if (imgRatio > slotRatio) {
        // gambar lebih lebar → crop horizontal
        drawHeight = slot.height;
        drawWidth = img.width * (slot.height / img.height);
        offsetX = slot.x - (drawWidth - slot.width) / 2;
        offsetY = slot.y;
      } else {
        // gambar lebih tinggi → crop vertical
        drawWidth = slot.width;
        drawHeight = img.height * (slot.width / img.width);
        offsetX = slot.x;
        offsetY = slot.y - (drawHeight - slot.height) / 2;
      }
    } else {
      // Contain: fit tanpa crop, sisanya transparan
      if (imgRatio > slotRatio) {
        // gambar lebih lebar → fit horizontal
        drawWidth = slot.width;
        drawHeight = img.height * (slot.width / img.width);
        offsetX = slot.x;
        offsetY = slot.y + (slot.height - drawHeight) / 2;
      } else {
        // gambar lebih tinggi → fit vertical
        drawHeight = slot.height;
        drawWidth = img.width * (slot.height / img.height);
        offsetX = slot.x + (slot.width - drawWidth) / 2;
        offsetY = slot.y;
      }
    }

    // Clip gambar supaya tidak keluar dari slot
    ctx.save();
    ctx.beginPath();
    ctx.rect(slot.x, slot.y, slot.width, slot.height);
    ctx.clip();
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // Export function with manual canvas rendering
  const exportImage = async () => {
    if (!canvasRef.current || !theme) return;

    try {
      // Create canvas with original theme dimensions
      const canvas = document.createElement('canvas');
      canvas.width = theme.canvas.width;
      canvas.height = theme.canvas.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw photo slots with proper object-fit calculation
      for (let i = 0; i < theme.slots.length; i++) {
        const slot = theme.slots[i];
        const photoSrc = photos[i];
        
        if (photoSrc) {
          try {
            const img = await loadImage(photoSrc);
            drawImageInSlot(ctx, img, slot, photoFitMode);
          } catch (error) {
            console.warn(`Failed to load photo ${i}:`, error);
          }
        }
      }

      // 2. Draw theme overlay on top
      try {
        const themeOverlay = await loadImage(`/${currentTheme}.png`);
        ctx.drawImage(themeOverlay, 0, 0, theme.canvas.width, theme.canvas.height);
      } catch (error) {
        console.warn('Failed to load theme overlay:', error);
      }

      // 3. Download the result
      const link = document.createElement('a');
      link.download = `photobooth-${currentTheme}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="photobooth-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading themes...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="photobooth-error">
        <div className="error-content">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="photobooth-new">
      {/* Back Button */}
      {onBackToLanding && (
        <button className="back-button" onClick={onBackToLanding}>
          <ArrowLeft size={16} />
          Back
        </button>
      )}

      {/* Controls Panel */}
      <div className="controls-panel">
        <h2 className="font-pixelify">Photo Booth</h2>
        
        {/* Theme Selection */}
        <div className="control-section">
          <h3>Choose Theme</h3>
          <div className="theme-grid">
            {config.map((themeData) => (
              <div
                key={themeData.themeName}
                className={`theme-option ${currentTheme === themeData.themeName ? 'active' : ''}`}
                onClick={() => handleThemeChange(themeData.themeName)}
              >
                <img 
                  src={`/${themeData.themeName}.png`} 
                  alt={themeData.themeName}
                  onError={(e) => {
                    console.warn(`Failed to load theme preview: /${themeData.themeName}.png`);
                    e.currentTarget.src = '/background.png'; // fallback image
                  }}
                />
                <span>{themeData.themeName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Fit Mode */}
        <div className="control-section">
          <h3>Photo Fit Mode</h3>
          <div className="fit-mode-buttons">
            <button 
              className={photoFitMode === 'cover' ? 'active' : ''}
              onClick={() => setPhotoFitMode('cover')}
            >
              Cover (Fill)
            </button>
            <button 
              className={photoFitMode === 'contain' ? 'active' : ''}
              onClick={() => setPhotoFitMode('contain')}
            >
              Contain (Fit)
            </button>
          </div>
        </div>

        {/* Theme Info */}
        {theme && (
          <div className="control-section">
            <h3>Theme Info</h3>
            <div style={{ fontSize: '12px', color: '#ccc' }}>
              <p>Size: {theme.canvas.width} × {theme.canvas.height}</p>
              <p>Slots: {theme.slots.length}</p>
              <p>Preview: {displayDimensions.width} × {displayDimensions.height}</p>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="control-section">
          <button className="export-button" onClick={exportImage}>
            <Download size={20} />
            Download Result
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="canvas-area">
        {/* Next Button - Top Right */}
        {onNext && (
          <button 
            className="next-button-top" 
            onClick={onNext}
            title="Go to Credits Page"
          >
            <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            Next
          </button>
        )}
        
        {theme && (
          <div
            ref={canvasRef}
            className="photo-canvas"
            style={{
              width: displayDimensions.width,
              height: displayDimensions.height,
              backgroundColor: 'transparent'
            }}
          >
            {/* Photo Slots */}
            {theme.slots.map((slot, index) => (
              <div
                key={index}
                className="photo-slot"
                style={{
                  position: 'absolute',
                  left: slot.x * displayDimensions.scale,
                  top: slot.y * displayDimensions.scale,
                  width: slot.width * displayDimensions.scale,
                  height: slot.height * displayDimensions.scale,
                  overflow: 'hidden', // Clip gambar agar tidak keluar slot
                  border: photos[index] ? 'none' : '2px dashed rgba(255, 255, 255, 0.4)',
                  zIndex: 1 // Photo slots di bawah theme overlay
                }}
                onDrop={(e) => handlePhotoDrop(e, index)}
                onDragOver={handlePhotoDragOver}
              >
                {photos[index] ? (
                  <img
                    src={photos[index]}
                    alt={`Photo ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: photoFitMode,
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                ) : (
                  <div className="upload-area">
                    {/* Upload Button */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, index)}
                      className="file-input"
                      id={`photo-${index}`}
                    />
                    <label htmlFor={`photo-${index}`} className="upload-label">
                      <div className="upload-icon">�</div>
                      <div>Upload Photo</div>
                    </label>
                    
                    {/* Camera Button */}
                    <button 
                      className="camera-btn"
                      onClick={() => startCamera(index)}
                      type="button"
                    >
                      <div className="camera-icon">📷</div>
                      <div>Take Photo</div>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Theme Overlay - PNG transparan di atas semua foto */}
            <img
              src={`/${currentTheme}.png`}
              alt={`${currentTheme} overlay`}
              className="theme-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10, // Selalu di atas foto
                pointerEvents: 'none', // Tidak menghalangi interaksi user
                objectFit: 'contain',
                objectPosition: 'center'
              }}
            />
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-content">
            <div className="camera-header">
              <h3>Take Photo for Slot {(activeSlotIndex || 0) + 1}</h3>
              <button 
                className="close-camera-btn"
                onClick={stopCamera}
                type="button"
              >
                ❌
              </button>
            </div>
            
            <div className="camera-preview">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="camera-video"
              />
            </div>
            
            <div className="camera-controls">
              <button 
                className="capture-btn"
                onClick={capturePhoto}
                type="button"
              >
                📸 Capture Photo
              </button>
              <button 
                className="cancel-btn"
                onClick={stopCamera}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoBoothFixed;

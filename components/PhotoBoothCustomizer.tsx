import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { ArrowLeft } from 'lucide-react';
import { themes, layoutSpecs } from '../utils/themes';
import './PhotoBoothCustomizer.css';

interface PhotoBoothCustomizerProps {
  onBackToLanding?: () => void;
}

const PhotoBoothCustomizer: React.FC<PhotoBoothCustomizerProps> = ({ onBackToLanding }) => {
  const [layout, setLayout] = useState<string>("2x6");
  const [selectedTheme, setSelectedTheme] = useState(themes["2x6"][0]);
  const [photos, setPhotos] = useState<Record<number, string>>({});
  const [themeLoadError, setThemeLoadError] = useState<boolean>(false);
  const [isThemeLoading, setIsThemeLoading] = useState<boolean>(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const currentLayoutSpec = layoutSpecs[layout];

  // Handle theme image error
  const handleThemeError = () => {
    console.error(`Failed to load theme: ${selectedTheme.src}`);
    setThemeLoadError(true);
    setIsThemeLoading(false);
  };

  // Handle theme image load success
  const handleThemeLoad = () => {
    console.log(`Successfully loaded theme: ${selectedTheme.src}`);
    setThemeLoadError(false);
    setIsThemeLoading(false);
  };

  // Get canvas display dimensions
  const getDisplayDimensions = () => {
    const baseWidth = currentLayoutSpec.width;
    const baseHeight = currentLayoutSpec.height;
    
    let scale = 1;
    let displayWidth = baseWidth;
    let displayHeight = baseHeight;
    
    if (layout === "2x6") {
      // Strip layout: scale down untuk fit in UI
      scale = 0.4; // Show at 40% of original size
      displayWidth = Math.round(baseWidth * scale);
      displayHeight = Math.round(baseHeight * scale);
    } else {
      // 4x6 layout: scale down untuk fit in UI
      scale = 0.5; // Show at 50% of original size
      displayWidth = Math.round(baseWidth * scale);
      displayHeight = Math.round(baseHeight * scale);
    }
    
    return { 
      width: displayWidth, 
      height: displayHeight, 
      scale 
    };
  };

  const displayDimensions = getDisplayDimensions();

  // Handle layout change
  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
    setSelectedTheme(themes[newLayout][0]);
    setPhotos({}); // Reset photos when layout changes
    setIsThemeLoading(true);
  };

  // Handle photo upload
  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, slotId: number) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotos(prev => ({ ...prev, [slotId]: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle photo drag and drop
  const handlePhotoDrop = useCallback((e: React.DragEvent, slotId: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotos(prev => ({ ...prev, [slotId]: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handlePhotoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Export function
  const exportImage = async () => {
    if (canvasRef.current) {
      try {
        // Temporarily scale up untuk export dengan ukuran asli
        const originalStyle = canvasRef.current.style.cssText;
        
        canvasRef.current.style.width = `${currentLayoutSpec.width}px`;
        canvasRef.current.style.height = `${currentLayoutSpec.height}px`;
        canvasRef.current.style.transform = 'scale(1)';
        
        // Update all children untuk export size
        const slots = canvasRef.current.querySelectorAll('.photo-slot');
        const originalSlotStyles: string[] = [];
        slots.forEach((slot, index) => {
          const htmlSlot = slot as HTMLElement;
          originalSlotStyles[index] = htmlSlot.style.cssText;
          const specSlot = currentLayoutSpec.slots[index];
          htmlSlot.style.left = `${specSlot.x}px`;
          htmlSlot.style.top = `${specSlot.y}px`;
          htmlSlot.style.width = `${specSlot.width}px`;
          htmlSlot.style.height = `${specSlot.height}px`;
        });
        
        const canvas = await html2canvas(canvasRef.current, {
          width: currentLayoutSpec.width,
          height: currentLayoutSpec.height,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null
        });
        
        // Restore original styles
        canvasRef.current.style.cssText = originalStyle;
        slots.forEach((slot, index) => {
          const htmlSlot = slot as HTMLElement;
          htmlSlot.style.cssText = originalSlotStyles[index];
        });
        
        const link = document.createElement('a');
        link.download = `photobooth-${layout}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed. Please try again.');
      }
    }
  };

  return (
    <div className="photobooth-customizer">
      {/* Back Button */}
      {onBackToLanding && (
        <button className="back-button-customizer" onClick={onBackToLanding}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
      )}

      <div className="controls-panel">
        <h2>Photo Booth Simple</h2>
        
        {/* Layout Selection */}
        <div className="control-section">
          <h3>Layout</h3>
          <div className="layout-buttons">
            <button 
              className={layout === "2x6" ? "active" : ""}
              onClick={() => handleLayoutChange("2x6")}
            >
              2×6 Strip
            </button>
            <button 
              className={layout === "4x6" ? "active" : ""}
              onClick={() => handleLayoutChange("4x6")}
            >
              4×6 Postcard
            </button>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="control-section">
          <h3>Choose Theme</h3>
          <div className="theme-grid">
            {themes[layout].map((theme) => (
              <div
                key={theme.id}
                className={`theme-option ${selectedTheme.id === theme.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedTheme(theme);
                  setThemeLoadError(false);
                }}
              >
                <img 
                  src={theme.src} 
                  alt={theme.name}
                  onError={(e) => {
                    console.warn(`Failed to load theme preview: ${theme.src}`);
                    e.currentTarget.src = '/background.png'; // fallback image
                  }}
                />
                <span>{theme.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="control-section">
          <button className="export-button" onClick={exportImage}>
            Download Result
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="canvas-area">
        <div
          ref={canvasRef}
          className="photo-canvas"
          style={{
            width: displayDimensions.width,
            height: displayDimensions.height,
            backgroundImage: themeLoadError ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : `url(${selectedTheme.src})`,
            backgroundSize: '100% 100%', // Fill exactly to canvas dimensions
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Loading indicator */}
          {isThemeLoading && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#666',
              fontSize: '14px',
              background: 'rgba(255,255,255,0.9)',
              padding: '10px 20px',
              borderRadius: '8px',
              zIndex: 10
            }}>
              Loading theme...
            </div>
          )}
          
          {/* Error indicator */}
          {themeLoadError && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#ff4757',
              fontSize: '12px',
              background: 'rgba(255,255,255,0.9)',
              padding: '8px 16px',
              borderRadius: '6px',
              zIndex: 10
            }}>
              Theme failed to load
            </div>
          )}
          
          {/* Hidden image for error handling */}
          <img
            src={selectedTheme.src}
            alt="theme"
            style={{ display: 'none' }}
            onLoad={handleThemeLoad}
            onError={handleThemeError}
          />

          {/* Photo Slots - Area transparan untuk upload foto */}
          {currentLayoutSpec.slots.map((slot) => (
            <div
              key={slot.id}
              className="photo-slot"
              style={{
                position: 'absolute',
                left: slot.x * displayDimensions.scale,
                top: slot.y * displayDimensions.scale,
                width: slot.width * displayDimensions.scale,
                height: slot.height * displayDimensions.scale
              }}
              onDrop={(e) => handlePhotoDrop(e, slot.id)}
              onDragOver={handlePhotoDragOver}
            >
              {photos[slot.id] ? (
                <img
                  src={photos[slot.id]}
                  alt={`Photo ${slot.id}`}
                  className="uploaded-photo"
                />
              ) : (
                <div className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, slot.id)}
                    className="file-input"
                    id={`photo-${slot.id}`}
                  />
                  <label htmlFor={`photo-${slot.id}`} className="upload-label">
                    <div className="upload-icon">📷</div>
                    <div>Click to upload photo</div>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoBoothCustomizer;

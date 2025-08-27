import React, { useState, useRef } from 'react';

// Coordinate Helper Tool untuk mengatur posisi slot dengan mudah
const CoordinateHelper: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('blacktheme1');
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [slots, setSlots] = useState([
    { id: 1, left: 76, top: 113, width: 449, height: 451 },
    { id: 2, left: 76, top: 586, width: 449, height: 451 },
    { id: 3, left: 76, top: 1058, width: 449, height: 451 }
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const scale = 0.4; // Sama dengan scale di PhotoBoothNew

  const themes = [
    'blacktheme1',
    'blacktheme3', 
    'adventuretimetheme',
    'zootopiatheme'
  ];

  const handleSlotMove = (slotId: number, newLeft: number, newTop: number) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId 
        ? { ...slot, left: Math.round(newLeft / scale), top: Math.round(newTop / scale) }
        : slot
    ));
  };

  const handleSlotResize = (slotId: number, newWidth: number, newHeight: number) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId 
        ? { ...slot, width: Math.round(newWidth / scale), height: Math.round(newHeight / scale) }
        : slot
    ));
  };

  const exportConfig = () => {
    const config = {
      [currentTheme]: {
        name: currentTheme,
        layout: { width: 600, height: 1800 },
        backgroundImage: `/${currentTheme}.png`,
        slots: slots
      }
    };
    
    console.log('Copy this to themes.json:');
    console.log(JSON.stringify(config, null, 2));
    
    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    alert('Config copied to clipboard!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Coordinate Helper Tool</h2>
      
      {/* Theme Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label>Select Theme: </label>
        <select 
          value={currentTheme} 
          onChange={(e) => setCurrentTheme(e.target.value)}
          style={{ padding: '5px 10px', marginLeft: '10px' }}
        >
          {themes.map(theme => (
            <option key={theme} value={theme}>{theme}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Canvas */}
        <div style={{ flex: 1 }}>
          <div
            ref={canvasRef}
            style={{
              position: 'relative',
              width: 600 * scale,
              height: 1800 * scale,
              backgroundImage: `url(/${currentTheme}.png)`,
              backgroundSize: '100% 100%',
              border: '2px solid #ccc',
              margin: '0 auto'
            }}
          >
            {slots.map((slot) => (
              <div
                key={slot.id}
                style={{
                  position: 'absolute',
                  left: slot.left * scale,
                  top: slot.top * scale,
                  width: slot.width * scale,
                  height: slot.height * scale,
                  border: `2px ${selectedSlot === slot.id ? 'solid red' : 'dashed rgba(255,255,255,0.8)'}`,
                  background: selectedSlot === slot.id ? 'rgba(255,0,0,0.2)' : 'rgba(0,194,199,0.2)',
                  cursor: 'move',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}
                onClick={() => setSelectedSlot(slot.id)}
              >
                Slot {slot.id}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ width: '300px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Slot Controls</h3>
          
          {selectedSlot && (
            <div>
              <h4>Slot {selectedSlot}</h4>
              {slots.filter(s => s.id === selectedSlot).map(slot => (
                <div key={slot.id}>
                  <div style={{ marginBottom: '10px' }}>
                    <label>Left: </label>
                    <input 
                      type="number" 
                      value={slot.left}
                      onChange={(e) => handleSlotMove(slot.id, Number(e.target.value) * scale, slot.top * scale)}
                      style={{ width: '60px', marginLeft: '5px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label>Top: </label>
                    <input 
                      type="number" 
                      value={slot.top}
                      onChange={(e) => handleSlotMove(slot.id, slot.left * scale, Number(e.target.value) * scale)}
                      style={{ width: '60px', marginLeft: '5px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label>Width: </label>
                    <input 
                      type="number" 
                      value={slot.width}
                      onChange={(e) => handleSlotResize(slot.id, Number(e.target.value) * scale, slot.height * scale)}
                      style={{ width: '60px', marginLeft: '5px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label>Height: </label>
                    <input 
                      type="number" 
                      value={slot.height}
                      onChange={(e) => handleSlotResize(slot.id, slot.width * scale, Number(e.target.value) * scale)}
                      style={{ width: '60px', marginLeft: '5px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <h4>Current Config:</h4>
            <pre style={{ background: 'white', padding: '10px', fontSize: '10px', overflow: 'auto', maxHeight: '200px' }}>
              {JSON.stringify({ [currentTheme]: { slots } }, null, 2)}
            </pre>
          </div>

          <button 
            onClick={exportConfig}
            style={{ 
              width: '100%', 
              padding: '10px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Export Config
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e7f3ff', borderRadius: '5px' }}>
        <h4>Instructions:</h4>
        <ol>
          <li>Select a theme from dropdown</li>
          <li>Click on a slot to select it (red border)</li>
          <li>Adjust Left, Top, Width, Height values</li>
          <li>Click "Export Config" to copy JSON to clipboard</li>
          <li>Paste the JSON into /public/themes.json</li>
        </ol>
      </div>
    </div>
  );
};

export default CoordinateHelper;

// Theme Coordinate Helper
// Utility untuk mengatur koordinat area transparan dengan mudah

export interface ThemeSlot {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ThemeData {
  name: string;
  layout: {
    width: number;
    height: number;
  };
  backgroundImage: string;
  slots: ThemeSlot[];
}

// Helper function untuk mengonversi Figma coordinates ke JSON config
export const convertFigmaToTheme = (
  figmaFrame: { x: number; y: number; width: number; height: number },
  figmaSlots: Array<{ x: number; y: number; width: number; height: number }>
): ThemeSlot[] => {
  return figmaSlots.map((slot, index) => ({
    id: index + 1,
    left: slot.x - figmaFrame.x, // Relatif ke frame
    top: slot.y - figmaFrame.y,  // Relatif ke frame
    width: slot.width,
    height: slot.height
  }));
};

// Helper function untuk validasi koordinat
export const validateThemeCoordinates = (theme: ThemeData): boolean => {
  return theme.slots.every(slot => {
    const rightEdge = slot.left + slot.width;
    const bottomEdge = slot.top + slot.height;
    
    return (
      slot.left >= 0 &&
      slot.top >= 0 &&
      rightEdge <= theme.layout.width &&
      bottomEdge <= theme.layout.height
    );
  });
};

// Standard koordinat untuk theme yang umum digunakan
export const standardLayouts = {
  photoStrip600x1800: {
    layout: { width: 600, height: 1800 },
    commonSlots: [
      { id: 1, left: 77, top: 115, width: 448, height: 450 },   // Slot 1 (atas)
      { id: 2, left: 77, top: 587, width: 448, height: 450 },   // Slot 2 (tengah)
      { id: 3, left: 77, top: 1059, width: 448, height: 450 }   // Slot 3 (bawah)
    ]
  },
  photoStrip1200x1800: {
    layout: { width: 1200, height: 1800 },
    commonSlots: [
      { id: 1, left: 84, top: 83, width: 831, height: 517 },    // Slot besar atas
      { id: 2, left: 84, top: 701, width: 530, height: 441 },   // Slot kecil kiri bawah
      { id: 3, left: 635, top: 701, width: 530, height: 441 },  // Slot kecil tengah bawah
      { id: 4, left: 1186, top: 701, width: 530, height: 441 }  // Slot kecil kanan bawah
    ]
  }
};

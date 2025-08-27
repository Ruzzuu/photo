// Theme system untuk Photo Booth Layout Customizer

export interface Theme {
  id: string;
  name: string;
  src: string;
  description: string;
}

export interface LayoutSlot {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutSpec {
  name: string;
  width: number;
  height: number;
  slots: LayoutSlot[];
}

export interface Sticker {
  name: string;
  src: string;
}

export interface PlacedSticker extends Sticker {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const themes: Record<string, Theme[]> = {
  "2x6": [
    {
      id: "zootopia-strip",
      name: "Zootopia",
      src: "/zootopiatheme.png",
      description: "Fun animal theme for strip layout"
    },
    {
      id: "black-strip-1",
      name: "Black Classic",
      src: "/Blacktheme1.png", 
      description: "Elegant black theme"
    },
    {
      id: "black-strip-3",
      name: "Black Modern",
      src: "/Blacktheme3.png",
      description: "Modern black style"
    },
    {
      id: "adventure-strip",
      name: "Adventure Time",
      src: "/adventuretimetheme.png",
      description: "Adventure themed layout"
    }
  ],
  "4x6": [
    {
      id: "zootopia-card",
      name: "Zootopia",
      src: "/zootopiatheme.png",
      description: "Fun animal theme for postcard"
    },
    {
      id: "black-card-1", 
      name: "Black Classic",
      src: "/Blacktheme1.png",
      description: "Elegant black postcard"
    },
    {
      id: "black-card-3",
      name: "Black Modern", 
      src: "/Blacktheme3.png",
      description: "Modern black postcard"
    },
    {
      id: "adventure-card",
      name: "Adventure Time",
      src: "/adventuretimetheme.png", 
      description: "Adventure themed postcard"
    }
  ]
};

// Layout specifications (width × height in pixels at 300DPI)
export const layoutSpecs: Record<string, LayoutSpec> = {
  "2x6": {
    name: "2×6 inch Photo Strip",
    width: 600,
    height: 1800,
    slots: [
      { id: 1, x: 0, y: 0, width: 600, height: 600 },
      { id: 2, x: 0, y: 600, width: 600, height: 600 },
      { id: 3, x: 0, y: 1200, width: 600, height: 600 }
    ]
  },
  "4x6": {
    name: "4×6 inch Postcard", 
    width: 1200,
    height: 1800,
    slots: [
      { id: 1, x: 0, y: 0, width: 1200, height: 900 }, // Large top slot
      { id: 2, x: 0, y: 900, width: 400, height: 900 }, // Small bottom left
      { id: 3, x: 400, y: 900, width: 400, height: 900 }, // Small bottom center  
      { id: 4, x: 800, y: 900, width: 400, height: 900 } // Small bottom right
    ]
  }
};

// Sticker categories for organization
export const stickerCategories: Record<string, Sticker[]> = {
  animals: [
    { name: "Bird 1", src: "/bird1.png" },
    { name: "Bird 2", src: "/bird2.png" },
    { name: "Bird 3", src: "/bird3.png" }, 
    { name: "Bird 4", src: "/bird4.png" },
    { name: "Cat 1", src: "/cat1.png" },
    { name: "Cat 2", src: "/cat2.png" },
    { name: "Dog 1", src: "/dog1.png" },
    { name: "Dog 2", src: "/dog2.png" },
    { name: "Dog 3", src: "/dog3.png" },
    { name: "Dog 4", src: "/dog4.png" },
    { name: "Kucing 1", src: "/kucing1.png" },
    { name: "Kucing 2", src: "/kucing2.png" },
    { name: "Kucing 3", src: "/kucing3.png" },
    { name: "Kucing 4", src: "/kucing4.png" }
  ]
};

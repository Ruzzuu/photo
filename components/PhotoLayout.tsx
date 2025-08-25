import { useState } from "react";
import "./PhotoLayout.css";

type LayoutKey = "2x6" | "4x6" | "4x4" | "polaroid" | "2x2";

const layouts: Record<LayoutKey, { width: number; height: number; photos: number }> = {
  "2x6": { width: 200, height: 600, photos: 4 },   // photostrip
  "4x6": { width: 400, height: 600, photos: 2 },   // postcard
  "4x4": { width: 400, height: 400, photos: 1 },   // square
  "polaroid": { width: 260, height: 400, photos: 1 }, // polaroid
  "2x2": { width: 200, height: 200, photos: 1 }    // mini sticker
};

const PhotoLayout = () => {
  const [layout, setLayout] = useState<LayoutKey>("2x6");
  const [caption, setCaption] = useState("Happy Birthday");

  const { width, height, photos } = layouts[layout];

  return (
    <div className="layout-container">
      <div className="controls">
        <select value={layout} onChange={(e) => setLayout(e.target.value as LayoutKey)}>
          <option value="2x6">2x6 inch (strip)</option>
          <option value="4x6">4x6 inch (postcard)</option>
          <option value="4x4">4x4 inch (square)</option>
          <option value="polaroid">2.6x4 inch (polaroid)</option>
          <option value="2x2">2x2 inch (sticker)</option>
        </select>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter caption..."
        />
      </div>

      <div
        className="photo-layout"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {Array.from({ length: photos }).map((_, i) => (
          <div key={i} className="photo-box">
            <span className="photo-number">{i + 1}</span>
          </div>
        ))}
        <div className="caption-area">{caption}</div>
      </div>
    </div>
  );
};

export default PhotoLayout;

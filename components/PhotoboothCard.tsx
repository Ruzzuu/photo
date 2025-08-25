import React, { useState, useRef } from "react";
import "./PhotoboothCard.css";

interface Sticker {
  id: number;
  src: string;
  x: number;
  y: number;
}

interface PhotoboothCardProps {
  enableSticker?: boolean;
}

const PhotoboothCard: React.FC<PhotoboothCardProps> = ({ enableSticker = false }) => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [stickers, setStickers] = useState<Sticker[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);
  const dragStickerIndex = useRef<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleStickerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newSticker: Sticker = {
        id: Date.now(),
        src: URL.createObjectURL(file),
        x: 50,
        y: 50,
      };
      setStickers([...stickers, newSticker]);
    }
  };

  const handleMouseDown = (index: number) => {
    dragStickerIndex.current = index;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStickerIndex.current !== null && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const newStickers = [...stickers];
      newStickers[dragStickerIndex.current] = {
        ...newStickers[dragStickerIndex.current],
        x: e.clientX - rect.left - 30,
        y: e.clientY - rect.top - 30,
      };
      setStickers(newStickers);
    }
  };

  const handleMouseUp = () => {
    dragStickerIndex.current = null;
  };

  const removesticker = (index: number) => {
    const newStickers = stickers.filter((_, i) => i !== index);
    setStickers(newStickers);
  };

  return (
    <div className="photobooth-container">
      <div className="controls">
        <div className="control-group">
          <label htmlFor="photo-upload" className="upload-label">
            📷 Upload Photo
          </label>
          <input 
            id="photo-upload"
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>
        
        <input
          type="text"
          placeholder="Tulis caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />
        
        {enableSticker && (
          <div className="control-group">
            <label htmlFor="sticker-upload" className="upload-label sticker-label">
              🏷️ Add Sticker
            </label>
            <input 
              id="sticker-upload"
              type="file" 
              accept="image/*" 
              onChange={handleStickerUpload}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>

      <div
        className="photobooth-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="photo-area">
          {image ? (
            <img src={image} alt="Uploaded" className="main-photo" />
          ) : (
            <div className="upload-placeholder">
              <span>📷</span>
              <p>Upload Foto</p>
            </div>
          )}

          {stickers.map((sticker, index) => (
            <div
              key={sticker.id}
              className="sticker-wrapper"
              style={{ left: sticker.x, top: sticker.y }}
            >
              <img
                src={sticker.src}
                alt="sticker"
                className="sticker"
                onMouseDown={() => handleMouseDown(index)}
                draggable={false}
              />
              <button
                className="remove-sticker"
                onClick={() => removesticker(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="caption">
          <p>{caption || "Tulis kalimat singkat di sini..."}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoboothCard;

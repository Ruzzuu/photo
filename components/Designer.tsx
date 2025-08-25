import React, { useState } from "react";
import "./Designer.css";
import PhotoLayout from "./PhotoLayout";
import PhotoboothCard from "./PhotoboothCard";
import { ArrowLeft } from 'lucide-react';

interface DesignerProps {
  onBackToLanding: () => void;
}

const Designer: React.FC<DesignerProps> = ({ onBackToLanding }) => {
  const [selected, setSelected] = useState("layout");

  return (
    <div className="designer-container">
      {/* Back Button */}
      <button 
        onClick={onBackToLanding}
        className="back-button"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <h2 className="title">Customize your design</h2>

      {/* Preview Area */}
      <div className="preview">
        {selected === "layout" && <PhotoLayout />}
        {selected === "text" && <PhotoboothCard />}
        {selected === "theme" && (
          <div className="photo-placeholder">Theme options here</div>
        )}
        {selected === "sticker" && (
          <PhotoboothCard enableSticker={true} />
        )}
      </div>

      {/* Menu Options */}
      <div className="menu">
        <div
          className={`menu-item ${selected === "layout" ? "active" : ""}`}
          onClick={() => setSelected("layout")}
        >
          <div className="circle" />
          <span>Layout</span>
        </div>
        <div
          className={`menu-item ${selected === "text" ? "active" : ""}`}
          onClick={() => setSelected("text")}
        >
          <div className="circle" />
          <span>Text</span>
        </div>
        <div
          className={`menu-item ${selected === "theme" ? "active" : ""}`}
          onClick={() => setSelected("theme")}
        >
          <div className="circle" />
          <span>Theme</span>
        </div>
        <div
          className={`menu-item ${selected === "sticker" ? "active" : ""}`}
          onClick={() => setSelected("sticker")}
        >
          <div className="circle" />
          <span>Sticker</span>
        </div>
      </div>
    </div>
  );
};

export default Designer;

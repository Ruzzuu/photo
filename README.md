# Birthday Photobooth Application

A modern, interactive birthday photobooth application built with React, TypeScript, and Vite. Create memorable moments with real-time camera capture, fun filters, and festive overlays.

## 🎉 Features

- **Real-time Camera**: Capture photos instantly using your device's camera
- **Birthday Filters**: Apply fun filters and effects to your photos
- **Festive Overlays**: Add birthday-themed overlays and decorations
- **Photo Gallery**: View, manage, and download your captured memories
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, attractive interface with smooth animations

## 🚀 How to Run the Application

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- A modern web browser with camera access

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - Allow camera permissions when prompted

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Application Workflow

### 1. Landing Screen
- **Welcome Interface**: Beautiful animated landing page with birthday theme
- **Start Session**: Big purple gradient button to begin photo session
- **View Gallery**: Access previously captured photos (if any exist)
- **Photo Counter**: Shows number of photos captured in current session

### 2. Camera Interface
- **Live Camera Feed**: Real-time video preview with your camera
- **Capture Button**: Large, prominent button to take photos
- **Filter Options**: Choose from various birthday-themed filters:
  - Sepia tone for vintage look
  - Black & white for classic photos
  - Brightness adjustment
  - Contrast enhancement
- **Overlay Selection**: Add festive elements:
  - Birthday hats and crowns
  - Confetti and balloons
  - Party frames and borders
  - Text overlays with birthday messages
- **Back Button**: Return to landing screen

### 3. Photo Preview
- **Review Photo**: See your captured photo with applied filters/overlays
- **Retake Option**: Go back to camera if not satisfied
- **Save Photo**: Add photo to gallery and continue
- **Full Screen View**: Large preview to check photo quality

### 4. Photo Gallery
- **Grid Layout**: All captured photos in an organized grid
- **Photo Management**: 
  - View individual photos
  - Delete unwanted photos
  - Download photos to device
- **Navigation**: Return to camera or landing screen
- **Responsive Grid**: Adapts to screen size for optimal viewing

## 🎨 Design Features

### Modern Birthday Theme
- **Color Palette**: Purple, pink, orange gradient scheme
- **Typography**: Poppins font for modern, friendly appearance
- **Animations**: Floating elements, smooth transitions
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Responsive**: Mobile-first design approach

### User Experience
- **Intuitive Navigation**: Clear flow between screens
- **Visual Feedback**: Hover effects and animations
- **Accessibility**: High contrast, readable text
- **Performance**: Optimized for fast loading and smooth operation

## 🔧 Technical Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom utilities
- **Icons**: Lucide React for consistent iconography
- **Camera API**: WebRTC getUserMedia for camera access
- **Canvas API**: For photo processing and filter application

## 📁 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── LandingScreen.tsx     # Welcome/home screen
│   │   ├── CameraInterface.tsx   # Camera and capture
│   │   ├── PhotoPreview.tsx      # Preview captured photo
│   │   ├── PhotoGallery.tsx      # Gallery of all photos
│   │   ├── FilterSelector.tsx    # Filter selection component
│   │   └── OverlaySelector.tsx   # Overlay selection component
│   ├── styles/
│   │   └── globals.css           # Global styles and variables
│   ├── App.tsx                   # Main application component
│   └── main.tsx                  # Application entry point
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🎯 Usage Tips

1. **Camera Permissions**: Ensure you allow camera access for the application to work
2. **Good Lighting**: Take photos in well-lit areas for best results
3. **Stable Position**: Hold device steady when capturing photos
4. **Filter Preview**: Try different filters to see which works best
5. **Multiple Angles**: Capture photos from different angles for variety

## 🌟 Key Differences from Figma Template

This redesigned version features:
- **Custom Design System**: No generic Figma components
- **Unique Color Scheme**: Birthday-specific purple/pink/orange gradient
- **Original Animations**: Custom floating elements and transitions
- **Enhanced User Flow**: Improved navigation and user experience
- **Modern Aesthetics**: Glass morphism and contemporary design patterns
- **Better Responsiveness**: Mobile-first approach with adaptive layouts

## 🎂 Perfect for Birthday Celebrations

This photobooth application is designed specifically for birthday parties and celebrations:
- Easy setup for party hosts
- Fun, engaging interface for guests
- Instant photo capture and sharing
- Memorable keepsakes for birthday person
- Works great for all ages

Enjoy creating magical birthday memories! 🎉📸

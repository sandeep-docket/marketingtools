# Marketing Tools - Docket

A comprehensive suite of marketing asset generators for creating professional blog banners, product mockups, and meta images.

## 🚀 Features

### 1. Blog Banner Generator
Create beautiful blog banners with custom text and gradient backgrounds.
- Custom product titles and blog titles
- Adjustable background rotation and position
- Real-time preview
- Export as high-quality PNG (1660 × 962 pixels)

### 2. Product Photo Mockup
Create stunning product mockups with beautiful backgrounds.
- Multiple template options:
  - Zoomed Screen
  - Full Screen
  - Feature Snapshot (3 layout variations)
- Dark and light theme options
- Drag & drop image upload
- Image scaling and positioning controls
- Export as high-quality PNG

### 3. Meta Image Generator
Generate optimized meta images for social media and SEO.
- Custom title and subtext
- Character count limits (Title: 100, Subtext: 300)
- Real-time preview
- Export as high-quality PNG (1200 × 630 pixels)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Firebase** - Authentication (Google OAuth)
- **React Router** - Navigation
- **html2canvas** - Image export
- **OGL** - WebGL for light ray effects

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google account with @docketai.com email (for authentication)

## 🔧 Installation

1. Clone the repository:
```bash
git clone git@github.com:sandeep-docket/marketingtools.git
cd marketingtools
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Note: The app includes fallback Firebase configuration if environment variables are not set.

## 🚦 Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. Sign in with your @docketai.com Google account

4. Start creating marketing assets!

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

This application is restricted to @docketai.com email accounts only. Users must sign in with Google OAuth to access the tools.

## 📁 Project Structure

```
├── public/              # Static assets
│   ├── product-mockup-bgs/  # Product mockup backgrounds
│   └── ...
├── src/
│   ├── components/     # React components
│   │   ├── App.tsx
│   │   ├── BannerGenerator.tsx
│   │   ├── ProductPhotoMockup.tsx
│   │   ├── MetaImageGenerator.tsx
│   │   ├── LightRays.tsx
│   │   ├── BlurText.tsx
│   │   └── ErrorBoundary.tsx
│   ├── AuthContext.tsx  # Authentication context
│   ├── firebase.ts      # Firebase configuration
│   └── main.tsx         # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## 🎨 Features in Detail

### Blog Banner Generator
- Customizable product title, blog title, and description
- Gradient background with rotation and position controls
- Randomize button for quick variations
- Live preview with real-time updates

### Product Photo Mockup
- Multiple template layouts for different use cases
- Image upload via drag & drop or file picker
- Paste images directly from clipboard (Cmd+V)
- Zoom and pan controls for precise image positioning
- Theme switching (dark/light backgrounds)

### Meta Image Generator
- Optimized dimensions for social media (1200×630)
- Character count validation
- Real-time preview
- One-click download

## 🚢 Deployment

The project is configured for deployment on Vercel. The `vercel.json` configuration file is included in the repository.

## 📝 License

Private - Docket Internal Use Only

## 👥 Contributing

This is an internal Docket project. For questions or issues, please contact the development team.

## 🔄 Version

Current version: v1

---

Built with ❤️ by the Docket team


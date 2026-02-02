import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './AuthContext'
import BannerGenerator from './BannerGenerator'
import ProductPhotoMockup from './ProductPhotoMockup'
import MetaImageGenerator from './MetaImageGenerator'
import IconFinder from './IconFinder'
import LightRays from './LightRays'
import BlurText from './BlurText'
import './App.css'

// Docket Logo Component
const DocketLogo = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const dimensions = {
    small: { width: 120, height: 37 },
    medium: { width: 180, height: 55 },
    large: { width: 240, height: 73 }
  }
  const { width, height } = dimensions[size]
  
  return (
    <svg width={width} height={height} viewBox="0 0 292 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_landing)">
        <path fillRule="evenodd" clipRule="evenodd" d="M69.3513 43.9812C72.6419 40.7612 74.5954 36.6956 74.2248 31.4697C72.8051 11.0086 46.1691 -2.83242 40.1071 1.90518C34.6002 6.1936 41.7019 20.4617 45.4627 28.0174C45.8558 28.8072 46.2124 29.5237 46.5143 30.1477C47.981 33.1896 51.1135 40.6523 52.09 48.535C43.9571 50.8899 34.6907 52.1079 27.5088 53.0518C26.5268 53.1809 25.5837 53.3049 24.6878 53.4259C3.76716 56.2275 -2.99077 63.8517 2.64275 71.84C8.29169 79.8368 28.2498 89.5087 45.5736 87.9258C59.4181 86.6623 66.7501 79.1479 68.6845 75.5551C74.2771 65.9084 72.7869 54.3666 69.3513 43.9812ZM18.21 69.5113C12.3125 65.0211 17.9696 58.9294 29.7628 56.9154C30.8898 56.7232 32.2204 56.5225 33.7042 56.2986C38.8029 55.5293 45.7105 54.487 52.3791 52.5818C52.5619 62.6027 48.2712 72.2398 31.8368 73.4979C29.271 73.6716 22.9278 73.103 18.21 69.5113ZM69.7854 26.5539C72.0079 32.2508 70.9805 36.662 67.9644 40.1055C66.5707 36.4521 65.0074 33.0062 63.5234 29.9162C61.5031 24.541 61.812 14.5851 68.1474 23.3706C68.8824 24.566 69.4346 25.6871 69.7854 26.5539Z" fill="white"/>
        <path d="M110.564 70.0135C107.508 70.0135 104.758 69.2611 102.313 67.7568C99.8682 66.2052 97.9404 63.9953 96.5297 61.1272C95.1191 58.2592 94.4141 54.897 94.4141 51.0418C94.4141 47.1864 95.1191 43.8246 96.5297 40.9566C97.9404 38.0885 99.8682 35.8786 102.313 34.3271C104.758 32.7755 107.508 31.9997 110.564 31.9997C113.198 31.9997 115.408 32.5169 117.194 33.5513C119.028 34.5387 120.509 35.8316 121.637 37.4302H121.778V18.5997H128.69V69.0259H121.778V64.7945H121.637C120.462 66.2988 118.957 67.5448 117.123 68.5324C115.337 69.5199 113.15 70.0135 110.564 70.0135ZM101.608 51.0418C101.608 54.8034 102.477 57.9535 104.217 60.4922C105.957 63.0314 108.449 64.301 111.693 64.301C114.796 64.301 117.241 63.1256 119.028 60.7747C120.814 58.3765 121.708 55.1322 121.708 51.0418C121.708 46.9513 120.814 43.7306 119.028 41.3797C117.241 38.9818 114.796 37.7828 111.693 37.7828C108.449 37.7828 105.957 39.0523 104.217 41.5913C102.477 44.1302 101.608 47.2804 101.608 51.0418Z" fill="white"/>
        <path d="M149.169 70.0844C145.501 70.0844 142.304 69.2851 139.577 67.6867C136.85 66.0877 134.758 63.8547 133.3 60.9866C131.89 58.1185 131.185 54.8038 131.185 51.0422C131.185 47.2808 131.913 43.9661 133.371 41.098C134.828 38.2299 136.897 35.9966 139.577 34.398C142.304 32.7524 145.525 31.9295 149.239 31.9295C152.907 31.9295 156.08 32.7289 158.761 34.3274C161.488 35.9261 163.556 38.1829 164.967 41.098C166.424 43.9661 167.153 47.2573 167.153 50.9717C167.153 54.7333 166.424 58.0712 164.967 60.9866C163.509 63.8547 161.417 66.0877 158.69 67.6867C156.01 69.2851 152.836 70.0844 149.169 70.0844ZM138.378 51.0422C138.378 54.9916 139.295 58.2122 141.129 60.7041C142.963 63.1491 145.666 64.3719 149.239 64.3719C152.766 64.3719 155.422 63.1491 157.209 60.7041C159.043 58.2122 159.96 54.9916 159.96 51.0422C159.96 47.0928 159.043 43.8955 157.209 41.4506C155.422 38.9587 152.766 37.7127 149.239 37.7127C145.666 37.7127 142.963 38.9352 141.129 41.3801C139.295 43.825 138.378 47.0457 138.378 51.0422Z" fill="white"/>
        <path d="M186.716 70.0844C183.19 70.0844 180.087 69.2852 177.407 67.6867C174.727 66.0877 172.658 63.8547 171.2 60.9866C169.743 58.0712 169.014 54.7565 169.014 51.0423C169.014 47.3279 169.743 44.0366 171.2 41.1685C172.658 38.2535 174.703 35.9966 177.336 34.398C180.016 32.7994 183.119 32.0001 186.646 32.0001C189.655 32.0001 192.335 32.6114 194.686 33.8338C197.037 35.0093 198.917 36.6784 200.328 38.8412C201.739 40.957 202.585 43.3784 202.867 46.1054H195.744C195.508 43.8486 194.686 41.8973 193.275 40.2517C191.865 38.5591 189.679 37.7128 186.716 37.7128C183.143 37.7128 180.487 39.0057 178.747 41.5917C177.054 44.1306 176.208 47.2808 176.208 51.0423C176.208 54.8038 177.054 57.9539 178.747 60.4926C180.487 63.0318 183.143 64.3014 186.716 64.3014C189.725 64.3014 191.935 63.4785 193.346 61.8327C194.756 60.1874 195.556 58.1417 195.744 55.6972H202.867C202.726 58.4238 201.95 60.8925 200.539 63.1023C199.129 65.2648 197.225 66.9811 194.827 68.2508C192.429 69.473 189.725 70.0844 186.716 70.0844Z" fill="white"/>
        <path d="M206.27 18.5977H213.182V48.2893L228.91 33.0556H236.879L223.056 46.244L238.36 69.0238H230.179L218.401 50.6166L213.182 55.6242V69.0238H206.27V18.5977Z" fill="white"/>
        <path d="M253.221 70.0844C249.507 70.0844 246.31 69.2615 243.63 67.6157C240.95 65.9704 238.905 63.7137 237.494 60.8456C236.131 57.9775 235.449 54.6859 235.449 50.9717C235.449 47.2103 236.154 43.8955 237.564 41.0275C239.022 38.1594 241.091 35.9261 243.771 34.3274C246.451 32.7289 249.601 31.9295 253.221 31.9295C258.629 31.9295 262.813 33.5752 265.775 36.8664C268.784 40.1577 270.289 44.6243 270.289 50.2664C270.289 51.63 270.265 52.4997 270.218 52.8759H242.572C242.666 56.1202 243.63 58.8704 245.464 61.1276C247.344 63.3375 249.977 64.4424 253.362 64.4424C256.183 64.4424 258.346 63.7605 259.851 62.3967C261.402 61.0334 262.39 59.5523 262.813 57.9539H269.866C268.831 61.6212 266.927 64.5597 264.153 66.7696C261.379 68.9794 257.735 70.0844 253.221 70.0844ZM263.095 47.4454C263.095 44.5773 262.155 42.2264 260.274 40.3927C258.44 38.512 256.019 37.5717 253.01 37.5717C250.095 37.5717 247.673 38.4885 245.746 40.3222C243.818 42.1089 242.76 44.4832 242.572 47.4454H263.095Z" fill="white"/>
        <path d="M285.31 69.4498C282.112 69.4498 279.715 68.6737 278.116 67.1221C276.565 65.5705 275.789 62.8203 275.789 58.8704V38.7706H270.57V33.058H275.789V21.4917H282.7V33.058H289.612V38.7706H282.7V59.0825C282.7 60.9161 282.982 62.162 283.547 62.8203C284.158 63.4311 285.216 63.7368 286.72 63.7368C287.613 63.7368 288.601 63.6432 289.682 63.4548V69.0263C288.272 69.3083 286.814 69.4498 285.31 69.4498Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_landing">
          <rect width="290.584" height="87.1249" fill="white" transform="translate(0.742188 0.972656)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

// Google Icon
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Login Page Component
function LoginPage() {
  const { signInWithGoogle, loading, error } = useAuth()

  return (
    <div className="login-page">
      <div className="login-card">
        <DocketLogo size="medium" />
        <h1>Marketing Tools</h1>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}
        
        <button 
          className="btn-google-signin"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          <GoogleIcon />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        
        <p className="login-hint">Only @docketai.com accounts can access this tool</p>
      </div>
    </div>
  )
}

// Protected Route Component
// TEMPORARY: Enable for testing new AI Search feature
// SECURITY: Set to false for production - only enable for local testing
const BYPASS_AUTH_FOR_TESTING = false

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  // Bypass auth for testing
  if (BYPASS_AUTH_FOR_TESTING) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Get time-based greeting
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return 'Good morning'
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon'
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening'
  } else {
    return 'Good night'
  }
}

// Landing Page Component
function LandingPage() {
  const { user, logout } = useAuth()

  // Pop culture names as fallback
  const popCultureNames = [
    'R2D2', 'C3PO', 'Yoda', 'Luke', 'Leia', 'Han', 'Chewie', 
    'Gandalf', 'Frodo', 'Aragorn', 'Hermione', 'Harry', 'Ron',
    'Neo', 'Trinity', 'Morpheus', 'Batman', 'Superman', 'Wonder Woman',
    'Tony Stark', 'Steve Rogers', 'Natasha', 'Thor', 'Hulk'
  ]

  // Get user name or fallback to random pop culture name
  const getUserName = () => {
    if (user?.displayName) {
      // Extract first name from display name
      const firstName = user.displayName.split(' ')[0]
      return firstName
    }
    // Use a consistent random name based on email or random
    const randomIndex = user?.email 
      ? user.email.charCodeAt(0) % popCultureNames.length
      : Math.floor(Math.random() * popCultureNames.length)
    return popCultureNames[randomIndex]
  }

  const userName = getUserName()
  const greeting = getTimeBasedGreeting()

  return (
    <div className="landing-page">
      {/* Light Rays Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Top Bar - Logo on left, Logout on right */}
        <div className="landing-top-bar">
          <div className="landing-header">
            <DocketLogo size="small" />
            <h1>Marketing Tools</h1>
          </div>
          <button className="btn-logout" onClick={logout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>

        {/* Welcome Message */}
        <div className="welcome-message">
          <h2 className="welcome-text">
            <BlurText text={`${greeting} ${userName}, let's get started.`} delay={200} />
          </h2>
        </div>
        
        <p className="landing-subtitle">
          <BlurText text="Create stunning marketing assets for your campaigns" delay={400} />
        </p>
        
        <div className="tools-grid tools-grid-animated">
          {/* Blog Banner Generator - Active */}
          <Link to="/blog-banner" className="tool-card">
            <div className="tool-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
                <path d="M6 8h4"/>
                <path d="M6 11h8"/>
              </svg>
            </div>
            <h3>Blog Banner Generator</h3>
            <p>Create beautiful blog banners with custom text and backgrounds</p>
            <span className="tool-status active">Available</span>
          </Link>
          
          {/* Product Photo Mockup - Active */}
          <Link to="/product-mockup" className="tool-card">
            <div className="tool-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
            </div>
            <h3>Product Photo Mockup</h3>
            <p>Create stunning product mockups with beautiful backgrounds</p>
            <span className="tool-status active">Available</span>
          </Link>
          
          {/* Meta Image Generator - Active */}
          <Link to="/meta-image" className="tool-card">
            <div className="tool-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2"/>
                <path d="M8 2v4M16 2v4M3 10h18M4 4h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                <circle cx="12" cy="15" r="2"/>
              </svg>
            </div>
            <h3>Meta Image Generator</h3>
            <p>Generate optimized meta images for social media and SEO</p>
            <span className="tool-status active">Available</span>
          </Link>
          
          {/* Icon Finder - Active */}
          <Link to="/icon-finder" className="tool-card">
            <div className="tool-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <path d="M8 8h6M8 11h4M8 14h2"/>
              </svg>
            </div>
            <h3>Icon Finder</h3>
            <p>Search and download icons from Fluent and Huge Icons libraries</p>
            <span className="tool-status active">Available</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Component to ensure favicon is set
function FaviconSetter() {
  useEffect(() => {
    // Ensure favicon is set
    let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      favicon.type = 'image/png'
      document.head.appendChild(favicon)
    }
    favicon.href = '/favicon.png'
    
    // Also set shortcut icon
    let shortcutIcon = document.querySelector("link[rel='shortcut icon']") as HTMLLinkElement
    if (!shortcutIcon) {
      shortcutIcon = document.createElement('link')
      shortcutIcon.rel = 'shortcut icon'
      shortcutIcon.type = 'image/png'
      document.head.appendChild(shortcutIcon)
    }
    shortcutIcon.href = '/favicon.png'
  }, [])

  return null
}

// Component to set page title based on route
function PageTitle() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    if (path === '/') {
      document.title = 'Marketing Tools - Docket'
    } else if (path === '/blog-banner') {
      document.title = 'Blog Banner Generator - Docket Marketing Tools'
    } else if (path === '/product-mockup') {
      document.title = 'Product Photo Mockup - Docket Marketing Tools'
    } else if (path === '/meta-image') {
      document.title = 'Meta Image Generator - Docket Marketing Tools'
    } else if (path === '/icon-finder') {
      document.title = 'Icon Finder - Docket Marketing Tools'
    } else if (path === '/login') {
      document.title = 'Sign In - Docket Marketing Tools'
    } else {
      document.title = 'Marketing Tools - Docket'
    }
  }, [location])

  return null
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <FaviconSetter />
      <PageTitle />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <LandingPage />
          </ProtectedRoute>
        } />
        <Route path="/blog-banner" element={
          <ProtectedRoute>
            <BannerGenerator />
          </ProtectedRoute>
        } />
        <Route path="/product-mockup" element={
          <ProtectedRoute>
            <ProductPhotoMockup />
          </ProtectedRoute>
        } />
        <Route path="/meta-image" element={
          <ProtectedRoute>
            <MetaImageGenerator />
          </ProtectedRoute>
        } />
        <Route path="/icon-finder" element={
          <ProtectedRoute>
            <IconFinder />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
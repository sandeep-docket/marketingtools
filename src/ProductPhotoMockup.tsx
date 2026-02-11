import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import './ProductPhotoMockup.css'

// Background images
const darkBackgrounds = [
  '/product-mockup-bgs/dark/Product mockup.jpg',
  '/product-mockup-bgs/dark/Product mockup-1.jpg',
  '/product-mockup-bgs/dark/Product mockup-2.jpg',
  '/product-mockup-bgs/dark/Product mockup-3.jpg',
]

const lightBackgrounds = [
  '/product-mockup-bgs/light/Product mockup.jpg',
  '/product-mockup-bgs/light/Product mockup-1.jpg',
  '/product-mockup-bgs/light/Product mockup-2.jpg',
  '/product-mockup-bgs/light/Product mockup-3.jpg',
]

// Template configurations
const templates = [
  {
    id: 1,
    name: 'Zoomed Screen',
    type: 'zoomed-screen'
  },
  {
    id: 2,
    name: 'Full Screen',
    type: 'full-screen'
  },
  {
    id: 3,
    name: 'Feature Snapshot',
    type: 'feature-snapshot'
  }
]

// Feature Snapshot sub-options
const featureSnapshotOptions = [
  {
    id: 1,
    name: 'Snapshot 1',
    type: 'feature-snapshot-1'
  },
  {
    id: 2,
    name: 'Snapshot 2',
    type: 'feature-snapshot-2'
  },
  {
    id: 3,
    name: 'Snapshot 3',
    type: 'feature-snapshot-3'
  }
]

interface ImageState {
  src: string
  x: number
  y: number
  scale: number
  naturalWidth: number
  naturalHeight: number
}

function ProductPhotoMockup() {
  // Get random background on initial load
  const getRandomBackground = useCallback((mode: 'dark' | 'light') => {
    const backgrounds = mode === 'dark' ? darkBackgrounds : lightBackgrounds
    return backgrounds[Math.floor(Math.random() * backgrounds.length)]
  }, [])

  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [currentBackground, setCurrentBackground] = useState(() => getRandomBackground('light'))
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]) // Default to zoomed screen
  const [selectedFeatureSnapshot, setSelectedFeatureSnapshot] = useState(featureSnapshotOptions[0])
  const [uploadedImage, setUploadedImage] = useState<ImageState | null>(null)
  const [uploadedImages, setUploadedImages] = useState<ImageState[]>([]) // For multi-image layouts (snapshots 2 & 3)
  const [isDragging, setIsDragging] = useState(false)
  const [isImageDragging, setIsImageDragging] = useState(false)
  const [draggingImageIndex, setDraggingImageIndex] = useState<number | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isDownloading, setIsDownloading] = useState(false)
  
  const mockupRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageAreaRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  
  // Mockup canvas dimensions based on template
  const getMockupDimensions = useCallback(() => {
    if (selectedTemplate.type === 'full-screen') {
      return { width: 1440, height: 906 }
    } else if (selectedTemplate.type === 'feature-snapshot') {
      if (selectedFeatureSnapshot.type === 'feature-snapshot-1') {
        return { width: 1440, height: 424 }
      } else if (selectedFeatureSnapshot.type === 'feature-snapshot-2') {
        return { width: 1440, height: 617 }
      } else {
        return { width: 1440, height: 826 }
      }
    } else {
      // zoomed-screen (default)
      return { width: 1440, height: 1024 }
    }
  }, [selectedTemplate, selectedFeatureSnapshot])

  // Image placement area dimensions based on template
  const getImageAreaDimensions = useCallback(() => {
    if (selectedTemplate.type === 'full-screen') {
      return { width: 1343, height: 810 }
    } else if (selectedTemplate.type === 'feature-snapshot') {
      if (selectedFeatureSnapshot.type === 'feature-snapshot-1') {
        return { width: 1343, height: 264 }
      } else if (selectedFeatureSnapshot.type === 'feature-snapshot-2') {
        return { width: 651, height: 457 }
      } else {
        return { width: 659, height: 666 } // For left image in snapshot 3
      }
    } else {
      // zoomed-screen (default)
      return { width: 1311, height: 895 }
    }
  }, [selectedTemplate, selectedFeatureSnapshot])
  
  const { width: IMAGE_AREA_WIDTH, height: IMAGE_AREA_HEIGHT } = getImageAreaDimensions()
  const { width: MOCKUP_WIDTH, height: MOCKUP_HEIGHT } = getMockupDimensions()

  // Randomize background
  const handleRandomize = useCallback(() => {
    const newBackground = getRandomBackground(theme)
    setCurrentBackground(newBackground)
  }, [theme, getRandomBackground])

  // Update background when theme changes
  useEffect(() => {
    setCurrentBackground(getRandomBackground(theme))
  }, [theme, getRandomBackground])

  // Handle file upload
  const handleFileUpload = useCallback((file: File, imageIndex?: number) => {
    if (!file.type.startsWith('image/')) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        // For feature snapshots, images fill the area completely
        if (selectedTemplate.type === 'feature-snapshot') {
          const imageData: ImageState = {
            src: e.target?.result as string,
            x: 0,
            y: 0,
            scale: 1,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
          }
          
          if (imageIndex !== undefined) {
            // Update specific image in array
            setUploadedImages(prev => {
              const newImages = [...prev]
              // Ensure array is large enough
              while (newImages.length <= imageIndex) {
                newImages.push(null as any)
              }
              newImages[imageIndex] = imageData
              return newImages
            })
          } else {
            // Single image for snapshot 1
            setUploadedImage(imageData)
          }
        } else {
          // For zoomed/fullscreen, calculate scale and position
          const scaleX = IMAGE_AREA_WIDTH / img.naturalWidth
          const scaleY = IMAGE_AREA_HEIGHT / img.naturalHeight
          const fitScale = Math.min(scaleX, scaleY, 1) // Don't scale up if smaller
          
          setUploadedImage({
            src: e.target?.result as string,
            x: (IMAGE_AREA_WIDTH - img.naturalWidth * fitScale) / 2,
            y: (IMAGE_AREA_HEIGHT - img.naturalHeight * fitScale) / 2,
            scale: fitScale,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
          })
        }
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }, [IMAGE_AREA_WIDTH, IMAGE_AREA_HEIGHT, selectedTemplate])

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0], activeImageIndex ?? undefined)
      setActiveImageIndex(null)
    }
  }, [handleFileUpload, activeImageIndex])

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            handleFileUpload(file, activeImageIndex ?? undefined)
            setActiveImageIndex(null)
          }
          break
        }
      }
    }
    
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [handleFileUpload, activeImageIndex])

  // Handle image dragging within the container
  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (!uploadedImage || !imageAreaRef.current) return
    e.preventDefault()
    e.stopPropagation()
    
    const rect = imageAreaRef.current.getBoundingClientRect()
    const scaleRatio = IMAGE_AREA_WIDTH / rect.width
    
    // Calculate mouse position in image area coordinates
    const mouseX = (e.clientX - rect.left) * scaleRatio
    const mouseY = (e.clientY - rect.top) * scaleRatio
    
    // Calculate offset from mouse to image top-left corner
    const offsetX = mouseX - uploadedImage.x
    const offsetY = mouseY - uploadedImage.y
    
    setIsImageDragging(true)
    setDragStart({
      x: offsetX,
      y: offsetY
    })
  }, [uploadedImage])

  // Handle image dragging for feature snapshots
  const handleSnapshotImageMouseDown = useCallback((e: React.MouseEvent, imageIndex: number, containerElement: HTMLElement) => {
    if (!uploadedImages[imageIndex]) return
    e.preventDefault()
    e.stopPropagation()
    
    const rect = containerElement.getBoundingClientRect()
    const image = uploadedImages[imageIndex]
    
    // Calculate mouse position relative to container
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Calculate offset from mouse to current image center position
    // Images are centered with x, y as offset from center
    const containerWidth = rect.width - 16 // minus padding
    const containerHeight = rect.height - 16 // minus padding
    const currentImageCenterX = containerWidth / 2 + (image.x || 0)
    const currentImageCenterY = containerHeight / 2 + (image.y || 0)
    
    setIsImageDragging(true)
    setDraggingImageIndex(imageIndex)
    setDragStart({
      x: mouseX - currentImageCenterX,
      y: mouseY - currentImageCenterY
    })
  }, [uploadedImages])

  useEffect(() => {
    if (!isImageDragging) return
    
    const handleMouseMove = (e: MouseEvent) => {
      // Handle feature snapshot dragging
      if (draggingImageIndex !== null && selectedTemplate.type === 'feature-snapshot') {
        // Handle snapshot 1 (uses uploadedImage)
        if (draggingImageIndex === -1) {
          if (!uploadedImage) return
          const containers = document.querySelectorAll('.image-area.snapshot-area')
          const container = containers[0] as HTMLElement
          if (!container) return
          
          const rect = container.getBoundingClientRect()
          const mouseX = e.clientX - rect.left
          const mouseY = e.clientY - rect.top
          
          const newX = mouseX - dragStart.x
          const newY = mouseY - dragStart.y
          
          setUploadedImage(prev => prev ? {
            ...prev,
            x: newX,
            y: newY
          } : null)
          return
        }
        
        // Handle snapshots 2 & 3 (use uploadedImages array)
        const image = uploadedImages[draggingImageIndex]
        if (!image) return
        
        // Find the container element - use the same container reference from mouseDown
        // We need to get the container that was clicked, not query all
        const containers = document.querySelectorAll('.image-area.snapshot-area')
        const container = containers[draggingImageIndex] as HTMLElement
        if (!container) return
        
        const rect = container.getBoundingClientRect()
        
        // Calculate mouse position relative to container
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        // Calculate new image position (mouse position minus the offset we calculated on mouseDown)
        // dragStart already accounts for the current image position
        const containerWidth = rect.width - 16
        const containerHeight = rect.height - 16
        const newCenterX = mouseX - dragStart.x
        const newCenterY = mouseY - dragStart.y
        
        // Update image position (stored as offset from container center)
        setUploadedImages(prev => {
          const newImages = [...prev]
          if (newImages[draggingImageIndex]) {
            newImages[draggingImageIndex] = {
              ...newImages[draggingImageIndex],
              x: newCenterX - containerWidth / 2,
              y: newCenterY - containerHeight / 2
            }
          }
          return newImages
        })
        return
      }
      
      // Handle zoomed/fullscreen dragging
      if (!uploadedImage || !imageAreaRef.current) return
      
      const rect = imageAreaRef.current.getBoundingClientRect()
      const scaleRatio = IMAGE_AREA_WIDTH / rect.width
      
      // Calculate mouse position in image area coordinates
      const mouseX = (e.clientX - rect.left) * scaleRatio
      const mouseY = (e.clientY - rect.top) * scaleRatio
      
      // Calculate new image position (mouse position minus offset)
      const newX = mouseX - dragStart.x
      const newY = mouseY - dragStart.y
      
      // Constrain image within bounds
      const minX = -IMAGE_AREA_WIDTH + 50 // Allow some overflow
      const maxX = IMAGE_AREA_WIDTH - 50
      const minY = -IMAGE_AREA_HEIGHT + 50
      const maxY = IMAGE_AREA_HEIGHT - 50
      
      const constrainedX = Math.max(minX, Math.min(maxX, newX))
      const constrainedY = Math.max(minY, Math.min(maxY, newY))
      
      setUploadedImage(prev => prev ? { 
        ...prev, 
        x: constrainedX, 
        y: constrainedY 
      } : null)
    }
    
    const handleMouseUp = () => {
      setIsImageDragging(false)
      setDraggingImageIndex(null)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isImageDragging, dragStart, uploadedImage, draggingImageIndex, uploadedImages, selectedTemplate])

  // Handle scale with scroll/slider
  const handleScaleChange = useCallback((newScale: number) => {
    if (!uploadedImage) return
    
    const imageWidth = uploadedImage.naturalWidth * uploadedImage.scale
    const imageHeight = uploadedImage.naturalHeight * uploadedImage.scale
    const newWidth = uploadedImage.naturalWidth * newScale
    const newHeight = uploadedImage.naturalHeight * newScale
    
    // Keep center position stable during scaling
    const centerX = uploadedImage.x + imageWidth / 2
    const centerY = uploadedImage.y + imageHeight / 2
    
    setUploadedImage(prev => prev ? {
      ...prev,
      scale: newScale,
      x: centerX - newWidth / 2,
      y: centerY - newHeight / 2
    } : null)
  }, [uploadedImage])

  // Handle wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!uploadedImage) return
    e.preventDefault()
    
    const delta = e.deltaY > 0 ? -0.05 : 0.05
    const newScale = Math.max(0.1, Math.min(3, uploadedImage.scale + delta))
    handleScaleChange(newScale)
  }, [uploadedImage, handleScaleChange])

  // Remove image
  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null)
  }, [])

  // Remove image from array (for snapshots 2 & 3)
  const handleRemoveImageFromArray = useCallback((index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev]
      newImages[index] = undefined as any
      return newImages
    })
  }, [])

  // Handle scale change for array images
  const handleScaleChangeForArray = useCallback((index: number, newScale: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev]
      if (newImages[index]) {
        newImages[index] = {
          ...newImages[index],
          scale: newScale
        }
      }
      return newImages
    })
  }, [])

  // Reset all images
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all uploaded images? This action cannot be undone.')) {
      setUploadedImage(null)
      setUploadedImages([])
      setActiveImageIndex(null)
    }
  }, [])

  // Download mockup
  const handleDownload = useCallback(async () => {
    if (!mockupRef.current || isDownloading) return
    
    setIsDownloading(true)
    
    try {
      const originalTransform = mockupRef.current.style.transform
      mockupRef.current.style.transform = 'scale(1)'
      
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const canvas = await html2canvas(mockupRef.current, {
        width: MOCKUP_WIDTH,
        height: MOCKUP_HEIGHT,
        scale: 2,
        backgroundColor: '#111111',
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
      })
      
      mockupRef.current.style.transform = originalTransform
      
      const timestamp = new Date().toISOString().slice(0, 10)
      const link = document.createElement('a')
      link.download = `product-mockup-${selectedTemplate.name.toLowerCase()}-${timestamp}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Error generating mockup:', error)
      alert('There was an error generating the mockup. Please try again.')
    }
    
    setIsDownloading(false)
  }, [isDownloading, selectedTemplate, MOCKUP_WIDTH, MOCKUP_HEIGHT])

  return (
    <div className="mockup-container">
      {/* Controls Panel */}
      <div className="mockup-controls-panel">
        <div className="mockup-controls-header">
          <Link to="/" className="back-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <svg className="logo-icon" width="32" height="32" viewBox="-5 0 85 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M69.3513 43.9812C72.6419 40.7612 74.5954 36.6956 74.2248 31.4697C72.8051 11.0086 46.1691 -2.83242 40.1071 1.90518C34.6002 6.1936 41.7019 20.4617 45.4627 28.0174C45.8558 28.8072 46.2124 29.5237 46.5143 30.1477C47.981 33.1896 51.1135 40.6523 52.09 48.535C43.9571 50.8899 34.6907 52.1079 27.5088 53.0518C26.5268 53.1809 25.5837 53.3049 24.6878 53.4259C3.76716 56.2275 -2.99077 63.8517 2.64275 71.84C8.29169 79.8368 28.2498 89.5087 45.5736 87.9258C59.4181 86.6623 66.7501 79.1479 68.6845 75.5551C74.2771 65.9084 72.7869 54.3666 69.3513 43.9812ZM18.21 69.5113C12.3125 65.0211 17.9696 58.9294 29.7628 56.9154C30.8898 56.7232 32.2204 56.5225 33.7042 56.2986C38.8029 55.5293 45.7105 54.487 52.3791 52.5818C52.5619 62.6027 48.2712 72.2398 31.8368 73.4979C29.271 73.6716 22.9278 73.103 18.21 69.5113ZM69.7854 26.5539C72.0079 32.2508 70.9805 36.662 67.9644 40.1055C66.5707 36.4521 65.0074 33.0062 63.5234 29.9162C61.5031 24.541 61.812 14.5851 68.1474 23.3706C68.8824 24.566 69.4346 25.6871 69.7854 26.5539Z" fill="white"/>
          </svg>
          <h1>Product Photo Mockup</h1>
        </div>

        {/* Template Selection */}
        <div className="template-section">
          <label>Select Template</label>
          <div className="template-grid">
            {templates.map(template => (
              <button
                key={template.id}
                className={`template-button ${selectedTemplate.id === template.id ? 'active' : ''}`}
                onClick={() => setSelectedTemplate(template)}
              >
                <span>{template.name}</span>
              </button>
            ))}
          </div>
          
          {/* Feature Snapshot Sub-options */}
          {selectedTemplate.type === 'feature-snapshot' && (
            <div className="sub-options-section">
              <label>Select Layout</label>
              <div className="sub-options-grid">
                {featureSnapshotOptions.map(option => (
                  <button
                    key={option.id}
                    className={`sub-option-button ${selectedFeatureSnapshot.id === option.id ? 'active' : ''}`}
                    onClick={() => setSelectedFeatureSnapshot(option)}
                  >
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme and Randomize Controls */}
        <div className="theme-controls">
          <div className="theme-switcher">
            <label>Theme</label>
            <div className="theme-buttons">
              <button
                className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
              <button
                className={`theme-button ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
            </div>
          </div>
          <button 
            className="btn-randomize"
            onClick={handleRandomize}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
            </svg>
            Randomize
          </button>
        </div>

        {/* File input - Always available for all templates */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileUpload(e.target.files[0], activeImageIndex ?? undefined)
              setActiveImageIndex(null)
              e.target.value = '' // Reset input
            }
          }}
          style={{ display: 'none' }}
        />

        {/* Image Upload Area - Only show for zoomed screen and full screen */}
        {selectedTemplate.type !== 'feature-snapshot' && (
          <div className="upload-section">
            <label>Product Image</label>
            <div 
              className={`upload-zone ${isDragging ? 'dragging' : ''} ${uploadedImage ? 'has-image' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !uploadedImage && fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="upload-preview">
                  <img src={uploadedImage.src} alt="Uploaded" />
                  <button className="btn-remove" onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p>Drag & drop your image here</p>
                  <p className="upload-hint">or click to browse • Cmd+V to paste</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Image Controls */}
        {selectedTemplate.type === 'feature-snapshot' && 
         (selectedFeatureSnapshot.type === 'feature-snapshot-2' || selectedFeatureSnapshot.type === 'feature-snapshot-3') ? (
          /* Multiple image controls for snapshots 2 & 3 */
          <div className="multi-image-controls">
            {selectedFeatureSnapshot.type === 'feature-snapshot-2' ? (
              [0, 1].map((index) => (
                uploadedImages[index] && (
                  <div key={index} className="image-control-item">
                    <div className="image-control-header">
                      <label>Image {index + 1}</label>
                      <button
                        className="btn-remove-small"
                        onClick={() => handleRemoveImageFromArray(index)}
                        type="button"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.05"
                        value={uploadedImages[index].scale}
                        onChange={(e) => handleScaleChangeForArray(index, parseFloat(e.target.value))}
                      />
                      <span className="slider-value">{Math.round(uploadedImages[index].scale * 100)}%</span>
                    </div>
                  </div>
                )
              ))
            ) : (
              /* Snapshot 3: 3 images */
              [0, 1, 2].map((index) => (
                uploadedImages[index] && (
                  <div key={index} className="image-control-item">
                    <div className="image-control-header">
                      <label>Image {index + 1}</label>
                      <button
                        className="btn-remove-small"
                        onClick={() => handleRemoveImageFromArray(index)}
                        type="button"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.05"
                        value={uploadedImages[index].scale}
                        onChange={(e) => handleScaleChangeForArray(index, parseFloat(e.target.value))}
                      />
                      <span className="slider-value">{Math.round(uploadedImages[index].scale * 100)}%</span>
                    </div>
                  </div>
                )
              ))
            )}
          </div>
        ) : uploadedImage ? (
          <div className="image-controls">
            <label>Image Scale</label>
            <div className="slider-container">
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.05"
                value={uploadedImage.scale}
                onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
              />
              <span className="slider-value">{Math.round(uploadedImage.scale * 100)}%</span>
            </div>
            <p className="control-hint">Scroll on image to zoom • Drag to reposition</p>
          </div>
        ) : null}

        {/* Download Button */}
        <button 
          className={`btn-download ${isDownloading ? 'loading' : ''}`}
          onClick={handleDownload}
          disabled={isDownloading || (selectedTemplate.type === 'feature-snapshot' 
            ? (selectedFeatureSnapshot.type === 'feature-snapshot-1' 
                ? !uploadedImage 
                : uploadedImages.length === 0)
            : !uploadedImage)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {isDownloading ? 'Generating...' : 'Download Mockup (PNG)'}
        </button>
        
        <p className="hint">Mockup size: {MOCKUP_WIDTH} × {MOCKUP_HEIGHT} pixels</p>
      </div>

      {/* Preview Panel */}
      <div className="mockup-preview-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Live Preview</h2>
          <button 
            className="btn-reset"
            onClick={handleReset}
            type="button"
            disabled={selectedTemplate.type === 'feature-snapshot' 
              ? (selectedFeatureSnapshot.type === 'feature-snapshot-1' 
                  ? !uploadedImage 
                  : uploadedImages.length === 0)
              : !uploadedImage}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Reset
          </button>
        </div>
        <div className="mockup-preview-wrapper">
          <div 
            className="mockup-scale-container"
            style={{
              width: `${MOCKUP_WIDTH * 0.7}px`,
              height: `${MOCKUP_HEIGHT * 0.7}px`
            }}
          >
            <div 
              className="mockup" 
              ref={mockupRef}
              style={{
                width: `${MOCKUP_WIDTH}px`,
                height: `${MOCKUP_HEIGHT}px`
              }}
            >
              {/* Background Image */}
              <div className="mockup-background">
                <img 
                  src={currentBackground}
                  alt=""
                  className="mockup-bg-image"
                />
              </div>

              {/* Conditional rendering based on template */}
              {selectedTemplate.type === 'feature-snapshot' ? (
                /* Feature Snapshot Templates */
                <div 
                  className="feature-snapshot-container"
                  style={{
                    height: `${MOCKUP_HEIGHT}px`
                  }}
                >
                  {selectedFeatureSnapshot.type === 'feature-snapshot-1' ? (
                    /* Snapshot 1: Single image */
                    <div className="snapshot-1-layout">
                      <div 
                        className="image-area snapshot-area snapshot-1-area"
                        style={{ width: '1343px', height: '264px' }}
                      >
                        {uploadedImage ? (
                          <div className="snapshot-1-image-container">
                            <img
                              src={uploadedImage.src}
                              alt="Product"
                              className="product-image snapshot-1-image"
                              style={{
                                width: `${uploadedImage.naturalWidth}px`,
                                height: `${uploadedImage.naturalHeight}px`,
                                transform: `translate(${uploadedImage.x || 0}px, ${uploadedImage.y || 0}px) scale(${uploadedImage.scale || 1})`,
                                transformOrigin: 'top left',
                                cursor: isImageDragging && draggingImageIndex === null ? 'grabbing' : 'grab'
                              }}
                              onMouseDown={(e) => {
                                if (!uploadedImage) return
                                e.preventDefault()
                                e.stopPropagation()
                                const container = e.currentTarget.closest('.snapshot-area') as HTMLElement
                                if (!container) return
                                const rect = container.getBoundingClientRect()
                                const mouseX = e.clientX - rect.left
                                const mouseY = e.clientY - rect.top
                                setIsImageDragging(true)
                                setDraggingImageIndex(-1)
                                setDragStart({
                                  x: mouseX - (uploadedImage.x || 0),
                                  y: mouseY - (uploadedImage.y || 0)
                                })
                              }}
                              draggable={false}
                            />
                          </div>
                        ) : (
                            <div 
                              className="placeholder"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (!uploadedImage) {
                                  setActiveImageIndex(null)
                                  setTimeout(() => {
                                    fileInputRef.current?.click()
                                  }, 0)
                                }
                              }}
                              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                            >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <path d="M21 15l-5-5L5 21"/>
                            </svg>
                            <p>Click to upload image</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : selectedFeatureSnapshot.type === 'feature-snapshot-2' ? (
                    /* Snapshot 2: Two side-by-side images */
                    <div className="snapshot-2-layout">
                      {[0, 1].map((index) => (
                        <div 
                          key={index}
                          className="image-area snapshot-area"
                          style={{ width: '651px', height: '457px' }}
                        >
                          {uploadedImages[index] ? (
                              <img
                                src={uploadedImages[index].src}
                                alt="Product"
                                className="product-image snapshot-image snapshot-2-image"
                                style={{
                                  width: `${uploadedImages[index].naturalWidth}px`,
                                  height: `${uploadedImages[index].naturalHeight}px`,
                                  transform: `translate(calc(-50% + ${uploadedImages[index].x || 0}px), calc(-50% + ${uploadedImages[index].y || 0}px)) scale(${uploadedImages[index].scale || 1})`,
                                  transformOrigin: 'center center',
                                  cursor: isImageDragging && draggingImageIndex === index ? 'grabbing' : 'grab'
                                }}
                                onMouseDown={(e) => handleSnapshotImageMouseDown(e, index, e.currentTarget.closest('.snapshot-area') as HTMLElement)}
                                draggable={false}
                              />
                          ) : (
                            <div 
                              className="placeholder"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (!uploadedImages[index]) {
                                  setActiveImageIndex(index)
                                  setTimeout(() => {
                                    fileInputRef.current?.click()
                                  }, 0)
                                }
                              }}
                              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                            >
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <path d="M21 15l-5-5L5 21"/>
                              </svg>
                              <p>Click to upload</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Snapshot 3: One large left, two stacked right */
                    <div className="snapshot-3-layout">
                      <div className="snapshot-3-left">
                        <div 
                          className="image-area snapshot-area"
                          style={{ width: '659px', height: '666px' }}
                        >
                          {uploadedImages[0] ? (
                              <img
                                src={uploadedImages[0].src}
                                alt="Product"
                                className="product-image snapshot-image snapshot-3-image"
                                style={{
                                  width: `${uploadedImages[0].naturalWidth}px`,
                                  height: `${uploadedImages[0].naturalHeight}px`,
                                  transform: `translate(calc(-50% + ${uploadedImages[0].x || 0}px), calc(-50% + ${uploadedImages[0].y || 0}px)) scale(${uploadedImages[0].scale || 1})`,
                                  transformOrigin: 'center center',
                                  cursor: isImageDragging && draggingImageIndex === 0 ? 'grabbing' : 'grab'
                                }}
                                onMouseDown={(e) => handleSnapshotImageMouseDown(e, 0, e.currentTarget.closest('.snapshot-area') as HTMLElement)}
                                draggable={false}
                              />
                          ) : (
                            <div 
                              className="placeholder"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (!uploadedImages[0]) {
                                  setActiveImageIndex(0)
                                  fileInputRef.current?.click()
                                }
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <path d="M21 15l-5-5L5 21"/>
                              </svg>
                              <p>Click to upload</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="snapshot-3-right">
                        {[1, 2].map((index) => (
                          <div 
                            key={index}
                            className="image-area snapshot-area"
                            style={{ width: '659px', height: '321px' }}
                          >
                            {uploadedImages[index] ? (
                              <img
                                src={uploadedImages[index].src}
                                alt="Product"
                                className="product-image snapshot-image snapshot-3-image"
                                style={{
                                  width: `${uploadedImages[index].naturalWidth}px`,
                                  height: `${uploadedImages[index].naturalHeight}px`,
                                  transform: `translate(calc(-50% + ${uploadedImages[index].x || 0}px), calc(-50% + ${uploadedImages[index].y || 0}px)) scale(${uploadedImages[index].scale || 1})`,
                                  transformOrigin: 'center center',
                                  cursor: isImageDragging && draggingImageIndex === index ? 'grabbing' : 'grab'
                                }}
                                onMouseDown={(e) => handleSnapshotImageMouseDown(e, index, e.currentTarget.closest('.snapshot-area') as HTMLElement)}
                                draggable={false}
                              />
                            ) : (
                              <div 
                                className="placeholder"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  if (!uploadedImages[index]) {
                                    setActiveImageIndex(index)
                                    setTimeout(() => {
                                      fileInputRef.current?.click()
                                    }, 0)
                                  }
                                }}
                                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                              >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                                  <circle cx="8.5" cy="8.5" r="1.5"/>
                                  <path d="M21 15l-5-5L5 21"/>
                                </svg>
                                <p>Click to upload</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : selectedTemplate.type === 'full-screen' ? (
                /* Full Screen Template */
                <div className="fullscreen-container">
                  <div 
                    ref={imageAreaRef}
                    className="image-area fullscreen-area"
                    onWheel={handleWheel}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage.src}
                        alt="Product"
                        className="product-image"
                        style={{
                          transform: `translate(${uploadedImage.x}px, ${uploadedImage.y}px) scale(${uploadedImage.scale})`,
                          transformOrigin: 'top left',
                          cursor: isImageDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={handleImageMouseDown}
                        draggable={false}
                      />
                    ) : (
                      <div 
                        className="placeholder"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                        <p>Your product image will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Zoomed Screen Template (with device frame) */
                <div className="device-frame">
                  <div 
                    ref={imageAreaRef}
                    className="image-area"
                    onWheel={handleWheel}
                  >
                    {uploadedImage ? (
                      <img
                        src={uploadedImage.src}
                        alt="Product"
                        className="product-image"
                        style={{
                          transform: `translate(${uploadedImage.x}px, ${uploadedImage.y}px) scale(${uploadedImage.scale})`,
                          transformOrigin: 'top left',
                          cursor: isImageDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={handleImageMouseDown}
                        draggable={false}
                      />
                    ) : (
                      <div 
                        className="placeholder"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                        <p>Your product image will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPhotoMockup

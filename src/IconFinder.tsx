import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import * as FluentIcons from '@fluentui/react-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import * as HugeIconsPack from '@hugeicons/core-free-icons'
import { searchIcons, getRelatedIcons, getAllIconDisplayNames, findIconsByDisplayNames } from './iconRegistry'
import type { IconEntry, IconLibrary } from './iconRegistry'
import './IconFinder.css'

// Color options
type ColorOption = 'light' | 'dark' | 'gradient1' | 'gradient2' | 'gradient3'

interface ColorConfig {
  id: ColorOption
  name: string
  type: 'solid' | 'gradient'
  value?: string
  gradient?: { start: string; end: string }
  css?: string // CSS gradient string for background
}

const COLOR_OPTIONS: ColorConfig[] = [
  { id: 'light', name: 'Light', type: 'solid', value: '#FFFFFF' },
  { id: 'dark', name: 'Dark', type: 'solid', value: '#000000' },
  { id: 'gradient1', name: 'Gradient 1', type: 'gradient', gradient: { start: '#C4CBEF', end: '#FFA0A0' }, css: 'linear-gradient(135deg, #C4CBEF 0%, #FFA0A0 100%)' },
  { id: 'gradient2', name: 'Gradient 2', type: 'gradient', gradient: { start: '#5272FA', end: '#FF5D4D' }, css: 'linear-gradient(135deg, #5272FA 0%, #FF5D4D 100%)' },
  { id: 'gradient3', name: 'Gradient 3', type: 'gradient', gradient: { start: '#967FD0', end: '#D37791' }, css: 'linear-gradient(135deg, #967FD0 0%, #D37791 100%)' },
]

// Items per page for pagination
const ITEMS_PER_PAGE = 200

function IconFinder() {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [enabledLibraries, setEnabledLibraries] = useState<Record<IconLibrary, boolean>>({
    'hugeicons': true,
    'fluent-filled': true,
    'fluent-outline': true,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(null)
  const [selectedColor, setSelectedColor] = useState<ColorOption>('dark')
  const [exportSize, setExportSize] = useState(512)
  const [isExporting, setIsExporting] = useState(false)
  
  const previewRef = useRef<HTMLDivElement>(null)
  const iconExportRef = useRef<HTMLDivElement>(null)
  const iconMaskRef = useRef<HTMLDivElement>(null)
  const [iconMaskUrl, setIconMaskUrl] = useState<string | null>(null)
  
  // Related icons state
  const [relatedIcons, setRelatedIcons] = useState<IconEntry[]>([])
  
  // AI Search state
  const [showAISearch, setShowAISearch] = useState(false)
  const [aiPrompt, setAIPrompt] = useState('')
  const [isAISearching, setIsAISearching] = useState(false)
  const [aiResults, setAIResults] = useState<IconEntry[]>([])
  const [aiCategories, setAICategories] = useState<{ category: string; icons: IconEntry[] }[]>([])
  const [aiResultsPrompt, setAIResultsPrompt] = useState('')
  const [showAIResults, setShowAIResults] = useState(false)
  const [aiError, setAIError] = useState<string | null>(null)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setCurrentPage(1) // Reset to first page on search
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Get enabled libraries as array
  const activeLibraries = useMemo(() => {
    return (Object.entries(enabledLibraries) as [IconLibrary, boolean][])
      .filter(([, enabled]) => enabled)
      .map(([lib]) => lib)
  }, [enabledLibraries])

  // Filter icons based on search and enabled libraries
  const filteredIcons = useMemo(() => {
    return searchIcons(debouncedQuery, activeLibraries)
  }, [debouncedQuery, activeLibraries])

  // Filter AI results based on enabled libraries (for dynamic updates)
  const filteredAIResults = useMemo(() => {
    if (!aiResults.length) return []
    return aiResults.filter(icon => activeLibraries.includes(icon.library))
  }, [aiResults, activeLibraries])

  // Filter AI categories based on enabled libraries
  const filteredAICategories = useMemo(() => {
    if (!aiCategories.length) return []
    return aiCategories
      .map(cat => ({
        category: cat.category,
        icons: cat.icons.filter(icon => activeLibraries.includes(icon.library))
      }))
      .filter(cat => cat.icons.length > 0)
  }, [aiCategories, activeLibraries])

  // Paginated icons
  const paginatedIcons = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredIcons.slice(start, end)
  }, [filteredIcons, currentPage])

  // Total pages
  const totalPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE)

  // Toggle library
  const toggleLibrary = useCallback((library: IconLibrary) => {
    setEnabledLibraries(prev => ({
      ...prev,
      [library]: !prev[library],
    }))
    setCurrentPage(1)
  }, [])

  // Render icon component
  const renderIcon = useCallback((icon: IconEntry, size: number = 24, color?: string) => {
    try {
      if (icon.library === 'hugeicons') {
        // Get Huge Icons component
        const iconData = (HugeIconsPack as Record<string, unknown>)[icon.name]
        if (iconData) {
          return (
            <HugeiconsIcon 
              icon={iconData as never} 
              size={size} 
              color={color || 'currentColor'}
            />
          )
        }
      } else {
        // Fluent Icons
        const FluentIconsMap = FluentIcons as unknown as Record<string, React.ComponentType<{ fontSize?: number; style?: React.CSSProperties }>>
        const IconComponent = FluentIconsMap[icon.name]
        if (IconComponent) {
          return <IconComponent fontSize={size} style={{ color: color || 'currentColor' }} />
        }
      }
    } catch (e) {
      console.warn(`Failed to render icon: ${icon.name}`, e)
    }
    
    // Fallback placeholder
    return (
      <div 
        style={{ 
          width: size, 
          height: size, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: size * 0.4,
          color: 'rgba(255,255,255,0.3)'
        }}
      >
        ?
      </div>
    )
  }, [])

  // Get current color config
  const currentColorConfig = useMemo(() => {
    return COLOR_OPTIONS.find(c => c.id === selectedColor)
  }, [selectedColor])

  // Export as PNG by converting SVG to canvas
  const exportAsPNG = useCallback(async () => {
    if (!selectedIcon) return
    
    setIsExporting(true)
    
    try {
      const size = exportSize
      const colorConfig = COLOR_OPTIONS.find(c => c.id === selectedColor)
      
      // Get the SVG from the hidden mask source (solid color icon)
      const svgElement = iconMaskRef.current?.querySelector('svg')
      if (!svgElement) {
        throw new Error('Could not find SVG element')
      }
      
      // Clone the SVG
      const clone = svgElement.cloneNode(true) as SVGElement
      clone.setAttribute('width', String(size))
      clone.setAttribute('height', String(size))
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      
      // Apply color to all paths
      const fillColor = colorConfig?.type === 'solid' ? colorConfig.value : '#000000'
      clone.querySelectorAll('path, circle, rect, polygon, line, polyline').forEach(el => {
        el.setAttribute('fill', fillColor || '#000000')
        el.removeAttribute('stroke')
      })
      
      // Convert SVG to data URL
      const svgString = new XMLSerializer().serializeToString(clone)
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const svgUrl = URL.createObjectURL(svgBlob)
      
      // Load SVG as image
      const img = new Image()
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          URL.revokeObjectURL(svgUrl)
          throw new Error('Could not get canvas context')
        }
        
        // Draw the icon
        ctx.drawImage(img, 0, 0, size, size)
        URL.revokeObjectURL(svgUrl)
        
        // If gradient, apply gradient using compositing
        if (colorConfig?.type === 'gradient' && colorConfig.gradient) {
          // Create gradient (135 degrees = from top-left to bottom-right)
          const gradient = ctx.createLinearGradient(0, 0, size, size)
          gradient.addColorStop(0, colorConfig.gradient.start)
          gradient.addColorStop(1, colorConfig.gradient.end)
          
          // Apply gradient only where there are non-transparent pixels
          ctx.globalCompositeOperation = 'source-in'
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, size, size)
        }
        
        // Download
        const link = document.createElement('a')
        link.download = `${selectedIcon.displayName.toLowerCase().replace(/\s+/g, '-')}-${size}px.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        
        setIsExporting(false)
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(svgUrl)
        console.error('Failed to load SVG as image')
        alert('Failed to export PNG. Please try again.')
        setIsExporting(false)
      }
      
      img.src = svgUrl
    } catch (error) {
      console.error('Error exporting PNG:', error)
      alert('Failed to export PNG. Please try again.')
      setIsExporting(false)
    }
  }, [selectedIcon, exportSize, selectedColor])

  // Export as SVG
  const exportAsSVG = useCallback(() => {
    if (!selectedIcon) return
    
    setIsExporting(true)
    
    try {
      const colorConfig = COLOR_OPTIONS.find(c => c.id === selectedColor)
      const size = exportSize
      
      // For gradient, get SVG from the hidden mask source; for solid, from the visible preview
      const sourceElement = colorConfig?.type === 'gradient' 
        ? iconMaskRef.current 
        : iconExportRef.current
        
      const svgElement = sourceElement?.querySelector('svg')
      if (!svgElement) {
        alert('Could not find SVG element to export.')
        setIsExporting(false)
        return
      }
      
      const clone = svgElement.cloneNode(true) as SVGElement
      clone.setAttribute('width', String(size))
      clone.setAttribute('height', String(size))
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      
      // For gradients, add gradient definition
      if (colorConfig?.type === 'gradient') {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
        gradient.setAttribute('id', 'icon-gradient')
        gradient.setAttribute('x1', '0%')
        gradient.setAttribute('y1', '0%')
        gradient.setAttribute('x2', '100%')
        gradient.setAttribute('y2', '100%')
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
        stop1.setAttribute('offset', '0%')
        stop1.setAttribute('stop-color', colorConfig.gradient?.start || '#000')
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
        stop2.setAttribute('offset', '100%')
        stop2.setAttribute('stop-color', colorConfig.gradient?.end || '#000')
        
        gradient.appendChild(stop1)
        gradient.appendChild(stop2)
        defs.appendChild(gradient)
        clone.insertBefore(defs, clone.firstChild)
        
        // Apply gradient to paths
        clone.querySelectorAll('path, circle, rect, polygon, line, polyline').forEach(el => {
          el.setAttribute('fill', 'url(#icon-gradient)')
        })
      } else if (colorConfig?.type === 'solid') {
        // Update colors for solid
        clone.querySelectorAll('path, circle, rect, polygon, line, polyline').forEach(el => {
          el.setAttribute('fill', colorConfig.value || 'currentColor')
        })
      }
      
      const svgContent = new XMLSerializer().serializeToString(clone)
      
      // Download
      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `${selectedIcon.displayName.toLowerCase().replace(/\s+/g, '-')}.svg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting SVG:', error)
      alert('Failed to export SVG. Please try again.')
    }
    
    setIsExporting(false)
  }, [selectedIcon, selectedColor, exportSize])

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showAISearch) {
          setShowAISearch(false)
        } else if (selectedIcon) {
          setSelectedIcon(null)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIcon, showAISearch])

  // Compute related icons when selectedIcon changes
  useEffect(() => {
    if (selectedIcon) {
      const related = getRelatedIcons(selectedIcon, 8)
      setRelatedIcons(related)
    } else {
      setRelatedIcons([])
    }
  }, [selectedIcon])

  // AI Search handler
  const handleAISearch = useCallback(async () => {
    if (!aiPrompt.trim()) return
    
    setIsAISearching(true)
    setAIError(null)
    
    try {
      // Get all icon display names for the API
      const iconNames = getAllIconDisplayNames()
      
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt.trim(),
          iconNames: iconNames,
        }),
      })
      
      if (!response.ok) {
        throw new Error('AI search failed')
      }
      
      const data = await response.json()
      
      // Process categorized results
      if (data.categories && Array.isArray(data.categories)) {
        const categoriesWithIcons = data.categories.map((cat: { category: string; icons: string[] }) => ({
          category: cat.category,
          icons: findIconsByDisplayNames(cat.icons || [], activeLibraries)
        })).filter((cat: { category: string; icons: IconEntry[] }) => cat.icons.length > 0)
        
        setAICategories(categoriesWithIcons)
      } else {
        setAICategories([])
      }
      
      // Also set flat results for backwards compatibility
      const matchedIcons = findIconsByDisplayNames(data.icons || [], activeLibraries)
      setAIResults(matchedIcons)
      
      setAIResultsPrompt(aiPrompt.trim())
      setShowAIResults(true)
      setShowAISearch(false)
    } catch (error) {
      console.error('AI Search error:', error)
      setAIError('AI search is not available. Please check your configuration.')
    } finally {
      setIsAISearching(false)
    }
  }, [aiPrompt, activeLibraries])

  // Close AI results and return to normal search
  const closeAIResults = useCallback(() => {
    setShowAIResults(false)
    setAIResults([])
    setAICategories([])
    setAIResultsPrompt('')
  }, [])

  // Open AI search modal with clean state
  const openAISearch = useCallback(() => {
    setAIPrompt('')  // Clear previous prompt
    setAIError(null) // Clear previous error
    setShowAISearch(true)
  }, [])

  // Generate gradient SVG for preview display
  // Creates an SVG with embedded gradient applied directly to paths
  const [gradientSvgContent, setGradientSvgContent] = useState<string | null>(null)
  
  useEffect(() => {
    if (!selectedIcon || !iconMaskRef.current) {
      setIconMaskUrl(null)
      setGradientSvgContent(null)
      return
    }
    
    // Small delay to ensure icon is rendered
    const timer = setTimeout(() => {
      const svgElement = iconMaskRef.current?.querySelector('svg')
      
      if (svgElement) {
        const currentColorConfig = COLOR_OPTIONS.find(c => c.id === selectedColor)
        
        // Clone the SVG
        const clone = svgElement.cloneNode(true) as SVGElement
        clone.setAttribute('width', '128')
        clone.setAttribute('height', '128')
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        
        // Ensure viewBox is properly set
        if (!clone.getAttribute('viewBox')) {
          clone.setAttribute('viewBox', '0 0 24 24')
        }
        
        // For gradient mode, create SVG with embedded gradient
        if (currentColorConfig?.type === 'gradient' && currentColorConfig.gradient) {
          // Create gradient definition
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
          const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
          gradient.setAttribute('id', 'icon-gradient-preview')
          gradient.setAttribute('x1', '0%')
          gradient.setAttribute('y1', '0%')
          gradient.setAttribute('x2', '100%')
          gradient.setAttribute('y2', '100%')
          
          const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
          stop1.setAttribute('offset', '0%')
          stop1.setAttribute('stop-color', currentColorConfig.gradient.start)
          
          const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
          stop2.setAttribute('offset', '100%')
          stop2.setAttribute('stop-color', currentColorConfig.gradient.end)
          
          gradient.appendChild(stop1)
          gradient.appendChild(stop2)
          defs.appendChild(gradient)
          clone.insertBefore(defs, clone.firstChild)
          
          // Apply gradient to all paths/shapes
          // Check if SVG root has fill="none" - indicates stroke-based icon
          const svgRootFill = clone.getAttribute('fill')
          const isStrokeBasedIcon = svgRootFill === 'none'
          
          clone.querySelectorAll('path, circle, rect, polygon, line, polyline, ellipse').forEach(el => {
            const currentFill = el.getAttribute('fill')
            const currentStroke = el.getAttribute('stroke')
            
            // For stroke-based icons (like Huge Icons), apply gradient to stroke only
            if (isStrokeBasedIcon) {
              // Only apply gradient to stroke, don't add fill
              if (currentStroke && currentStroke !== 'none' && currentStroke !== 'transparent') {
                el.setAttribute('stroke', 'url(#icon-gradient-preview)')
              }
              if (currentStroke === 'currentColor') {
                el.setAttribute('stroke', 'url(#icon-gradient-preview)')
              }
            } else {
              // For fill-based icons (like Fluent Icons), apply gradient to fill
              if (currentFill && currentFill !== 'none' && currentFill !== 'transparent') {
                el.setAttribute('fill', 'url(#icon-gradient-preview)')
              }
              // Apply gradient to stroke if element has stroke
              if (currentStroke && currentStroke !== 'none' && currentStroke !== 'transparent') {
                el.setAttribute('stroke', 'url(#icon-gradient-preview)')
              }
              // If element uses currentColor, apply gradient
              if (currentFill === 'currentColor') {
                el.setAttribute('fill', 'url(#icon-gradient-preview)')
              }
              if (currentStroke === 'currentColor') {
                el.setAttribute('stroke', 'url(#icon-gradient-preview)')
              }
            }
          })
          
          // Also handle SVG root attributes
          const svgFill = clone.getAttribute('fill')
          const svgStroke = clone.getAttribute('stroke')
          if (svgFill && svgFill !== 'none') {
            clone.setAttribute('fill', 'url(#icon-gradient-preview)')
          }
          if (svgStroke && svgStroke !== 'none') {
            clone.setAttribute('stroke', 'url(#icon-gradient-preview)')
          }
          
          // Convert to data URL for display
          const svgString = new XMLSerializer().serializeToString(clone)
          setGradientSvgContent(svgString)
        }
        
        // Also generate the mask URL for fallback (keep this for compatibility)
        const maskClone = svgElement.cloneNode(true) as SVGElement
        maskClone.setAttribute('width', '128')
        maskClone.setAttribute('height', '128')
        
        // Force all elements to white for mask
        maskClone.querySelectorAll('*').forEach(el => {
          const element = el as SVGElement
          const fill = element.getAttribute('fill')
          const stroke = element.getAttribute('stroke')
          
          if (fill && fill !== 'none') {
            element.setAttribute('fill', 'white')
          }
          if (stroke && stroke !== 'none') {
            element.setAttribute('stroke', 'white')
          }
        })
        maskClone.setAttribute('fill', 'white')
        maskClone.setAttribute('stroke', 'white')
        
        const maskSvgString = new XMLSerializer().serializeToString(maskClone)
        const encodedSvg = encodeURIComponent(maskSvgString)
        const dataUrl = `url("data:image/svg+xml,${encodedSvg}")`
        setIconMaskUrl(dataUrl)
      }
    }, 150)
    
    return () => clearTimeout(timer)
  }, [selectedIcon, selectedColor])

  return (
    <div className="icon-finder-container">
      {/* Controls Panel */}
      <div className="icon-finder-controls">
        <div className="controls-header">
          <svg className="logo-icon" width="32" height="32" viewBox="-5 0 85 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M69.3513 43.9812C72.6419 40.7612 74.5954 36.6956 74.2248 31.4697C72.8051 11.0086 46.1691 -2.83242 40.1071 1.90518C34.6002 6.1936 41.7019 20.4617 45.4627 28.0174C45.8558 28.8072 46.2124 29.5237 46.5143 30.1477C47.981 33.1896 51.1135 40.6523 52.09 48.535C43.9571 50.8899 34.6907 52.1079 27.5088 53.0518C26.5268 53.1809 25.5837 53.3049 24.6878 53.4259C3.76716 56.2275 -2.99077 63.8517 2.64275 71.84C8.29169 79.8368 28.2498 89.5087 45.5736 87.9258C59.4181 86.6623 66.7501 79.1479 68.6845 75.5551C74.2771 65.9084 72.7869 54.3666 69.3513 43.9812ZM18.21 69.5113C12.3125 65.0211 17.9696 58.9294 29.7628 56.9154C30.8898 56.7232 32.2204 56.5225 33.7042 56.2986C38.8029 55.5293 45.7105 54.487 52.3791 52.5818C52.5619 62.6027 48.2712 72.2398 31.8368 73.4979C29.271 73.6716 22.9278 73.103 18.21 69.5113ZM69.7854 26.5539C72.0079 32.2508 70.9805 36.662 67.9644 40.1055C66.5707 36.4521 65.0074 33.0062 63.5234 29.9162C61.5031 24.541 61.812 14.5851 68.1474 23.3706C68.8824 24.566 69.4346 25.6871 69.7854 26.5539Z" fill="white"/>
          </svg>
          <h1>Icon Finder</h1>
        </div>

        {/* Search Input */}
        <div className="search-section">
          <label htmlFor="iconSearch">Search Icons</label>
          <div className="search-input-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              id="iconSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or keyword..."
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Library Toggles */}
        <div className="library-toggles">
          <label>Icon Libraries</label>
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${enabledLibraries['hugeicons'] ? 'active' : ''}`}
              onClick={() => toggleLibrary('hugeicons')}
              type="button"
            >
              <span className="toggle-indicator" />
              <span className="toggle-label">V1</span>
              <span className="toggle-sublabel">Huge Icons</span>
            </button>
            <button
              className={`toggle-button ${enabledLibraries['fluent-filled'] ? 'active' : ''}`}
              onClick={() => toggleLibrary('fluent-filled')}
              type="button"
            >
              <span className="toggle-indicator" />
              <span className="toggle-label">V2</span>
              <span className="toggle-sublabel">Fluent Filled</span>
            </button>
            <button
              className={`toggle-button ${enabledLibraries['fluent-outline'] ? 'active' : ''}`}
              onClick={() => toggleLibrary('fluent-outline')}
              type="button"
            >
              <span className="toggle-indicator" />
              <span className="toggle-label">V3</span>
              <span className="toggle-sublabel">Fluent Outline</span>
            </button>
          </div>
        </div>

        {/* AI Search Button */}
        <div className="ai-search-section">
          <button
            className="ai-search-button"
            onClick={openAISearch}
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
              <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z"/>
              <path d="M18 14l.75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75L18 14z"/>
            </svg>
            <span>AI Search</span>
            <span className="ai-badge">Beta</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <span className="results-count">{filteredIcons.length.toLocaleString()} icons</span>
          {debouncedQuery && (
            <span className="results-query">matching "{debouncedQuery}"</span>
          )}
        </div>
      </div>

      {/* Icons Grid Panel */}
      <div className="icon-finder-grid-panel">
        {showAIResults ? (
          /* AI Results View */
          <>
            <div className="grid-header ai-results-header">
              <div className="ai-results-title">
                <button 
                  className="back-button"
                  onClick={closeAIResults}
                  type="button"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Back
                </button>
                <div className="ai-results-info">
                  <h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
                    </svg>
                    AI Results
                  </h2>
                  <span className="ai-results-count">{filteredAIResults.length} icons found</span>
                </div>
              </div>
            </div>
            
            <div className="ai-prompt-display">
              <span className="prompt-label">Your prompt:</span>
              <p className="prompt-text">"{aiResultsPrompt}"</p>
            </div>

            {/* Categorized AI Results */}
            {filteredAICategories.length > 0 ? (
              <div className="ai-categories">
                {filteredAICategories.map((cat, catIndex) => (
                  <div key={cat.category} className="ai-category-section">
                    <div className="ai-category-header">
                      <span className="ai-category-icon">
                        {catIndex === 0 ? '🎯' : catIndex === 1 ? '📊' : catIndex === 2 ? '🔗' : catIndex === 3 ? '💡' : '✨'}
                      </span>
                      <h3 className="ai-category-title">{cat.category}</h3>
                      <span className="ai-category-count">{cat.icons.length} icons</span>
                    </div>
                    <div className="ai-category-icons">
                      {cat.icons.map((icon) => (
                        <button
                          key={`${icon.library}-${icon.name}`}
                          className="icon-card ai-suggested"
                          onClick={() => setSelectedIcon(icon)}
                          title={icon.displayName}
                        >
                          <div className="icon-preview">
                            {renderIcon(icon, 28)}
                          </div>
                          <span className="icon-name">{icon.displayName}</span>
                          <span className={`icon-library library-${icon.library}`}>
                            {icon.library === 'hugeicons' ? 'V1' : icon.library === 'fluent-filled' ? 'V2' : 'V3'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAIResults.length > 0 ? (
              /* Fallback to flat grid if no categories */
              <div className="icons-grid">
                {filteredAIResults.map((icon) => (
                  <button
                    key={`${icon.library}-${icon.name}`}
                    className="icon-card ai-suggested"
                    onClick={() => setSelectedIcon(icon)}
                    title={icon.displayName}
                  >
                    <span className="ai-suggested-badge">AI</span>
                    <div className="icon-preview">
                      {renderIcon(icon, 28)}
                    </div>
                    <span className="icon-name">{icon.displayName}</span>
                    <span className={`icon-library library-${icon.library}`}>
                      {icon.library === 'hugeicons' ? 'V1' : icon.library === 'fluent-filled' ? 'V2' : 'V3'}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
                </svg>
                <p>No matching icons found</p>
                <span>Try describing what you need differently</span>
              </div>
            )}
          </>
        ) : (
          /* Normal Search View */
          <>
            <div className="grid-header">
              <h2>Icons</h2>
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Low results suggestion */}
            {searchQuery.trim() && filteredIcons.length > 0 && filteredIcons.length <= 20 && (
              <div className="low-results-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span>Only {filteredIcons.length} results. Try <button onClick={openAISearch} className="inline-ai-btn">AI Search</button> for smarter suggestions.</span>
              </div>
            )}

            <div className="icons-grid">
              {paginatedIcons.length > 0 ? (
                paginatedIcons.map((icon) => (
                  <button
                    key={`${icon.library}-${icon.name}`}
                    className="icon-card"
                    onClick={() => setSelectedIcon(icon)}
                    title={icon.displayName}
                  >
                    <div className="icon-preview">
                      {renderIcon(icon, 28)}
                    </div>
                    <span className="icon-name">{icon.displayName}</span>
                    <span className={`icon-library library-${icon.library}`}>
                      {icon.library === 'hugeicons' ? 'V1' : icon.library === 'fluent-filled' ? 'V2' : 'V3'}
                    </span>
                  </button>
                ))
              ) : (
                <div className="no-results">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                    <path d="M8 11h6"/>
                  </svg>
                  <p>No icons found</p>
                  <span>Try a different search term or enable more libraries</span>
                  {searchQuery.trim() && (
                    <button 
                      className="try-ai-search-btn"
                      onClick={openAISearch}
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      Try AI Search
                    </button>
                  )}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination-bottom">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  {((currentPage - 1) * ITEMS_PER_PAGE + 1).toLocaleString()} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredIcons.length).toLocaleString()} of {filteredIcons.length.toLocaleString()}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Modal */}
      {selectedIcon && (
        <div className="preview-modal-overlay" onClick={() => setSelectedIcon(null)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedIcon(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="preview-content" ref={previewRef}>
              {/* Hidden icon for generating mask - render with white for CSS mask */}
              <div 
                ref={iconMaskRef}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              >
                {renderIcon(selectedIcon, 128, '#FFFFFF')}
              </div>
              
              {/* Icon Preview */}
              <div 
                className="preview-icon-container"
                style={{ 
                  backgroundColor: selectedColor === 'light' ? '#1a1a1a' : selectedColor === 'dark' ? '#f5f5f5' : '#1a1a1a'
                }}
              >
                {/* Export container */}
                <div 
                  ref={iconExportRef}
                  className="icon-export-wrapper"
                  style={{
                    width: 128,
                    height: 128,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {currentColorConfig?.type === 'gradient' && gradientSvgContent ? (
                    /* Gradient: render SVG with embedded gradient definition */
                    <div 
                      className="gradient-icon-display"
                      style={{
                        width: 128,
                        height: 128,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      dangerouslySetInnerHTML={{ __html: gradientSvgContent }}
                    />
                  ) : currentColorConfig?.type === 'gradient' && iconMaskUrl ? (
                    /* Gradient fallback: use CSS mask with the icon shape */
                    <div 
                      className="gradient-icon-display"
                      style={{
                        width: 128,
                        height: 128,
                        background: currentColorConfig.css,
                        WebkitMaskImage: iconMaskUrl,
                        maskImage: iconMaskUrl,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                      }}
                    />
                  ) : (
                    /* Solid color - render directly */
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {renderIcon(selectedIcon, 128, currentColorConfig?.value)}
                    </div>
                  )}
                </div>
              </div>

              {/* Icon Info */}
              <div className="preview-info">
                <h3>{selectedIcon.displayName}</h3>
                <span className={`preview-library library-${selectedIcon.library}`}>
                  {selectedIcon.library === 'hugeicons' ? 'Huge Icons (V1)' : 
                   selectedIcon.library === 'fluent-filled' ? 'Fluent Filled (V2)' : 
                   'Fluent Outline (V3)'}
                </span>
              </div>
            </div>

            {/* Color Options */}
            <div className="color-options">
              <label>Color</label>
              <div className="color-buttons">
                {COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={`color-button ${selectedColor === option.id ? 'active' : ''}`}
                    onClick={() => setSelectedColor(option.id)}
                    title={option.name}
                  >
                    <span 
                      className="color-swatch"
                      style={{
                        background: option.type === 'gradient' 
                          ? `linear-gradient(135deg, ${option.gradient?.start}, ${option.gradient?.end})`
                          : option.value
                      }}
                    />
                    <span className="color-name">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Input */}
            <div className="size-options">
              <label htmlFor="exportSize">Export Size (px)</label>
              <input
                id="exportSize"
                type="number"
                value={exportSize}
                onChange={(e) => setExportSize(Math.max(16, Math.min(2048, parseInt(e.target.value) || 512)))}
                min={16}
                max={2048}
              />
            </div>

            {/* Download Buttons */}
            <div className="download-buttons">
              <button 
                className="btn-download-png"
                onClick={exportAsPNG}
                disabled={isExporting}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {isExporting ? 'Exporting...' : `Download PNG (${exportSize}×${exportSize})`}
              </button>
              <button 
                className="btn-download-svg"
                onClick={exportAsSVG}
                disabled={isExporting}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download SVG
              </button>
            </div>

            {/* Related Icons Section */}
            {relatedIcons.length > 0 && (
              <div className="related-icons-section">
                <label>Related Icons</label>
                <div className="related-icons-grid">
                  {relatedIcons.map((icon) => (
                    <button
                      key={`related-${icon.library}-${icon.name}`}
                      className="related-icon-card"
                      onClick={() => setSelectedIcon(icon)}
                      title={icon.displayName}
                    >
                      <div className="related-icon-preview">
                        {renderIcon(icon, 24)}
                      </div>
                      <span className="related-icon-name">{icon.displayName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Search Modal */}
      {showAISearch && (
        <div className="ai-search-modal-overlay" onClick={() => setShowAISearch(false)}>
          <div className="ai-search-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAISearch(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="ai-search-header">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
                <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z"/>
                <path d="M18 14l.75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75L18 14z"/>
              </svg>
              <h2>AI Icon Search</h2>
              <p>Describe what you're looking for and AI will find the perfect icons</p>
            </div>

            <div className="ai-search-input-section">
              <label htmlFor="aiPrompt">Describe the icon you need</label>
              <textarea
                id="aiPrompt"
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                placeholder="e.g., An icon that represents artificial intelligence and automation for a dashboard..."
                rows={4}
                disabled={isAISearching}
              />
            </div>

            {aiError && (
              <div className="ai-error-message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {aiError}
              </div>
            )}

            <div className="ai-search-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowAISearch(false)}
                disabled={isAISearching}
              >
                Cancel
              </button>
              <button
                className="btn-ai-search"
                onClick={handleAISearch}
                disabled={isAISearching || !aiPrompt.trim()}
              >
                {isAISearching ? (
                  <>
                    <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20"/>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
                    </svg>
                    Search with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IconFinder

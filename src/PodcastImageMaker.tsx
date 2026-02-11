import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toPng } from 'html-to-image'
import './PodcastImageMaker.css'

// ---- Types ----
interface TitleLine {
  id: string
  text: string
  highlighted: boolean
}

interface PersonData {
  imageUrl: string | null
  name: string
  role: string
  company: string
  scale: number
  offsetX: number
  offsetY: number
  selectedPreset: string
}

interface PresetPerson {
  id: string
  name: string
  role: string
  company: string
  imageUrl: string
}

// ---- Pre-existing people ----
const PRESET_PEOPLE: PresetPerson[] = [
  {
    id: 'arjun-pillai',
    name: 'Arjun Pillai',
    role: 'CEO',
    company: 'Docket',
    imageUrl: '/podcast-people/arjun-pillai.png',
  },
]

// ---- Helpers ----
const generateId = () => Math.random().toString(36).substring(2, 9)

const DEFAULT_HOST: PersonData = {
  imageUrl: null,
  name: '',
  role: '',
  company: '',
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  selectedPreset: '',
}

const DEFAULT_GUEST: PersonData = {
  imageUrl: null,
  name: '',
  role: '',
  company: '',
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  selectedPreset: '',
}

// ---- Background Removal ----
let removeBackground: ((blob: Blob, config?: object) => Promise<Blob>) | null = null

async function loadBackgroundRemoval() {
  if (!removeBackground) {
    const module = await import('@imgly/background-removal')
    removeBackground = module.removeBackground
  }
  return removeBackground
}

// ---- Component ----
function PodcastImageMaker() {
  // Title lines
  const [titleLines, setTitleLines] = useState<TitleLine[]>([
    { id: generateId(), text: 'THE TRUST-FIRST', highlighted: false },
    { id: generateId(), text: 'REVENUE PLAYBOOK', highlighted: true },
  ])

  // Description
  const [description, setDescription] = useState('Trust As The Real KPI In Long Enterprise Sales Cycles.')

  // People
  const [host, setHost] = useState<PersonData>({
    ...DEFAULT_HOST,
    selectedPreset: 'arjun-pillai',
    imageUrl: '/podcast-people/arjun-pillai.png',
    name: 'Arjun Pillai',
    role: 'CEO',
    company: 'Docket',
    scale: 1.15,
    offsetY: 20,
  })
  const [guest, setGuest] = useState<PersonData>({ ...DEFAULT_GUEST })

  // Shared text layout controls
  const [infoSpread, setInfoSpread] = useState(0)
  const [infoY, setInfoY] = useState(0)
  const [textSpread, setTextSpread] = useState(0)
  const [textShadow, setTextShadow] = useState(true)

  // Export
  const [previewMode, setPreviewMode] = useState<'wide' | 'square'>('wide')
  const [isDownloading, setIsDownloading] = useState(false)
  const [showFrameGuides, setShowFrameGuides] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  // BG removal state
  const [hostBgRemovalProgress, setHostBgRemovalProgress] = useState<number | null>(null)
  const [guestBgRemovalProgress, setGuestBgRemovalProgress] = useState<number | null>(null)
  const [hostBgRemovalStatus, setHostBgRemovalStatus] = useState('')
  const [guestBgRemovalStatus, setGuestBgRemovalStatus] = useState('')

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null)
  const hostFileRef = useRef<HTMLInputElement>(null)
  const guestFileRef = useRef<HTMLInputElement>(null)
  const previewWrapperRef = useRef<HTMLDivElement>(null)
  // Drag state (images only — info text is positioned via sidebar sliders)
  const [dragTarget, setDragTarget] = useState<'host' | 'guest' | null>(null)
  const dragStartRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 })

  // Canvas scale to fit
  const [canvasScale, setCanvasScale] = useState(0.5)

  useEffect(() => {
    function updateScale() {
      if (!previewWrapperRef.current) return
      const wrapperW = previewWrapperRef.current.clientWidth - 64
      const wrapperH = previewWrapperRef.current.clientHeight - 64
      const canvasW = previewMode === 'wide' ? 1920 : 1080
      const canvasH = 1080
      const scale = Math.min(wrapperW / canvasW, wrapperH / canvasH, 1)
      setCanvasScale(scale)
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [previewMode])

  // ---- Title line handlers ----
  const addTitleLine = () => {
    setTitleLines(prev => [...prev, { id: generateId(), text: '', highlighted: false }])
  }

  const updateTitleLine = (id: string, field: 'text' | 'highlighted', value: string | boolean) => {
    setTitleLines(prev =>
      prev.map(line => (line.id === id ? { ...line, [field]: value } : line))
    )
  }

  const removeTitleLine = (id: string) => {
    if (titleLines.length <= 1) return
    setTitleLines(prev => prev.filter(line => line.id !== id))
  }

  // ---- Person preset selection ----
  const handlePresetSelect = (
    who: 'host' | 'guest',
    presetId: string
  ) => {
    const setter = who === 'host' ? setHost : setGuest
    if (presetId === '') {
      setter(prev => ({ ...prev, selectedPreset: '', imageUrl: null, name: '', role: '', company: '' }))
      return
    }
    if (presetId === 'custom') {
      setter(prev => ({ ...prev, selectedPreset: 'custom' }))
      return
    }
    const preset = PRESET_PEOPLE.find(p => p.id === presetId)
    if (preset) {
      setter({
        imageUrl: preset.imageUrl,
        name: preset.name,
        role: preset.role,
        company: preset.company,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        selectedPreset: presetId,
      })
    }
  }

  // ---- File upload ----
  const handleFileUpload = (who: 'host' | 'guest', file: File) => {
    const url = URL.createObjectURL(file)
    const setter = who === 'host' ? setHost : setGuest
    setter(prev => ({ ...prev, imageUrl: url, selectedPreset: 'custom' }))
  }

  // ---- Background removal ----
  const handleRemoveBackground = async (who: 'host' | 'guest') => {
    const person = who === 'host' ? host : guest
    const setter = who === 'host' ? setHost : setGuest
    const setProgress = who === 'host' ? setHostBgRemovalProgress : setGuestBgRemovalProgress
    const setStatus = who === 'host' ? setHostBgRemovalStatus : setGuestBgRemovalStatus

    if (!person.imageUrl) return

    try {
      setProgress(0)
      setStatus('Loading AI model...')

      const removeBgFn = await loadBackgroundRemoval()

      // Fetch the image as a blob
      const response = await fetch(person.imageUrl)
      const blob = await response.blob()

      setStatus('Removing background...')
      setProgress(20)

      const resultBlob = await removeBgFn(blob, {
        progress: (key: string, current: number, total: number) => {
          const pct = Math.round((current / total) * 100)
          setProgress(Math.min(20 + pct * 0.8, 99))
          if (key.includes('fetch')) setStatus('Downloading model...')
          else if (key.includes('compute')) setStatus('Processing image...')
        },
      })

      const resultUrl = URL.createObjectURL(resultBlob)
      setter(prev => ({ ...prev, imageUrl: resultUrl }))
      setProgress(100)
      setStatus('Done!')
      setTimeout(() => {
        setProgress(null)
        setStatus('')
      }, 1500)
    } catch (err) {
      console.error('Background removal failed:', err)
      setStatus('Failed - try a different image')
      setTimeout(() => {
        setProgress(null)
        setStatus('')
      }, 3000)
    }
  }

  // ---- Dragging person images on canvas ----
  const handleDragStart = (target: 'host' | 'guest', e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const person = target === 'host' ? host : guest
    setDragTarget(target)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: person.offsetX,
      offsetY: person.offsetY,
    }
  }

  useEffect(() => {
    if (!dragTarget) return

    const setter = dragTarget === 'host' ? setHost : setGuest
    const scaleFactor = canvasScale

    const handleMove = (e: MouseEvent) => {
      const dx = (e.clientX - dragStartRef.current.x) / scaleFactor
      const dy = (e.clientY - dragStartRef.current.y) / scaleFactor
      setter(prev => ({
        ...prev,
        offsetX: dragStartRef.current.offsetX + dx,
        offsetY: dragStartRef.current.offsetY + dy,
      }))
    }

    const handleUp = () => {
      setDragTarget(null)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [dragTarget, canvasScale])

  // ---- Download ----
  const doExport = useCallback(async (mode: 'wide' | 'square'): Promise<Blob | null> => {
    const targetRef = canvasRef.current
    if (!targetRef) return null

    const targetW = mode === 'wide' ? 1920 : 1080
    const targetH = 1080

    // Add exporting class to hide frame guides & show blur fallback
    targetRef.classList.add('exporting')

    // Temporarily remove parent scale so we capture at full resolution
    const scaleContainer = targetRef.parentElement
    const originalTransform = scaleContainer?.style.transform || ''
    if (scaleContainer) {
      scaleContainer.style.transform = 'none'
    }

    // Remove overflow:hidden from all ancestors so the full-size canvas isn't clipped
    const ancestors: { el: HTMLElement; original: string }[] = []
    let parent = targetRef.parentElement
    while (parent && parent !== document.body) {
      const computed = getComputedStyle(parent)
      if (computed.overflow !== 'visible') {
        ancestors.push({ el: parent, original: parent.style.overflow })
        parent.style.overflow = 'visible'
      }
      if (computed.overflowX !== 'visible') {
        parent.style.overflowX = 'visible'
      }
      if (computed.overflowY !== 'visible') {
        parent.style.overflowY = 'visible'
      }
      parent = parent.parentElement
    }

    try {
      // Wait for layout to settle
      await new Promise(resolve => setTimeout(resolve, 300))

      const dataUrl = await toPng(targetRef, {
        width: targetW,
        height: targetH,
        pixelRatio: 1,
        cacheBust: true,
        includeQueryParams: true,
      })

      // Convert data URL to Blob
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      return blob
    } catch (err) {
      console.error('Export error:', err)
      return null
    } finally {
      // Restore everything
      targetRef.classList.remove('exporting')
      if (scaleContainer) {
        scaleContainer.style.transform = originalTransform
      }
      for (const { el, original } of ancestors) {
        el.style.overflow = original
        el.style.overflowX = ''
        el.style.overflowY = ''
      }
    }
  }, [])

  const handleDownload = useCallback(async (mode: 'wide' | 'square' | 'both') => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      if (mode === 'both') {
        // Save current mode, export wide, switch to square, export square, restore
        const originalMode = previewMode

        // Export current mode first
        const firstMode = originalMode
        const secondMode = originalMode === 'wide' ? 'square' : 'wide'

        const blob1 = await doExport(firstMode)
        if (blob1) downloadBlob(blob1, `podcast-${firstMode}.png`)

        // Switch and wait for render
        setPreviewMode(secondMode)
        await new Promise(resolve => setTimeout(resolve, 300))

        const blob2 = await doExport(secondMode)
        if (blob2) downloadBlob(blob2, `podcast-${secondMode}.png`)

        // Restore
        setPreviewMode(originalMode)
      } else {
        // Make sure we're in the right mode
        if (previewMode !== mode) {
          setPreviewMode(mode)
          await new Promise(resolve => setTimeout(resolve, 300))
        }
        const blob = await doExport(mode)
        if (blob) downloadBlob(blob, `podcast-${mode}.png`)
      }
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setIsDownloading(false)
    }
  }, [isDownloading, previewMode, doExport])

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ---- Copy to clipboard ----
  const handleCopyToClipboard = useCallback(async () => {
    const blob = await doExport(previewMode)
    if (blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        setToast('Copied to clipboard!')
        setTimeout(() => setToast(null), 2500)
      } catch {
        setToast('Failed to copy')
        setTimeout(() => setToast(null), 2500)
      }
    }
  }, [doExport, previewMode])

  // ---- Reset all ----
  const handleReset = () => {
    setTitleLines([
      { id: generateId(), text: '', highlighted: false },
      { id: generateId(), text: '', highlighted: true },
    ])
    setDescription('')
    setHost({ ...DEFAULT_HOST })
    setGuest({ ...DEFAULT_GUEST })
    setInfoSpread(0)
    setInfoY(0)
    setTextSpread(0)
    setTextShadow(true)
  }

  // ---- Keyboard shortcut ----
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleDownload(previewMode)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleDownload, previewMode])

  // ---- Render person section in sidebar ----
  const renderPersonControls = (
    who: 'host' | 'guest',
    person: PersonData,
    setter: React.Dispatch<React.SetStateAction<PersonData>>,
    bgProgress: number | null,
    bgStatus: string,
    fileRef: React.RefObject<HTMLInputElement | null>
  ) => (
    <div className="person-section">
      <div className="podcast-field">
        <label>Select Person</label>
        <select
          value={person.selectedPreset}
          onChange={e => handlePresetSelect(who, e.target.value)}
        >
          <option value="">-- Choose --</option>
          {PRESET_PEOPLE.map(p => (
            <option key={p.id} value={p.id}>{p.name} - {p.role}, {p.company}</option>
          ))}
          <option value="custom">Upload Custom...</option>
        </select>
      </div>

      {(person.selectedPreset === 'custom' || person.selectedPreset === '') && (
        <div className="person-image-area">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(who, file)
            }}
          />
          <div
            className={`person-image-preview ${person.imageUrl ? 'has-image' : ''}`}
            onClick={() => fileRef.current?.click()}
          >
            {person.imageUrl ? (
              <img src={person.imageUrl} alt="Person" />
            ) : (
              <>
                <div className="upload-icon">+</div>
                <div className="upload-text">Click to upload image</div>
              </>
            )}
          </div>

          {person.imageUrl && person.selectedPreset === 'custom' && (
            <div className="person-image-actions">
              <button
                className="remove-bg-btn"
                onClick={() => handleRemoveBackground(who)}
                disabled={bgProgress !== null}
              >
                {bgProgress !== null ? 'Processing...' : 'Remove Background'}
              </button>
              <button onClick={() => setter(prev => ({ ...prev, imageUrl: null }))}>
                Remove
              </button>
            </div>
          )}

          {bgProgress !== null && (
            <>
              <div className="bg-removal-progress">
                <div className="bg-removal-progress-bar" style={{ width: `${bgProgress}%` }} />
              </div>
              {bgStatus && <div className="bg-removal-status">{bgStatus}</div>}
            </>
          )}
        </div>
      )}

      <div className="podcast-field">
        <label>Name</label>
        <input
          type="text"
          value={person.name}
          onChange={e => setter(prev => ({ ...prev, name: e.target.value }))}
          placeholder={who === 'host' ? 'Host name' : 'Guest name'}
        />
      </div>

      <div className="podcast-field">
        <label>Role / Title</label>
        <input
          type="text"
          value={person.role}
          onChange={e => setter(prev => ({ ...prev, role: e.target.value }))}
          placeholder="CEO, CTO, VP of..."
        />
      </div>

      <div className="podcast-field">
        <label>Company</label>
        <input
          type="text"
          value={person.company}
          onChange={e => setter(prev => ({ ...prev, company: e.target.value }))}
          placeholder="Company name"
        />
      </div>

      {person.imageUrl && (
        <>
          <div className="person-scale-control">
            <label>Scale</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={person.scale}
              onChange={e => setter(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
            />
            <span>{Math.round(person.scale * 100)}%</span>
          </div>
          <p className="podcast-hint">Drag the image on canvas to reposition</p>
        </>
      )}

    </div>
  )

  // ---- Person silhouette SVG for frame guide ----
  const PersonSilhouette = () => (
    <svg viewBox="0 0 200 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path
        d="M100 10 C130 10 155 35 155 70 C155 105 130 130 100 130 C70 130 45 105 45 70 C45 35 70 10 100 10Z M100 140 C140 140 175 155 190 180 C200 195 200 220 200 250 L200 350 L0 350 L0 250 C0 220 0 195 10 180 C25 155 60 140 100 140Z"
        stroke="rgba(255,165,0,0.35)"
        strokeWidth="2"
        strokeDasharray="8 6"
        fill="none"
      />
    </svg>
  )

  // ---- Render canvas person image ----
  const renderCanvasPersonImage = (who: 'host' | 'guest', person: PersonData) => {
    // Half the base gap + half the spread offset per side; allows negative (overlap)
    const baseGap = previewMode === 'wide' ? 40 : 20
    const halfGap = (baseGap + infoSpread) / 2
    const marginStyle = who === 'host'
      ? { marginRight: `${halfGap}px` }
      : { marginLeft: `${halfGap}px` }

    return (
      <div className={`podcast-person ${who === 'host' ? 'align-right' : 'align-left'}`} style={marginStyle}>
        {/* Frame guide - person silhouette */}
        {showFrameGuides && !person.imageUrl && (
          <div className="podcast-person-frame-guide">
            <PersonSilhouette />
          </div>
        )}

        {/* Person image (visual only, no pointer events) */}
        {person.imageUrl && (
          <div
            className="podcast-person-image-wrapper"
            style={{
              transform: `translateX(${person.offsetX}px) translateY(${person.offsetY}px) scale(${person.scale})`,
              transformOrigin: 'bottom center',
            }}
          >
            <img
              src={person.imageUrl}
              alt={person.name}
              draggable={false}
            />
          </div>
        )}

        {/* Invisible drag handle for image repositioning */}
        {person.imageUrl && (
          <div
            className={`podcast-person-drag-handle ${dragTarget === who ? 'dragging' : ''}`}
            onMouseDown={e => handleDragStart(who, e)}
            onPointerDown={e => handleDragStart(who, e as unknown as React.MouseEvent)}
          />
        )}
      </div>
    )
  }

  // ---- Render canvas person info (shared Y + shared horizontal spread) ----
  const renderCanvasPersonInfo = (who: 'host' | 'guest', person: PersonData) => {
    const alignClass = who === 'host' ? 'align-right' : 'align-left'
    const shadowClass = textShadow ? 'has-shadow' : ''
    // Host text moves left with positive spread, guest moves right
    const tx = who === 'host' ? -textSpread : textSpread
    const hasTransform = infoY !== 0 || textSpread !== 0

    return (
      <div
        className={`podcast-person-info ${alignClass} ${shadowClass}`}
        style={hasTransform ? {
          transform: `translate(${tx}px, ${infoY}px)`,
        } : undefined}
      >
        <div className="podcast-person-badge">
          {who === 'host' ? 'HOST' : 'GUEST'}
        </div>
        {person.name && (
          <div className="podcast-person-name">{person.name}</div>
        )}
        {person.role && (
          <div className="podcast-person-role">
            <span className="role-highlight-bg" />
            {person.role}
          </div>
        )}
        {person.company && (
          <div className="podcast-person-company">
            <span className="company-highlight-bg" />
            {person.company}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="podcast-maker">
      {/* ---- Sidebar ---- */}
      <div className="podcast-sidebar">
        {/* Header */}
        <div className="podcast-sidebar-header">
          <Link to="/" className="back-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <svg className="logo-icon" width="32" height="32" viewBox="-5 0 85 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M69.3513 43.9812C72.6419 40.7612 74.5954 36.6956 74.2248 31.4697C72.8051 11.0086 46.1691 -2.83242 40.1071 1.90518C34.6002 6.1936 41.7019 20.4617 45.4627 28.0174C45.8558 28.8072 46.2124 29.5237 46.5143 30.1477C47.981 33.1896 51.1135 40.6523 52.09 48.535C43.9571 50.8899 34.6907 52.1079 27.5088 53.0518C26.5268 53.1809 25.5837 53.3049 24.6878 53.4259C3.76716 56.2275 -2.99077 63.8517 2.64275 71.84C8.29169 79.8368 28.2498 89.5087 45.5736 87.9258C59.4181 86.6623 66.7501 79.1479 68.6845 75.5551C74.2771 65.9084 72.7869 54.3666 69.3513 43.9812ZM18.21 69.5113C12.3125 65.0211 17.9696 58.9294 29.7628 56.9154C30.8898 56.7232 32.2204 56.5225 33.7042 56.2986C38.8029 55.5293 45.7105 54.487 52.3791 52.5818C52.5619 62.6027 48.2712 72.2398 31.8368 73.4979C29.271 73.6716 22.9278 73.103 18.21 69.5113ZM69.7854 26.5539C72.0079 32.2508 70.9805 36.662 67.9644 40.1055C66.5707 36.4521 65.0074 33.0062 63.5234 29.9162C61.5031 24.541 61.812 14.5851 68.1474 23.3706C68.8824 24.566 69.4346 25.6871 69.7854 26.5539Z" fill="white"/>
          </svg>
          <h1>Podcast Image Maker</h1>
        </div>

        {/* Title section */}
        <div className="podcast-section">
          <div className="podcast-section-title">Title</div>
          <div className="title-lines-container">
            {titleLines.map((line) => (
              <div key={line.id} className="title-line-row">
                <input
                  type="text"
                  value={line.text}
                  onChange={e => updateTitleLine(line.id, 'text', e.target.value)}
                  placeholder="Title line..."
                />
                <button
                  className={`title-line-highlight-btn ${line.highlighted ? 'active' : ''}`}
                  onClick={() => updateTitleLine(line.id, 'highlighted', !line.highlighted)}
                  title={line.highlighted ? 'Remove highlight' : 'Add highlight'}
                >
                  H
                </button>
                {titleLines.length > 1 && (
                  <button
                    className="title-line-remove-btn"
                    onClick={() => removeTitleLine(line.id)}
                    title="Remove line"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button className="add-title-line-btn" onClick={addTitleLine}>
              + Add line
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="podcast-section">
          <div className="podcast-section-title">Description</div>
          <div className="podcast-field">
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Episode description or tagline..."
              rows={2}
            />
            <div className="char-count">{description.length} / 120</div>
          </div>
        </div>

        {/* Host */}
        <div className="podcast-section">
          <div className="podcast-section-title">Host</div>
          {renderPersonControls('host', host, setHost, hostBgRemovalProgress, hostBgRemovalStatus, hostFileRef)}
        </div>

        {/* Guest */}
        <div className="podcast-section">
          <div className="podcast-section-title">Guest</div>
          {renderPersonControls('guest', guest, setGuest, guestBgRemovalProgress, guestBgRemovalStatus, guestFileRef)}
        </div>

        {/* Text Layout (shared controls) */}
        <div className="podcast-section">
          <div className="podcast-section-title">Layout</div>

          {/* Image spread (gap between host & guest images) */}
          <div className="text-layout-row">
            <label>Image Spread</label>
            <div className="text-layout-slider-row">
              <input
                type="range"
                min="-300"
                max="300"
                step="5"
                value={infoSpread}
                onChange={e => setInfoSpread(parseFloat(e.target.value))}
              />
              <span className="text-layout-value">{infoSpread}</span>
            </div>
            <p className="text-layout-hint">← closer · further apart →</p>
          </div>

          {/* Text vertical offset (shared Y) */}
          <div className="text-layout-row">
            <label>Text Vertical</label>
            <div className="text-layout-slider-row">
              <input
                type="range"
                min="-300"
                max="300"
                step="5"
                value={infoY}
                onChange={e => setInfoY(parseFloat(e.target.value))}
              />
              <span className="text-layout-value">{infoY}</span>
            </div>
            <p className="text-layout-hint">↑ up · down ↓</p>
          </div>

          {/* Text horizontal spread */}
          <div className="text-layout-row">
            <label>Text Horizontal</label>
            <div className="text-layout-slider-row">
              <input
                type="range"
                min="-300"
                max="300"
                step="5"
                value={textSpread}
                onChange={e => setTextSpread(parseFloat(e.target.value))}
              />
              <span className="text-layout-value">{textSpread}</span>
            </div>
            <p className="text-layout-hint">← closer · further apart →</p>
          </div>

          {/* Reset */}
          {(infoSpread !== 0 || infoY !== 0 || textSpread !== 0) && (
            <button className="info-pos-reset" onClick={() => { setInfoSpread(0); setInfoY(0); setTextSpread(0) }}>
              Reset layout
            </button>
          )}

          {/* Text shadow toggle */}
          <label className="text-layout-checkbox">
            <input
              type="checkbox"
              checked={textShadow}
              onChange={e => setTextShadow(e.target.checked)}
            />
            <span className="checkbox-label">Drop shadow on text</span>
          </label>
        </div>

        {/* Settings */}
        <div className="podcast-section">
          <div className="podcast-section-title">Settings</div>
          <button
            className={`toggle-frame-btn ${showFrameGuides ? 'active' : ''}`}
            onClick={() => setShowFrameGuides(prev => !prev)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 3v18" />
            </svg>
            {showFrameGuides ? 'Frame guides ON' : 'Frame guides OFF'}
          </button>
        </div>

        {/* Export */}
        <div className="podcast-export-section">
          <div className="export-format-toggle">
            <button
              className={previewMode === 'wide' ? 'active' : ''}
              onClick={() => setPreviewMode('wide')}
            >
              Wide (1920×1080)
            </button>
            <button
              className={previewMode === 'square' ? 'active' : ''}
              onClick={() => setPreviewMode('square')}
            >
              Square (1080×1080)
            </button>
          </div>

          <button
            className="podcast-download-btn"
            onClick={() => handleDownload(previewMode)}
            disabled={isDownloading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {isDownloading ? 'Generating...' : `Download ${previewMode === 'wide' ? 'Wide' : 'Square'} PNG`}
          </button>

          <button
            className="podcast-download-btn secondary"
            onClick={() => handleDownload('both')}
            disabled={isDownloading}
          >
            Download Both Sizes
          </button>

          <button
            className="podcast-download-btn secondary"
            onClick={handleCopyToClipboard}
            disabled={isDownloading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy to Clipboard
          </button>

          <button className="podcast-reset-btn" onClick={handleReset}>
            Reset All
          </button>

          <p className="podcast-hint">Tip: Cmd/Ctrl + S to download</p>
        </div>
      </div>

      {/* ---- Preview Panel ---- */}
      <div className="podcast-preview-panel" ref={previewWrapperRef}>
        <div className="podcast-preview-label">
          Live Preview — {previewMode === 'wide' ? '1920 × 1080' : '1080 × 1080'}
        </div>

        <div className="podcast-preview-wrapper">
          <div
            className="podcast-canvas-scale-container"
            style={{ transform: `scale(${canvasScale})`, transformOrigin: 'center center' }}
          >
            <div
              ref={canvasRef}
              className={`podcast-canvas ${previewMode}`}
            >
              {/* Background image */}
              <img
                className="podcast-canvas-bg"
                src={previewMode === 'wide'
                  ? '/podcast-bgs/background-wide.jpg'
                  : '/podcast-bgs/background-square.jpg'
                }
                alt=""
                crossOrigin="anonymous"
              />

              {/* Content overlay */}
              <div className="podcast-canvas-content">
                {/* Title */}
                <div className="podcast-title-area">
                  {titleLines.map(line => (
                    <div
                      key={line.id}
                      className={`podcast-title-line ${line.highlighted ? 'highlighted' : ''}`}
                    >
                      {line.highlighted && <span className="title-highlight-bg" />}
                      {line.text || (line.highlighted ? 'HIGHLIGHTED TITLE' : 'TITLE LINE')}
                    </div>
                  ))}
                </div>

                {/* Description */}
                {description && (
                  <div className="podcast-description-text">
                    {description}
                  </div>
                )}

                {/* People images — spread controls spacing (can go negative for overlap) */}
                <div className="podcast-people-area">
                  {renderCanvasPersonImage('host', host)}
                  {renderCanvasPersonImage('guest', guest)}
                </div>

                {/* Progressive blur at bottom 25% — sits above images, behind text */}
                <div className="podcast-bottom-blur">
                  <div className="podcast-bottom-blur-layer blur-1" />
                  <div className="podcast-bottom-blur-layer blur-2" />
                  <div className="podcast-bottom-blur-layer blur-3" />
                  <div className="podcast-bottom-blur-layer blur-4" />
                </div>

                {/* Gradient fallback for export (backdrop-filter not supported by html2canvas) */}
                <div className="podcast-bottom-blur-fallback" />

                {/* Person info overlays — on top of blur */}
                {renderCanvasPersonInfo('host', host)}
                {renderCanvasPersonInfo('guest', guest)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="podcast-toast">{toast}</div>}
    </div>
  )
}

export default PodcastImageMaker

import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import './MetaImageGenerator.css'

// Docket Logo SVG Component - From official source
const DocketLogo = () => (
  <svg width="292" height="89" viewBox="0 0 292 89" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_821_2692)">
      <path fillRule="evenodd" clipRule="evenodd" d="M69.3513 43.9812C72.6419 40.7612 74.5954 36.6956 74.2248 31.4697C72.8051 11.0086 46.1691 -2.83242 40.1071 1.90518C34.6002 6.1936 41.7019 20.4617 45.4627 28.0174C45.8558 28.8072 46.2124 29.5237 46.5143 30.1477C47.981 33.1896 51.1135 40.6523 52.09 48.535C43.9571 50.8899 34.6907 52.1079 27.5088 53.0518C26.5268 53.1809 25.5837 53.3049 24.6878 53.4259C3.76716 56.2275 -2.99077 63.8517 2.64275 71.84C8.29169 79.8368 28.2498 89.5087 45.5736 87.9258C59.4181 86.6623 66.7501 79.1479 68.6845 75.5551C74.2771 65.9084 72.7869 54.3666 69.3513 43.9812ZM18.21 69.5113C12.3125 65.0211 17.9696 58.9294 29.7628 56.9154C30.8898 56.7232 32.2204 56.5225 33.7042 56.2986C38.8029 55.5293 45.7105 54.487 52.3791 52.5818C52.5619 62.6027 48.2712 72.2398 31.8368 73.4979C29.271 73.6716 22.9278 73.103 18.21 69.5113ZM69.7854 26.5539C72.0079 32.2508 70.9805 36.662 67.9644 40.1055C66.5707 36.4521 65.0074 33.0062 63.5234 29.9162C61.5031 24.541 61.812 14.5851 68.1474 23.3706C68.8824 24.566 69.4346 25.6871 69.7854 26.5539Z" fill="white"/>
      <path d="M110.564 70.0135C107.508 70.0135 104.758 69.2611 102.313 67.7568C99.8682 66.2052 97.9404 63.9953 96.5297 61.1272C95.1191 58.2592 94.4141 54.897 94.4141 51.0418C94.4141 47.1864 95.1191 43.8246 96.5297 40.9566C97.9404 38.0885 99.8682 35.8786 102.313 34.3271C104.758 32.7755 107.508 31.9997 110.564 31.9997C113.198 31.9997 115.408 32.5169 117.194 33.5513C119.028 34.5387 120.509 35.8316 121.637 37.4302H121.778V18.5997H128.69V69.0259H121.778V64.7945H121.637C120.462 66.2988 118.957 67.5448 117.123 68.5324C115.337 69.5199 113.15 70.0135 110.564 70.0135ZM101.608 51.0418C101.608 54.8034 102.477 57.9535 104.217 60.4922C105.957 63.0314 108.449 64.301 111.693 64.301C114.796 64.301 117.241 63.1256 119.028 60.7747C120.814 58.3765 121.708 55.1322 121.708 51.0418C121.708 46.9513 120.814 43.7306 119.028 41.3797C117.241 38.9818 114.796 37.7828 111.693 37.7828C108.449 37.7828 105.957 39.0523 104.217 41.5913C102.477 44.1302 101.608 47.2804 101.608 51.0418Z" fill="white"/>
      <path d="M149.169 70.0844C145.501 70.0844 142.304 69.2851 139.577 67.6867C136.85 66.0877 134.758 63.8547 133.3 60.9866C131.89 58.1185 131.185 54.8038 131.185 51.0422C131.185 47.2808 131.913 43.9661 133.371 41.098C134.828 38.2299 136.897 35.9966 139.577 34.398C142.304 32.7524 145.525 31.9295 149.239 31.9295C152.907 31.9295 156.08 32.7289 158.761 34.3274C161.488 35.9261 163.556 38.1829 164.967 41.098C166.424 43.9661 167.153 47.2573 167.153 50.9717C167.153 54.7333 166.424 58.0712 164.967 60.9866C163.509 63.8547 161.417 66.0877 158.69 67.6867C156.01 69.2851 152.836 70.0844 149.169 70.0844ZM138.378 51.0422C138.378 54.9916 139.295 58.2122 141.129 60.7041C142.963 63.1491 145.666 64.3719 149.239 64.3719C152.766 64.3719 155.422 63.1491 157.209 60.7041C159.043 58.2122 159.96 54.9916 159.96 51.0422C159.96 47.0928 159.043 43.8955 157.209 41.4506C155.422 38.9587 152.766 37.7127 149.239 37.7127C145.666 37.7127 142.963 38.9352 141.129 41.3801C139.295 43.825 138.378 47.0457 138.378 51.0422Z" fill="white"/>
      <path d="M186.716 70.0844C183.19 70.0844 180.087 69.2852 177.407 67.6867C174.727 66.0877 172.658 63.8547 171.2 60.9866C169.743 58.0712 169.014 54.7565 169.014 51.0423C169.014 47.3279 169.743 44.0366 171.2 41.1685C172.658 38.2535 174.703 35.9966 177.336 34.398C180.016 32.7994 183.119 32.0001 186.646 32.0001C189.655 32.0001 192.335 32.6114 194.686 33.8338C197.037 35.0093 198.917 36.6784 200.328 38.8412C201.739 40.957 202.585 43.3784 202.867 46.1054H195.744C195.508 43.8486 194.686 41.8973 193.275 40.2517C191.865 38.5591 189.679 37.7128 186.716 37.7128C183.143 37.7128 180.487 39.0057 178.747 41.5917C177.054 44.1306 176.208 47.2808 176.208 51.0423C176.208 54.8038 177.054 57.9539 178.747 60.4926C180.487 63.0318 183.143 64.3014 186.716 64.3014C189.725 64.3014 191.935 63.4785 193.346 61.8327C194.756 60.1874 195.556 58.1417 195.744 55.6972H202.867C202.726 58.4238 201.95 60.8925 200.539 63.1023C199.129 65.2648 197.225 66.9811 194.827 68.2508C192.429 69.473 189.725 70.0844 186.716 70.0844Z" fill="white"/>
      <path d="M206.27 18.5977H213.182V48.2893L228.91 33.0556H236.879L223.056 46.244L238.36 69.0238H230.179L218.401 50.6166L213.182 55.6242V69.0238H206.27V18.5977Z" fill="white"/>
      <path d="M253.221 70.0844C249.507 70.0844 246.31 69.2615 243.63 67.6157C240.95 65.9704 238.905 63.7137 237.494 60.8456C236.131 57.9775 235.449 54.6859 235.449 50.9717C235.449 47.2103 236.154 43.8955 237.564 41.0275C239.022 38.1594 241.091 35.9261 243.771 34.3274C246.451 32.7289 249.601 31.9295 253.221 31.9295C258.629 31.9295 262.813 33.5752 265.775 36.8664C268.784 40.1577 270.289 44.6243 270.289 50.2664C270.289 51.63 270.265 52.4997 270.218 52.8759H242.572C242.666 56.1202 243.63 58.8704 245.464 61.1276C247.344 63.3375 249.977 64.4424 253.362 64.4424C256.183 64.4424 258.346 63.7605 259.851 62.3967C261.402 61.0334 262.39 59.5523 262.813 57.9539H269.866C268.831 61.6212 266.927 64.5597 264.153 66.7696C261.379 68.9794 257.735 70.0844 253.221 70.0844ZM263.095 47.4454C263.095 44.5773 262.155 42.2264 260.274 40.3927C258.44 38.512 256.019 37.5717 253.01 37.5717C250.095 37.5717 247.673 38.4885 245.746 40.3222C243.818 42.1089 242.76 44.4832 242.572 47.4454H263.095Z" fill="white"/>
      <path d="M285.31 69.4498C282.112 69.4498 279.715 68.6737 278.116 67.1221C276.565 65.5705 275.789 62.8203 275.789 58.8704V38.7706H270.57V33.058H275.789V21.4917H282.7V33.058H289.612V38.7706H282.7V59.0825C282.7 60.9161 282.982 62.162 283.547 62.8203C284.158 63.4311 285.216 63.7368 286.72 63.7368C287.613 63.7368 288.601 63.6432 289.682 63.4548V69.0263C288.272 69.3083 286.814 69.4498 285.31 69.4498Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_821_2692">
        <rect width="290.584" height="87.1249" fill="white" transform="translate(0.742188 0.972656)"/>
      </clipPath>
    </defs>
  </svg>
)

function MetaImageGenerator() {
  const [title, setTitle] = useState('')
  const [subtext, setSubtext] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const metaImageRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(async () => {
    if (!metaImageRef.current || isDownloading) return
    
    setIsDownloading(true)
    
    try {
      // Temporarily remove scale transform for capture
      const originalTransform = metaImageRef.current.style.transform
      metaImageRef.current.style.transform = 'scale(1)'
      
      // Find the title element and add export mode (solid color fallback)
      const titleEl = metaImageRef.current.querySelector('.meta-title') as HTMLElement
      if (titleEl) {
        titleEl.classList.add('export-mode')
      }
      
      // Wait for layout to update
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const canvas = await html2canvas(metaImageRef.current, {
        width: 1200,
        height: 630,
        scale: 2,
        backgroundColor: '#111111',
        useCORS: true,
        logging: false,
      })
      
      // Remove export mode and restore transform
      if (titleEl) {
        titleEl.classList.remove('export-mode')
      }
      metaImageRef.current.style.transform = originalTransform
      
      const fileName = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 50) || 'meta-image'
      
      const link = document.createElement('a')
      link.download = `${fileName}-meta.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
    } catch (error) {
      console.error('Error generating meta image:', error)
      alert('There was an error generating the meta image. Please try again.')
    }
    
    setIsDownloading(false)
  }, [title, isDownloading])

  return (
    <div className="app-container">
      {/* Controls Panel */}
      <div className="controls-panel">
        <div className="controls-header">
          <svg className="logo-icon" width="32" height="32" viewBox="-5 0 85 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M69.3513 43.9812C72.6419 40.7612 74.5954 36.6956 74.2248 31.4697C72.8051 11.0086 46.1691 -2.83242 40.1071 1.90518C34.6002 6.1936 41.7019 20.4617 45.4627 28.0174C45.8558 28.8072 46.2124 29.5237 46.5143 30.1477C47.981 33.1896 51.1135 40.6523 52.09 48.535C43.9571 50.8899 34.6907 52.1079 27.5088 53.0518C26.5268 53.1809 25.5837 53.3049 24.6878 53.4259C3.76716 56.2275 -2.99077 63.8517 2.64275 71.84C8.29169 79.8368 28.2498 89.5087 45.5736 87.9258C59.4181 86.6623 66.7501 79.1479 68.6845 75.5551C74.2771 65.9084 72.7869 54.3666 69.3513 43.9812ZM18.21 69.5113C12.3125 65.0211 17.9696 58.9294 29.7628 56.9154C30.8898 56.7232 32.2204 56.5225 33.7042 56.2986C38.8029 55.5293 45.7105 54.487 52.3791 52.5818C52.5619 62.6027 48.2712 72.2398 31.8368 73.4979C29.271 73.6716 22.9278 73.103 18.21 69.5113ZM69.7854 26.5539C72.0079 32.2508 70.9805 36.662 67.9644 40.1055C66.5707 36.4521 65.0074 33.0062 63.5234 29.9162C61.5031 24.541 61.812 14.5851 68.1474 23.3706C68.8824 24.566 69.4346 25.6871 69.7854 26.5539Z" fill="white"/>
          </svg>
          <h1>Meta Image Generator</h1>
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <textarea
            id="title"
            rows={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Turn traffic into pipeline & prospects into customers"
            maxLength={100}
          />
          <span className="char-count">{title.length}/100</span>
        </div>
        
        <div className="form-group">
          <label htmlFor="subtext">Subtext</label>
          <textarea
            id="subtext"
            rows={2}
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            placeholder="e.g., Subtext goes here"
            maxLength={300}
          />
          <span className="char-count">{subtext.length}/300</span>
        </div>
        
        <button 
          className={`btn-download ${isDownloading ? 'loading' : ''}`}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {isDownloading ? 'Generating...' : 'Download Meta Image (PNG)'}
        </button>
        
        <p className="hint">Meta image size: 1200 × 630 pixels</p>
      </div>
      
      {/* Preview Panel */}
      <div className="preview-panel">
        <h2>Live Preview</h2>
        <div className="preview-wrapper">
          <div className="meta-image-scale-container">
            <div className="meta-image" ref={metaImageRef}>
              {/* Background Image */}
              <img 
                src="/metaimage-background.png"
                alt=""
                className="meta-background"
              />
              
              {/* Content Container */}
              <div className="meta-content">
                {/* All content in one container - Logo, Title, Subtext */}
                <div className="meta-content-container">
                  {/* Docket Logo */}
                  <div className="meta-logo">
                    <DocketLogo />
                  </div>
                  
                  {/* Title */}
                  <h1 className="meta-title">{title || 'Title'}</h1>
                  
                  {/* Subtext */}
                  <p className="meta-subtext">{subtext || 'Subtext goes here'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetaImageGenerator

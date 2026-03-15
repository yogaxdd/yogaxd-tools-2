import { useState, useRef } from 'react'

export default function FakeLobby() {
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(false)
  const blobRef = useRef(null)

  const handleGenerate = async () => {
    if (!nickname.trim()) {
      setInputError(true)
      setTimeout(() => setInputError(false), 2000)
      return
    }

    setLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const res = await fetch(`/proxy/maker/fakelobyff?nickname=${encodeURIComponent(nickname.trim())}`)

      if (!res.ok) {
        const msgs = {
          400: 'Parameter tidak valid. Cek nickname kamu.',
          405: 'Metode HTTP tidak didukung.',
          429: 'Terlalu banyak request. Coba lagi nanti.',
          500: 'Server error. Coba lagi nanti.',
        }
        throw new Error(msgs[res.status] || `Error ${res.status}`)
      }

      const blob = await res.blob()
      blobRef.current = blob
      setImageUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!blobRef.current) return
    const url = URL.createObjectURL(blobRef.current)
    const a = document.createElement('a')
    a.href = url
    a.download = `fakelobby_${nickname.trim() || 'result'}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate()
  }

  return (
    <section className="section" id="tools">
      <div className="section-inner">
        <p className="section-label">⚙️ Tools</p>
        <h2 className="section-title">Fake Lobby Free Fire</h2>
        <p className="section-desc">Generate fake lobby card Free Fire dengan template random yang keren.</p>

        <div className="tool-card">
          <div className="tool-header">
            <div className="tool-icon">🎮</div>
            <div className="tool-meta">
              <h3 className="tool-name">Fake Lobby FF</h3>
              <p className="tool-tagline">Masukkan nickname, generate hasilnya</p>
            </div>
            <span className="method-tag">GET</span>
          </div>

          <div className="tool-body">
            <div className="form-group">
              <label className="form-label" htmlFor="nickname">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Nickname
              </label>
              <input
                id="nickname"
                className={`form-input${inputError ? ' error' : ''}`}
                type="text"
                placeholder="Masukkan nickname Free Fire..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={30}
                autoComplete="off"
              />
            </div>

            <button
              className="btn-primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Generating...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Generate Lobby Card
                </>
              )}
            </button>

            {imageUrl && (
              <div className="result-section">
                <div className="result-bar">
                  <span className="result-badge">✅ Berhasil</span>
                  <button className="btn-download" onClick={handleDownload}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Download
                  </button>
                </div>
                <div className="result-img-wrap">
                  <img src={imageUrl} alt="Fake Lobby Result" />
                </div>
              </div>
            )}

            {error && (
              <div className="error-box">
                <p>⚠️ {error}</p>
                <button className="btn-retry" onClick={handleGenerate}>
                  Coba Lagi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState, useRef } from 'react'

export default function IqcMaker() {
  const [form, setForm] = useState({ text: '', provider: '', jam: '', baterai: '' })
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(false)
  const blobRef = useRef(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleGenerate = async () => {
    if (!form.text.trim()) {
      setInputError(true)
      setTimeout(() => setInputError(false), 2000)
      return
    }

    setLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const params = new URLSearchParams()
      params.set('text', form.text.trim())
      if (form.provider.trim()) params.set('provider', form.provider.trim())
      if (form.jam.trim()) params.set('jam', form.jam.trim())
      if (form.baterai.trim()) params.set('baterai', form.baterai.trim())

      const res = await fetch(`/proxy/maker/v1/iqc?${params.toString()}`)

      if (!res.ok) {
        const msgs = {
          400: 'Parameter tidak valid.',
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
    a.download = `iqc_${form.text.trim() || 'result'}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="tool-card">
      <div className="tool-header">
        <div className="tool-icon">💬</div>
        <div className="tool-meta">
          <h3 className="tool-name">IQC Maker</h3>
          <p className="tool-tagline">Membuat gambar IQC dari teks</p>
        </div>
        <span className="method-tag">GET</span>
      </div>

      <div className="tool-body">
        <div className="form-group">
          <label className="form-label" htmlFor="iqc-text">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Text <span className="required">*</span>
          </label>
          <input
            id="iqc-text"
            name="text"
            className={`form-input${inputError ? ' error' : ''}`}
            type="text"
            placeholder="Masukkan teks..."
            value={form.text}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            autoComplete="off"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="iqc-provider">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>
              Provider
            </label>
            <input
              id="iqc-provider"
              name="provider"
              className="form-input"
              type="text"
              placeholder="cth: Telkomsel"
              value={form.provider}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="iqc-jam">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Jam
            </label>
            <input
              id="iqc-jam"
              name="jam"
              className="form-input"
              type="text"
              placeholder="cth: 11:11"
              value={form.jam}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="iqc-baterai">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>
              Baterai
            </label>
            <input
              id="iqc-baterai"
              name="baterai"
              className="form-input"
              type="text"
              placeholder="cth: 100"
              value={form.baterai}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
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
              Generate IQC
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
              <img src={imageUrl} alt="IQC Result" />
            </div>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>⚠️ {error}</p>
            <button className="btn-retry" onClick={handleGenerate}>Coba Lagi</button>
          </div>
        )}
      </div>
    </div>
  )
}

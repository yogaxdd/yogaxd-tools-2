import { useState } from 'react'

const APIS = [
  {
    id: 'fakelobby',
    name: 'Fake Lobby Free Fire',
    method: 'GET',
    endpoint: 'https://api.nexray.web.id/maker/fakelobyff?nickname={nickname}',
    curl: 'curl -X GET "https://api.nexray.web.id/maker/fakelobyff?nickname=YogaXD"',
    params: [
      { name: 'nickname', type: 'string', required: true, desc: 'Nickname FF yang ditampilkan' },
    ],
  },
  {
    id: 'iqc',
    name: 'IQC Maker v1',
    method: 'GET',
    endpoint: 'https://api.nexray.web.id/maker/v1/iqc?text={text}&provider={provider}&jam={jam}&baterai={baterai}',
    curl: 'curl -X GET "https://api.nexray.web.id/maker/v1/iqc?text=hello&provider=Telkomsel&jam=11:11&baterai=100"',
    params: [
      { name: 'text', type: 'string', required: true, desc: 'Teks yang ditampilkan' },
      { name: 'provider', type: 'string', required: false, desc: 'Nama provider (cth: Telkomsel)' },
      { name: 'jam', type: 'string', required: false, desc: 'Waktu yang ditampilkan (cth: 11:11)' },
      { name: 'baterai', type: 'string', required: false, desc: 'Level baterai (cth: 100)' },
    ],
  },
]

const STATUS_CODES = [
  { code: 200, text: 'OK - Request berhasil', type: 'ok' },
  { code: 400, text: 'Bad Request - Parameter invalid', type: 'err' },
  { code: 405, text: 'Method Not Allowed', type: 'err' },
  { code: 429, text: 'Too Many Requests - Rate limit', type: 'warn' },
  { code: 500, text: 'Internal Server Error', type: 'err' },
]

export default function ApiDocs() {
  const [copiedId, setCopiedId] = useState(null)

  const copy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <section className="section api-page">
      <div className="section-inner">
        <p className="section-label">🔗 API Reference</p>
        <h2 className="section-title">API Documentation</h2>
        <p className="section-desc">Integrasi langsung ke project kamu pakai REST API.</p>

        <div className="api-list">
          {APIS.map(api => (
            <div className="api-card" key={api.id}>
              <div className="api-header">
                <span className="method-tag">{api.method}</span>
                <h3>{api.name}</h3>
              </div>

              <div className="api-endpoint">
                <code>{api.endpoint}</code>
                <button
                  className={`btn-copy${copiedId === `ep-${api.id}` ? ' copied' : ''}`}
                  onClick={() => copy(api.endpoint, `ep-${api.id}`)}
                >
                  {copiedId === `ep-${api.id}` ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="api-section-block">
                <h4>Parameters</h4>
                <div className="params-grid">
                  <div className="param-row header">
                    <span>Name</span>
                    <span>Type</span>
                    <span>Required</span>
                    <span>Description</span>
                  </div>
                  {api.params.map(p => (
                    <div className="param-row" key={p.name}>
                      <span className="param-name">{p.name}</span>
                      <span className="param-type">{p.type}</span>
                      <span>{p.required ? '✅ Yes' : '—'}</span>
                      <span style={{color: 'var(--text-secondary)'}}>{p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="api-section-block">
                <h4>Response Codes</h4>
                <div className="codes-list">
                  {STATUS_CODES.map(sc => (
                    <div className={`code-row ${sc.type}`} key={sc.code}>
                      <span className="code-num">{sc.code}</span>
                      <span className="code-text">{sc.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="api-section-block">
                <h4>Contoh Request</h4>
                <div className="code-block">
                  <div className="code-block-top">
                    <span className="code-lang">cURL</span>
                    <button
                      className={`btn-copy${copiedId === `curl-${api.id}` ? ' copied' : ''}`}
                      onClick={() => copy(api.curl, `curl-${api.id}`)}
                    >
                      {copiedId === `curl-${api.id}` ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre><code>{api.curl}</code></pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

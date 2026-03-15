import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

// Proxy /proxy/* -> https://api.nexray.web.id/*
app.use('/proxy', createProxyMiddleware({
  target: 'https://api.nexray.web.id',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
  secure: true,
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message)
    res.status(502).json({ error: 'Proxy error', message: err.message })
  }
}))

// Serve static build
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

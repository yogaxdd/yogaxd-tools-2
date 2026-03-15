import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ToolsSection from './components/ToolsSection'
import ApiDocs from './components/ApiDocs'
import Footer from './components/Footer'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />
      <ToolsSection />
    </>
  )
}

function ApiPage() {
  return <ApiDocs />
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api" element={<ApiPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

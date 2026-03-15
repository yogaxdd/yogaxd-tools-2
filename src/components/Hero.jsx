export default function Hero() {
  const scrollToTools = (e) => {
    e.preventDefault()
    const el = document.getElementById('tools')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <h1 className="hero-title">
          Tools <span>Keren</span> untuk Gamers
        </h1>
        <p className="hero-desc">
          Generate fake lobby cards dan berbagai tools gaming lainnya. Gratis, cepat, dan mudah digunakan.
        </p>
        <a href="#tools" className="hero-cta" onClick={scrollToTools}>
          Mulai Sekarang
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  )
}

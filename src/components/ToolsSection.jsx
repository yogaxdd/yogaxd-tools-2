import { useState } from 'react'
import FakeLobby from './FakeLobby'
import IqcMaker from './IqcMaker'

const CATEGORIES = [
  {
    id: 'maker',
    label: '🎨 Maker',
    tools: [
      { id: 'fakelobby', name: 'Fake Lobby FF', icon: '🎮', component: FakeLobby },
      { id: 'iqc', name: 'IQC Maker', icon: '💬', component: IqcMaker },
      { id: 'fakelobbyml', name: 'Fake Lobby ML', icon: '🎯', comingSoon: true },
    ]
  }
]

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState('fakelobby')

  const allTools = CATEGORIES.flatMap(c => c.tools)
  const ActiveComponent = allTools.find(t => t.id === activeTool)?.component

  return (
    <section className="section" id="tools">
      <div className="section-inner">
        <p className="section-label">⚙️ Tools</p>
        <h2 className="section-title">Pilih Tools</h2>
        <p className="section-desc">Pilih tool yang kamu butuhkan dari kategori di bawah.</p>

        {CATEGORIES.map(cat => (
          <div key={cat.id} className="category-block">
            <div className="category-label">{cat.label}</div>
            <div className="tool-tabs">
              {cat.tools.map(tool => (
                <button
                  key={tool.id}
                  className={`tool-tab${activeTool === tool.id ? ' active' : ''}${tool.comingSoon ? ' soon' : ''}`}
                  onClick={() => !tool.comingSoon && setActiveTool(tool.id)}
                  disabled={tool.comingSoon}
                >
                  <span className="tool-tab-icon">{tool.icon}</span>
                  <span className="tool-tab-name">{tool.name}</span>
                  {tool.comingSoon && <span className="soon-badge">Soon</span>}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="tool-panel">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'

export default function Portfolio() {
  const { c } = useLang()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [c])

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ position: 'relative', zIndex: 2, padding: '80px 48px 120px' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            color: '#7B2FFF', letterSpacing: 4, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16,
          }}>
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,#7B2FFF)' }} />
            {c.sectionTags[1]}
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#7B2FFF,transparent)' }} />
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
            {c.sectionTitles[1]}
          </h2>
        </div>

        {/* Filters */}
        <div className="reveal" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
          {c.filterBtns.map((btn, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: '8px 20px', borderRadius: 100, fontSize: 13, cursor: 'pointer',
              background: active === i ? 'rgba(123,47,255,0.15)' : 'rgba(123,47,255,0.05)',
              border: `1px solid ${active === i ? 'rgba(123,47,255,0.4)' : 'rgba(123,47,255,0.12)'}`,
              color: active === i ? 'rgba(200,170,255,0.9)' : 'rgba(200,170,255,0.4)',
              transition: 'all 0.3s',
            }}>{btn}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {c.portfolio.map((item, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div style={{
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid rgba(123,47,255,0.12)',
                background: 'rgba(10,5,25,0.7)', backdropFilter: 'blur(10px)',
                transition: 'all 0.4s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(123,47,255,0.3)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(123,47,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Image area */}
                <div style={{
                  height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 56, background: 'rgba(10,5,25,0.8)', position: 'relative', overflow: 'hidden',
                }}>
                  {item.icon}
                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg,rgba(123,47,255,0.1),rgba(224,64,251,0.1))',
                    opacity: 0, transition: 'opacity 0.3s',
                  }} />
                </div>

                <div style={{ padding: 24 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                    color: '#7B2FFF', letterSpacing: 2, textTransform: 'uppercase',
                    display: 'block', marginBottom: 8,
                  }}>{item.cat}</span>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                    {item.title}
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {item.tags.map((t, j) => (
                      <span key={j} style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 3,
                        background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.15)',
                        color: 'rgba(0,212,255,0.6)', fontFamily: "'JetBrains Mono',monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
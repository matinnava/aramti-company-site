import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLang } from '../context/LangContext'

export default function Services() {
  const { c } = useLang()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const SectionHeader = ({ tagIndex }) => (
    <div className="reveal" style={{ textAlign: 'center', marginBottom: 70 }}>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
        color: '#7B2FFF', letterSpacing: 4, textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16,
      }}>
        <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,#7B2FFF)' }} />
        {c.sectionTags[tagIndex]}
        <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#7B2FFF,transparent)' }} />
      </div>
      <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
        {c.sectionTitles[tagIndex]}
      </h2>
    </div>
  )

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ position: 'relative', zIndex: 2, padding: '80px 48px 120px' }}>
        <SectionHeader tagIndex={0} />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 24 }}>
          {c.services.map((srv, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div style={{
                padding: 40, borderRadius: 22,
                border: '1px solid rgba(123,47,255,0.12)',
                background: 'rgba(10,5,25,0.7)', backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(123,47,255,0.35)'
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.4),0 0 40px rgba(123,47,255,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(123,47,255,0.12)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* top line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg,transparent,#7B2FFF,#E040FB,transparent)',
                  transform: 'scaleX(0)', transition: 'transform 0.5s',
                }} className="card-top-line" />

                <div style={{
                  width: 56, height: 56, borderRadius: 16, fontSize: 26,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.2)',
                  marginBottom: 24,
                }}>{srv.icon}</div>

                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                  {srv.title}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(200,170,255,0.4)', lineHeight: 1.9, marginBottom: 24 }}>
                  {srv.desc}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {srv.tags.map((t, j) => (
                    <span key={j} style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                      padding: '3px 10px', borderRadius: 4,
                      background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)',
                      color: 'rgba(0,212,255,0.6)',
                    }}>{t}</span>
                  ))}
                </div>
                <Link to="/order" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '10px 24px', borderRadius: 100,
                    background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
                    color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => e.target.style.boxShadow = '0 0 25px rgba(123,47,255,0.5)'}
                    onMouseLeave={e => e.target.style.boxShadow = 'none'}
                  >{c.navCta}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
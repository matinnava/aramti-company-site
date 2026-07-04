import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCounter(target, suffix, start) {
  const [val, setVal] = useState('0' + suffix)
  useEffect(() => {
    if (!start) return
    let cur = 0
    const step = target / 60
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(Math.floor(cur) + suffix)
      if (cur >= target) clearInterval(iv)
    }, 25)
    return () => clearInterval(iv)
  }, [start, target, suffix])
  return val
}

function StatItem({ target, suffix, label }) {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const val = useCounter(target, suffix, started)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      padding: '20px 36px', textAlign: 'center', position: 'relative',
      transition: 'background 0.3s', cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(123,47,255,0.06)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 900, display: 'block',
        background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{val}</span>
      <span style={{ fontSize: 12, color: 'rgba(200,170,255,0.35)', letterSpacing: 1, marginTop: 4, display: 'block' }}>
        {label}
      </span>
    </div>
  )
}

function TypingEffect({ words }) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const w = words[wi]
    const timeout = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1))
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), 1500)
      } else {
        setText(w.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setWi((wi + 1) % words.length) }
      }
    }, del ? 45 : 90)
    return () => clearTimeout(timeout)
  }, [text, del, wi, words])

  return (
    <div style={{
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 'clamp(14px,2vw,20px)',
      color: 'rgba(180,127,255,0.6)',
      height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginBottom: 20, animation: 'fadeUp 0.8s 0.2s ease both',
    }}>
      <span style={{ color: 'rgba(123,47,255,0.6)' }}>~/aramti $</span>
      <span>{text}</span>
      <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#B47FFF', animation: 'blink 1s infinite', verticalAlign: 'middle' }} />
    </div>
  )
}

export default function Home() {
  const { c } = useLang()
  useReveal()

  const PrimaryBtn = ({ children, to, onClick, style = {} }) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        position: 'absolute', inset: -3, borderRadius: 100,
        background: 'linear-gradient(135deg,#7B2FFF,#E040FB,#00D4FF,#7B2FFF)',
        backgroundSize: '300% 300%', filter: 'blur(6px)',
        animation: 'rotateBorder 3s linear infinite', opacity: 0.6, zIndex: -1,
      }} />
      {to ? (
        <Link to={to}>
          <button onClick={onClick} style={{
            padding: '15px 40px', borderRadius: 100,
            background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
            color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
            boxShadow: '0 0 28px rgba(123,47,255,0.4)',
            transition: 'all 0.3s', position: 'relative', overflow: 'hidden', ...style,
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 15px 55px rgba(123,47,255,0.6)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 28px rgba(123,47,255,0.4)' }}
          >{children}</button>
        </Link>
      ) : (
        <button onClick={onClick} style={{
          padding: '15px 40px', borderRadius: 100,
          background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
          color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
          boxShadow: '0 0 28px rgba(123,47,255,0.4)',
          transition: 'all 0.3s', position: 'relative', overflow: 'hidden', ...style,
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 15px 55px rgba(123,47,255,0.6)' }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 28px rgba(123,47,255,0.4)' }}
        >{children}</button>
      )}
    </div>
  )

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '100px 24px 60px',
      }}>
        {/* Orbit rings */}
        {[500, 700, 900].map((size, i) => (
          <div key={i} style={{
            position: 'absolute', width: size, height: size, borderRadius: '50%',
            border: `1px solid rgba(123,47,255,${0.08 - i * 0.02})`,
            animation: `orbSpin ${30 + i * 15}s linear ${i % 2 ? 'reverse' : ''} infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 20px', borderRadius: 100,
          border: '1px solid rgba(123,47,255,0.25)',
          background: 'rgba(123,47,255,0.07)',
          fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
          color: '#B47FFF', letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 40, animation: 'fadeUp 0.8s ease both',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00D4FF', boxShadow: '0 0 8px #00D4FF', animation: 'badgePulse 2s infinite' }} />
          {c.heroStatus}
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: 'clamp(48px,8vw,100px)',
          fontWeight: 900, lineHeight: 0.95,
          marginBottom: 16, animation: 'fadeUp 0.8s 0.1s ease both',
        }}>
          <span style={{ color: '#fff', display: 'block', letterSpacing: -1 }}>{c.heroLine1}</span>
          <span style={{
            display: 'block', letterSpacing: -1,
            background: 'linear-gradient(135deg,#7B2FFF 0%,#E040FB 40%,#00D4FF 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            backgroundSize: '200% auto', animation: 'fadeUp 0.8s 0.1s ease both, gradShift 4s linear infinite',
            filter: 'drop-shadow(0 0 40px rgba(123,47,255,0.4))',
          }}>{c.heroLine2}</span>
        </h1>

        <TypingEffect words={c.words} />

        <p style={{
          fontSize: 'clamp(14px,1.5vw,17px)',
          color: 'rgba(200,170,255,0.4)',
          maxWidth: 560, lineHeight: 1.9,
          marginBottom: 48, animation: 'fadeUp 0.8s 0.25s ease both',
        }}>{c.heroDesc}</p>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 0.8s 0.3s ease both', marginBottom: 80,
        }}>
          <PrimaryBtn to="/order">{c.heroBtn1}</PrimaryBtn>
          <Link to="/portfolio">
            <button style={{
              padding: '15px 40px', borderRadius: 100,
              background: 'rgba(123,47,255,0.06)',
              color: '#B47FFF', fontSize: 15, fontWeight: 600,
              border: '1px solid rgba(123,47,255,0.2)', cursor: 'pointer',
              transition: 'all 0.4s',
            }}
              onMouseEnter={e => { e.target.style.background = 'rgba(123,47,255,0.14)'; e.target.style.borderColor = 'rgba(123,47,255,0.5)'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(123,47,255,0.06)'; e.target.style.borderColor = 'rgba(123,47,255,0.2)'; e.target.style.transform = 'translateY(0)' }}
            >{c.heroBtn2}</button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', border: '1px solid rgba(123,47,255,0.12)',
          borderRadius: 16, background: 'rgba(10,5,25,0.5)', backdropFilter: 'blur(10px)',
          overflow: 'hidden', animation: 'fadeUp 0.8s 0.4s ease both', flexWrap: 'wrap',
        }}>
          {[
            { target: 40, suffix: '+' }, { target: 35, suffix: '+' },
            { target: 5, suffix: '+' }, { target: 99, suffix: '%' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {i > 0 && <div style={{ position: 'absolute', top: '20%', [c.dir === 'rtl' ? 'right' : 'left']: 0, bottom: '20%', width: 1, background: 'rgba(123,47,255,0.12)' }} />}
              <StatItem target={s.target} suffix={s.suffix} label={c.statLabels[i]} />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ position: 'relative', zIndex: 2, padding: '120px 48px' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 70 }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            color: '#7B2FFF', letterSpacing: 4, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16,
          }}>
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,#7B2FFF)' }} />
            {c.sectionTags[0]}
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#7B2FFF,transparent)' }} />
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
            {c.sectionTitles[0]}
          </h2>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
          {c.services.map((srv, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div
                style={{
                  padding: 36, borderRadius: 20,
                  border: '1px solid rgba(123,47,255,0.12)',
                  background: 'rgba(10,5,25,0.7)', backdropFilter: 'blur(12px)',
                  cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(123,47,255,0.3)'
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.4),0 0 40px rgba(123,47,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(123,47,255,0.12)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, fontSize: 24,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.2)',
                  marginBottom: 24, transition: 'all 0.4s',
                }}>{srv.icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{srv.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(200,170,255,0.4)', lineHeight: 1.8, marginBottom: 20 }}>{srv.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {srv.tags.map((t, j) => (
                    <span key={j} style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                      padding: '3px 10px', borderRadius: 4,
                      background: 'rgba(123,47,255,0.08)', border: '1px solid rgba(123,47,255,0.15)',
                      color: 'rgba(180,127,255,0.6)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', zIndex: 2, padding: '0 48px 120px', textAlign: 'center' }}>
        <div className="reveal" style={{
          maxWidth: 900, margin: '0 auto', padding: '80px 60px',
          borderRadius: 28, position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(123,47,255,0.2)',
          background: 'linear-gradient(135deg,rgba(123,47,255,0.06),rgba(224,64,251,0.06))',
        }}>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 16, position: 'relative', zIndex: 1 }}>
            {c.ctaTitle}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(200,170,255,0.4)', marginBottom: 36, position: 'relative', zIndex: 1 }}>
            {c.ctaDesc}
          </p>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <PrimaryBtn to="/order">{c.ctaBtn}</PrimaryBtn>
          </div>
        </div>
      </section>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LangContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, toggleLang, c } = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const routes = ['/', '/services', '/portfolio', '/order', '/contact']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 48px', height: '70px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s',
      background: scrolled ? 'rgba(3,1,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(123,47,255,0.12)' : 'none',
      boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
    }}>

      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg,rgba(123,47,255,0.2),rgba(224,64,251,0.2))',
          border: '1px solid rgba(123,47,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 15px rgba(123,47,255,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{
            background: 'linear-gradient(135deg,#7B2FFF,#E040FB,#00D4FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', fontFamily: "'Outfit',sans-serif",
            fontWeight: 900, fontSize: 20,
          }}>A</span>
        </div>
        <div>
          <div style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 900, letterSpacing: 2,
            background: 'linear-gradient(135deg,#7B2FFF,#E040FB,#00D4FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Aramti</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(180,127,255,0.4)', letterSpacing: 2 }}>
            {c.logoSub}
          </div>
        </div>
      </Link>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
        {c.navLinks.map((label, i) => (
          <Link key={i} to={routes[i]}
            style={{
              color: pathname === routes[i] ? 'rgba(200,170,255,0.9)' : 'rgba(200,170,255,0.4)',
              textDecoration: 'none', fontSize: 14, transition: 'color 0.3s',
              borderBottom: pathname === routes[i] ? '1px solid rgba(123,47,255,0.6)' : 'none',
              paddingBottom: 2,
            }}
            onMouseEnter={e => e.target.style.color = 'rgba(200,170,255,0.9)'}
            onMouseLeave={e => e.target.style.color = pathname === routes[i] ? 'rgba(200,170,255,0.9)' : 'rgba(200,170,255,0.4)'}
          >{label}</Link>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Lang toggle */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['fa', 'en'].map(l => (
            <button key={l} onClick={() => toggleLang(l)}
              style={{
                padding: '5px 12px', borderRadius: 100, fontSize: 11, cursor: 'pointer',
                border: '1px solid',
                borderColor: lang === l ? 'rgba(123,47,255,0.5)' : 'rgba(123,47,255,0.2)',
                background: lang === l ? 'rgba(123,47,255,0.15)' : 'transparent',
                color: lang === l ? 'rgba(200,170,255,0.9)' : 'rgba(200,170,255,0.4)',
                fontFamily: "'JetBrains Mono',monospace",
                transition: 'all 0.3s',
              }}
            >{l.toUpperCase()}</button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -2, borderRadius: 100,
            background: 'linear-gradient(135deg,#7B2FFF,#E040FB,#00D4FF,#7B2FFF)',
            backgroundSize: '300% 300%', filter: 'blur(5px)',
            animation: 'rotateBorder 3s linear infinite',
            opacity: 0.6, zIndex: -1,
          }} />
          <Link to="/order">
            <button style={{
              padding: '10px 24px', borderRadius: 100,
              background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
              color: '#fff', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
              boxShadow: '0 0 20px rgba(123,47,255,0.4)',
              transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 35px rgba(123,47,255,0.6)' }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 20px rgba(123,47,255,0.4)' }}
            >{c.navCta}</button>
          </Link>
        </div>

        {/* Mobile menu btn */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
          className="block md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 70, left: 0, right: 0,
          background: 'rgba(3,1,10,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(123,47,255,0.12)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
          zIndex: 999,
        }}>
          {c.navLinks.map((label, i) => (
            <Link key={i} to={routes[i]} onClick={() => setOpen(false)}
              style={{ color: 'rgba(200,170,255,0.7)', textDecoration: 'none', fontSize: 16, padding: '8px 0' }}
            >{label}</Link>
          ))}
          <Link to="/order" onClick={() => setOpen(false)}>
            <button style={{
              width: '100%', padding: '12px', borderRadius: 100,
              background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
              color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer',
            }}>{c.navCta}</button>
          </Link>
        </div>
      )}
    </nav>
  )
}
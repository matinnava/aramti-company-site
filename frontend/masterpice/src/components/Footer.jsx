import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function Footer() {
  const { c } = useLang()

  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      borderTop: '1px solid rgba(123,47,255,0.12)',
      padding: '32px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(3,1,10,0.6)', backdropFilter: 'blur(10px)',
      flexWrap: 'wrap', gap: 16,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: 'linear-gradient(135deg,rgba(123,47,255,0.2),rgba(224,64,251,0.2))',
          border: '1px solid rgba(123,47,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 16,
          }}>A</span>
        </div>
        <div>
          <div style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 900,
            background: 'linear-gradient(135deg,#7B2FFF,#E040FB,#00D4FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Aramti</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: 'rgba(180,127,255,0.3)', letterSpacing: 2 }}>
            {c.logoSub}
          </div>
        </div>
      </Link>

      <span style={{ fontSize: 13, color: 'rgba(200,170,255,0.25)' }}>{c.footerCopy}</span>

      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'rgba(123,47,255,0.3)' }}>
        secure.technologies.init()
      </span>
    </footer>
  )
}
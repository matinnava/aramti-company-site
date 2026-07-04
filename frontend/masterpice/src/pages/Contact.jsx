import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { useLang } from '../context/LangContext'

export default function Contact() {
  const { c } = useLang()
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (!form.full_name || !form.phone || !form.subject || !form.message) {
      toast.error(c.dir === 'rtl' ? 'لطفاً فیلدهای ضروری را پر کنید' : 'Please fill required fields')
      return
    }
    setLoading(true)
    try {
      await api.post('/api/contact/', form)
      toast.success(c.dir === 'rtl' ? 'پیام شما ارسال شد!' : 'Message sent!')
      setForm({ full_name: '', phone: '', email: '', subject: '', message: '' })
    } catch {
      toast.error(c.dir === 'rtl' ? 'خطا در ارسال پیام' : 'Failed to send message')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 10,
    background: 'rgba(10,5,25,0.6)', border: '1px solid rgba(123,47,255,0.12)',
    color: '#F0EEFF', fontSize: 14, outline: 'none', transition: 'all 0.3s',
    fontFamily: 'inherit',
  }

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: 80 }}>
      <section style={{ position: 'relative', zIndex: 2, padding: '80px 48px 120px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            color: '#7B2FFF', letterSpacing: 4, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16,
          }}>
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,#7B2FFF)' }} />
            {c.sectionTags[3]}
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#7B2FFF,transparent)' }} />
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
            {c.sectionTitles[3]}
          </h2>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(10,5,25,0.7)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(123,47,255,0.12)', borderRadius: 24, padding: 48,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* top line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg,transparent,#7B2FFF,#E040FB,transparent)',
            }} />

            {/* Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.nameLabel} *</label>
                <input name="full_name" value={form.full_name} onChange={handle}
                  placeholder={c.namePlaceholder} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.phoneLabel} *</label>
                <input name="phone" value={form.phone} onChange={handle}
                  placeholder={c.phonePlaceholder} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.subjectLabel} *</label>
              <input name="subject" value={form.subject} onChange={handle}
                placeholder={c.subjectPlaceholder} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.msgLabel} *</label>
              <textarea name="message" value={form.message} onChange={handle}
                placeholder={c.msgPlaceholder} rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
              />
            </div>

            {/* Submit */}
            <div style={{ position: 'relative', marginBottom: 32 }}>
              <div style={{
                position: 'absolute', inset: -2, borderRadius: 12,
                background: 'linear-gradient(135deg,#7B2FFF,#E040FB,#00D4FF,#7B2FFF)',
                backgroundSize: '300% 300%', filter: 'blur(5px)',
                animation: 'rotateBorder 3s linear infinite', opacity: 0.5, zIndex: -1,
              }} />
              <button onClick={submit} disabled={loading} style={{
                width: '100%', padding: 15, borderRadius: 12,
                background: loading ? '#555' : 'linear-gradient(135deg,#7B2FFF,#E040FB)',
                color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
              }}>{loading ? '...' : c.sendMsg}</button>
            </div>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {c.contactItems.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: 16,
                  borderRadius: 12, border: '1px solid rgba(123,47,255,0.1)',
                  background: 'rgba(10,5,25,0.4)', transition: 'all 0.3s', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.3)'; e.currentTarget.style.background = 'rgba(123,47,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.1)'; e.currentTarget.style.background = 'rgba(10,5,25,0.4)' }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, fontSize: 18,
                    background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <span style={{ fontSize: 11, color: 'rgba(200,170,255,0.35)', letterSpacing: 1, display: 'block', marginBottom: 2 }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: 'rgba(200,170,255,0.7)' }}>{item.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
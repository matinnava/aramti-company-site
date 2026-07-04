import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../utils/api'
import { useLang } from '../context/LangContext'

export default function Order() {
  const { c } = useLang()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [trackingCode, setTrackingCode] = useState('')
  const [done, setDone] = useState(false)

  const [data, setData] = useState({
    service_type: '', sub_type: '', budget_range: '', deadline: '',
    description: '', full_name: '', phone: '', email: '',
  })

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [c])

  const set = (key, val) => setData(p => ({ ...p, [key]: val }))

  const serviceCodes = ['website', 'mobile', 'ai', 'automation', 'network', 'backend', 'other']

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 10,
    background: 'rgba(10,5,25,0.6)', border: '1px solid rgba(123,47,255,0.12)',
    color: '#F0EEFF', fontSize: 14, outline: 'none', transition: 'all 0.3s',
    fontFamily: 'inherit',
  }

  const submit = async () => {
    if (!data.full_name || !data.phone) {
      toast.error(c.dir === 'rtl' ? 'نام و موبایل ضروری است' : 'Name and phone are required')
      return
    }
    if (!/^09\d{9}$/.test(data.phone)) {
      toast.error(c.dir === 'rtl' ? 'شماره موبایل معتبر نیست' : 'Invalid phone number')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/api/orders/', data)
      setTrackingCode(res.data.tracking_code)
      setDone(true)
    } catch (err) {
      toast.error(c.dir === 'rtl' ? 'خطا در ثبت سفارش' : 'Failed to submit order')
    }
    setLoading(false)
  }

  const StepBtn = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      padding: '20px 12px', borderRadius: 14,
      border: `1px solid ${active ? '#7B2FFF' : 'rgba(123,47,255,0.12)'}`,
      background: active ? 'rgba(123,47,255,0.1)' : 'rgba(10,5,25,0.5)',
      cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      boxShadow: active ? '0 0 20px rgba(123,47,255,0.15)' : 'none',
      transform: active ? 'translateY(-3px)' : 'none',
      color: 'rgba(200,170,255,0.7)', fontSize: 13,
    }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.4)'; e.currentTarget.style.background = 'rgba(123,47,255,0.07)' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.12)'; e.currentTarget.style.background = 'rgba(10,5,25,0.5)' } }}
    >{children}</button>
  )

  const totalSteps = 5

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
            {c.sectionTags[2]}
            <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#7B2FFF,transparent)' }} />
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff' }}>
            {c.sectionTitles[2]}
          </h2>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Progress */}
          {!done && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
              {c.wizardSteps.map((label, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1, position: 'relative' }}>
                  {i < c.wizardSteps.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 16,
                      [c.dir === 'rtl' ? 'right' : 'left']: '50%', [c.dir === 'rtl' ? 'left' : 'right']: '-50%',
                      height: 1, zIndex: -1,
                      background: step > i + 1 ? 'linear-gradient(90deg,#7B2FFF,#E040FB)' : 'rgba(123,47,255,0.12)',
                      transition: 'background 0.5s',
                    }} />
                  )}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontFamily: "'JetBrains Mono',monospace",
                    border: `1px solid ${step >= i + 1 ? '#7B2FFF' : 'rgba(123,47,255,0.12)'}`,
                    background: step > i + 1 ? 'linear-gradient(135deg,#7B2FFF,#E040FB)' : step === i + 1 ? 'rgba(123,47,255,0.15)' : 'rgba(10,5,25,0.7)',
                    color: step >= i + 1 ? '#fff' : 'rgba(200,170,255,0.4)',
                    boxShadow: step === i + 1 ? '0 0 15px rgba(123,47,255,0.3)' : 'none',
                    transition: 'all 0.4s',
                  }}>{i + 1}</div>
                  <span style={{
                    fontSize: 11, whiteSpace: 'nowrap',
                    color: step === i + 1 ? 'rgba(200,170,255,0.8)' : 'rgba(200,170,255,0.35)',
                  }}>{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div style={{
            background: 'rgba(10,5,25,0.7)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(123,47,255,0.12)', borderRadius: 24, padding: 48,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg,transparent,#7B2FFF,#E040FB,transparent)',
            }} />

            {!done ? (
              <>
                {/* Step 1 */}
                {step === 1 && (
                  <div>
                    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#fff' }}>
                      {c.wizardTitle}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 12 }}>
                      {c.stypes.map((label, i) => {
                        const [icon, ...rest] = label.split(' ')
                        return (
                          <StepBtn key={i} active={data.service_type === serviceCodes[i]} onClick={() => set('service_type', serviceCodes[i])}>
                            <span style={{ fontSize: 28 }}>{icon}</span>
                            <span>{rest.join(' ')}</span>
                          </StepBtn>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div>
                    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#fff' }}>
                      {c.descLabel}
                    </h3>
                    <textarea value={data.description} onChange={e => set('description', e.target.value)}
                      placeholder={c.descPlaceholder} rows={6}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
                    />
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div>
                    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#fff' }}>
                      {c.sectionTags[2]}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
                      {c.budgets.map((b, i) => (
                        <StepBtn key={i} active={data.budget_range === b} onClick={() => set('budget_range', b)}>
                          <span>{b}</span>
                        </StepBtn>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                  <div>
                    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#fff' }}>
                      {c.sectionTags[3]}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.nameLabel} *</label>
                        <input value={data.full_name} onChange={e => set('full_name', e.target.value)}
                          placeholder={c.namePlaceholder} style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.phoneLabel} *</label>
                        <input value={data.phone} onChange={e => set('phone', e.target.value)}
                          placeholder={c.phonePlaceholder} style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                          onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 13, color: 'rgba(200,170,255,0.5)', display: 'block', marginBottom: 8 }}>{c.emailLabel}</label>
                      <input value={data.email} onChange={e => set('email', e.target.value)}
                        placeholder={c.emailPlaceholder} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(123,47,255,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(123,47,255,0.12)'}
                      />
                    </div>
                  </div>
                )}

                {/* Step 5 */}
                {step === 5 && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
                    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                      {c.confirmTitle}
                    </h3>
                    <p style={{ color: 'rgba(200,170,255,0.5)', fontSize: 14, lineHeight: 1.8 }}>
                      {c.confirmDesc}
                    </p>
                  </div>
                )}

                {/* Nav buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                  <button onClick={() => setStep(s => Math.max(1, s - 1))}
                    style={{
                      padding: '12px 28px', borderRadius: 100,
                      border: '1px solid rgba(123,47,255,0.12)', background: 'transparent',
                      color: 'rgba(200,170,255,0.5)', fontSize: 14, cursor: 'pointer', transition: 'all 0.3s',
                      visibility: step > 1 ? 'visible' : 'hidden',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = 'rgba(123,47,255,0.4)'; e.target.style.color = 'rgba(200,170,255,0.8)' }}
                    onMouseLeave={e => { e.target.style.borderColor = 'rgba(123,47,255,0.12)'; e.target.style.color = 'rgba(200,170,255,0.5)' }}
                  >{c.prev}</button>

                  <button
                    disabled={(step === 1 && !data.service_type) || loading}
                    onClick={() => step < totalSteps ? setStep(s => s + 1) : submit()}
                    style={{
                      padding: '12px 28px', borderRadius: 100,
                      background: ((step === 1 && !data.service_type) || loading) ? '#444' : 'linear-gradient(135deg,#7B2FFF,#E040FB)',
                      color: '#fff', fontSize: 14, fontWeight: 700, border: 'none',
                      cursor: ((step === 1 && !data.service_type) || loading) ? 'not-allowed' : 'pointer',
                      boxShadow: ((step === 1 && !data.service_type) || loading) ? 'none' : '0 0 20px rgba(123,47,255,0.3)',
                      transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { if (!e.target.disabled) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 35px rgba(123,47,255,0.5)' } }}
                    onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; if (!e.target.disabled) e.target.style.boxShadow = '0 0 20px rgba(123,47,255,0.3)' }}
                  >{loading ? '...' : step === totalSteps ? c.submit : c.next}</button>
                </div>
              </>
            ) : (
              /* Success */
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                <h3 style={{
                  fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 12,
                  background: 'linear-gradient(135deg,#7B2FFF,#E040FB)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{c.successTitle}</h3>
                <p style={{ color: 'rgba(200,170,255,0.5)', fontSize: 14, marginBottom: 20 }}>{c.successDesc}</p>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 28, color: '#00D4FF',
                  letterSpacing: 4, textShadow: '0 0 20px rgba(0,212,255,0.4)',
                }}>#{trackingCode}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
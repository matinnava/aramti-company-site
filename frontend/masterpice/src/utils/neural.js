export function initNeuralBackground(canvas) {
    const ctx = canvas.getContext('2d')
    let W, H, nodes = [], particles = [], signals = []
    let waveTimer = 0
    let animId
  
    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      buildNodes()
    }
  
    function buildNodes() {
      nodes = []
      const layerCount = 6
      const perLayer = [1, 3, 5, 5, 3, 1]
      const colors = ['123,47,255','180,64,251','0,212,255','123,47,255','224,64,251','0,212,255']
      for (let l = 0; l < layerCount; l++) {
        for (let i = 0; i < perLayer[l]; i++) {
          nodes.push({
            x: W * (0.08 + l * (0.84 / (layerCount - 1))),
            y: H * (0.15 + (i + 0.5) * (0.7 / perLayer[l])),
            l, i,
            activation: Math.random(),
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.015 + 0.008,
            timer: 0,
            color: colors[l],
            r: l === 0 || l === layerCount - 1 ? 6 : 4,
          })
        }
      }
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
        r: Math.random() * .8 + .2,
        col: Math.random() > .5 ? '123,47,255' : '0,212,255',
        a: Math.random() * .4 + .1,
        pulse: Math.random() * Math.PI * 2,
      }))
    }
  
    function addSignal(from, to) {
      signals.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.006 })
    }
  
    function triggerWave() {
      const layerCount = 6
      for (let l = 0; l < layerCount - 1; l++) {
        const from = nodes.filter(n => n.l === l)
        const to = nodes.filter(n => n.l === l + 1)
        from.forEach(f => {
          to.forEach(t2 => {
            setTimeout(() => { f.timer = 1; addSignal(f, t2) }, l * 350)
            setTimeout(() => t2.timer = 1, (l + 1) * 350)
          })
        })
      }
    }
  
    function draw() {
      ctx.clearRect(0, 0, W, H)
  
      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].l !== nodes[i].l + 1) continue
          const act = (nodes[i].activation + nodes[j].activation) / 2
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(123,47,255,${act * 0.12})`
          ctx.lineWidth = act * 0.8 + 0.2
          ctx.stroke()
        }
      }
  
      // signals
      for (let si = signals.length - 1; si >= 0; si--) {
        const s = signals[si]
        s.t += s.speed
        if (s.t >= 1) { signals.splice(si, 1); continue }
        const px = s.from.x + (s.to.x - s.from.x) * s.t
        const py = s.from.y + (s.to.y - s.from.y) * s.t
        for (let tr = 0; tr < 5; tr++) {
          const tt = Math.max(0, s.t - tr * 0.025)
          const tx = s.from.x + (s.to.x - s.from.x) * tt
          const ty = s.from.y + (s.to.y - s.from.y) * tt
          ctx.beginPath(); ctx.arc(tx, ty, 2 - tr * .3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(224,64,251,${(0.8 - tr * .15) * (1 - s.t)})`; ctx.fill()
        }
        ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,200,255,0.9)'; ctx.fill()
        const g = ctx.createRadialGradient(px, py, 0, px, py, 10)
        g.addColorStop(0, 'rgba(224,64,251,0.5)')
        g.addColorStop(1, 'rgba(224,64,251,0)')
        ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      }
  
      // nodes
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed
        n.activation = 0.3 + 0.4 * Math.sin(n.pulse + n.l * 0.5)
        if (n.timer > 0) n.timer -= 0.018
        const glow = n.timer > 0 ? n.timer : 0
        const dispR = n.r + glow * 10
        const og = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, dispR * 3)
        og.addColorStop(0, `rgba(${n.color},${0.15 + glow * 0.4})`)
        og.addColorStop(1, `rgba(${n.color},0)`)
        ctx.beginPath(); ctx.arc(n.x, n.y, dispR * 3, 0, Math.PI * 2)
        ctx.fillStyle = og; ctx.fill()
        const ig = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, dispR)
        ig.addColorStop(0, 'rgba(255,255,255,0.9)')
        ig.addColorStop(0.4, `rgba(${n.color},0.8)`)
        ig.addColorStop(1, `rgba(${n.color},0)`)
        ctx.beginPath(); ctx.arc(n.x, n.y, dispR, 0, Math.PI * 2)
        ctx.fillStyle = ig; ctx.fill()
      })
  
      // particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += .02
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        const a = p.a * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.col},${a})`; ctx.fill()
      })
  
      waveTimer++
      if (waveTimer > 200) { waveTimer = 0; triggerWave() }
      animId = requestAnimationFrame(draw)
    }
  
    resize()
    window.addEventListener('resize', resize)
    draw()
    setTimeout(triggerWave, 800)
  
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }
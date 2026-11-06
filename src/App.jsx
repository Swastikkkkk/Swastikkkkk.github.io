import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'
import { FiArrowUpRight, FiPlus, FiMinus, FiMail } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { links, projects, more, experience, journey, wins, winsCount } from './data'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

const pad = (n) => String(n).padStart(2, '0')

function Ext({ href, children, className = '' }) {
  return (
    <a className={`ext ${className}`} href={href} target="_blank" rel="noreferrer">
      {children}
      <FiArrowUpRight aria-hidden />
    </a>
  )
}

const MESH_NODES = [[90, 70], [210, 50], [320, 110], [150, 170], [270, 210], [60, 230], [360, 240]]
const MESH_EDGES = [[0, 1], [1, 2], [0, 3], [1, 3], [3, 4], [2, 4], [3, 5], [4, 6], [2, 6]]
const MESH_ROUTES = [[5, 3, 1, 2], [0, 3, 4, 6], [6, 2, 1, 0], [5, 3, 4, 2]]

function MeshArt() {
  return (
    <svg viewBox="0 0 420 300" className="art" aria-hidden>
      {MESH_EDGES.map(([a, b], i) => (
        <line key={i} x1={MESH_NODES[a][0]} y1={MESH_NODES[a][1]} x2={MESH_NODES[b][0]} y2={MESH_NODES[b][1]} className="art-line" />
      ))}
      {MESH_NODES.map(([x, y], i) => (
        <g key={i} transform={`translate(${x - 11} ${y - 18})`}>
          <rect width="22" height="36" rx="5" className="art-node" data-node={i} />
          <rect x="8" y="30" width="6" height="2" rx="1" className="art-dot" />
        </g>
      ))}
      <circle r="4.5" className="art-packet" cx={MESH_NODES[5][0]} cy={MESH_NODES[5][1]} />
      <text x="24" y="285" className="art-cap">NO INTERNET / MULTI-HOP</text>
    </svg>
  )
}

function meshTimeline(el) {
  const packet = el.querySelector('.art-packet')
  const nodes = el.querySelectorAll('.art-node')
  const tl = gsap.timeline({ repeat: -1, paused: true })
  tl.to(el.querySelectorAll('.art-line'), { strokeDashoffset: -14, duration: 0.6, ease: 'none', repeat: -1 }, 0)
  MESH_ROUTES.forEach((route) => {
    const [sx, sy] = MESH_NODES[route[0]]
    tl.set(packet, { attr: { cx: sx, cy: sy }, opacity: 1 })
    route.forEach((n, k) => {
      if (k === 0) return
      const [x, y] = MESH_NODES[n]
      tl.to(packet, { attr: { cx: x, cy: y }, duration: 0.55, ease: 'power2.inOut' })
      tl.to(nodes[n], { fill: 'var(--accent)', stroke: 'var(--accent)', duration: 0.15, yoyo: true, repeat: 1 }, '<0.45')
    })
    tl.to(packet, { opacity: 0, duration: 0.25 }).to({}, { duration: 0.35 })
  })
  return tl
}

/* Small looping motif per project, drawn in the card footer. */
function Motif({ type }) {
  const common = { viewBox: '0 0 96 24', className: 'motif', 'aria-hidden': true }
  if (type === 'mesh') return (
    <svg {...common}>
      <path d="M8 12 L34 6 L60 16 L88 10" className="m-line" />
      {[[8, 12], [34, 6], [60, 16], [88, 10]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" className="m-node" />)}
      <circle cx="8" cy="12" r="2.2" className="m-dot" />
    </svg>
  )
  if (type === 'wave') return (
    <svg {...common}>
      <path d="M4 12 C14 2, 24 2, 34 12 S54 22, 64 12 S84 2, 92 12" className="m-draw" pathLength="1" />
      <circle cx="4" cy="12" r="2.2" className="m-dot" />
    </svg>
  )
  if (type === 'score') return (
    <svg {...common}>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={8 + i * 17} y="4" width="9" height="16" className="m-bar" />)}
    </svg>
  )
  if (type === 'track') return (
    <svg {...common}>
      <path id="m-track" d="M14 12 C14 3, 44 3, 52 9 C60 15, 82 3, 84 12 C86 21, 52 21, 44 15 C36 9, 14 21, 14 12 Z" className="m-line" />
      <circle r="2.4" className="m-dot m-car" />
    </svg>
  )
  if (type === 'river') return (
    <svg {...common}>
      <g className="m-wave">
        <path d="M-48 14 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" className="m-line" />
      </g>
      <line x1="4" x2="92" y1="20" y2="20" className="m-level" />
    </svg>
  )
  if (type === 'scan') return (
    <svg {...common}>
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={6 + i * 15} y="7" width="10" height="10" rx="2" className="m-node m-ext" />)}
      <line x1="2" x2="2" y1="3" y2="21" className="m-scan" />
    </svg>
  )
  return null
}

function motifTimeline(el, type) {
  const q = gsap.utils.selector(el)
  const tl = gsap.timeline({ repeat: -1, paused: true })
  if (type === 'mesh') {
    const pts = [[8, 12], [34, 6], [60, 16], [88, 10]]
    pts.slice(1).forEach(([x, y], i) => {
      tl.to(q('.m-dot'), { attr: { cx: x, cy: y }, duration: 0.5, ease: 'power2.inOut' })
      tl.to(q('.m-node')[i + 1], { fill: 'var(--accent)', duration: 0.12, yoyo: true, repeat: 1 }, '<0.4')
    })
    tl.set(q('.m-dot'), { attr: { cx: 8, cy: 12 } }, '+=0.4')
  } else if (type === 'wave') {
    tl.fromTo(q('.m-draw'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power1.inOut' })
      .to(q('.m-dot'), { motionPath: { path: q('.m-draw')[0], align: q('.m-draw')[0], alignOrigin: [0.5, 0.5] }, duration: 1.6, ease: 'power1.inOut' }, 0)
      .to(q('.m-draw'), { opacity: 0, duration: 0.4 }, '+=0.5')
      .set(q('.m-draw'), { opacity: 1, strokeDashoffset: 1 })
  } else if (type === 'score') {
    tl.fromTo(q('.m-bar'), { scaleY: 0.15, transformOrigin: '50% 100%' }, { scaleY: (i) => [0.6, 0.9, 0.45, 1, 0.75][i], duration: 0.7, ease: 'power3.out', stagger: 0.1 })
      .to(q('.m-bar'), { scaleY: 0.15, duration: 0.5, ease: 'power2.in', stagger: 0.05 }, '+=1')
  } else if (type === 'track') {
    tl.to(q('.m-car'), { motionPath: { path: q('#m-track')[0], align: q('#m-track')[0], alignOrigin: [0.5, 0.5] }, duration: 2.6, ease: 'none' })
  } else if (type === 'river') {
    tl.fromTo(q('.m-wave'), { x: 0 }, { x: 24, duration: 1.2, ease: 'none', repeat: 3 }, 0)
      .fromTo(q('.m-wave'), { y: 4 }, { y: -4, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
  } else if (type === 'scan') {
    tl.fromTo(q('.m-scan'), { x: 0 }, { x: 92, duration: 1.8, ease: 'none' })
    q('.m-ext').forEach((r, i) => {
      tl.to(r, { fill: i === 2 || i === 4 ? 'var(--accent)' : 'var(--paper)', duration: 0.15 }, 0.15 + i * 0.27)
    })
    tl.to(q('.m-ext'), { fill: 'var(--paper)', duration: 0.3 }, '+=0.6')
  }
  return tl
}

function JourneyGraph() {
  const points = [
    [100, 150], [290, 118], [480, 92], [670, 62], [860, 30],
  ]
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')
  return (
    <div className="journey-graph">
      <svg viewBox="0 0 950 230" role="img" aria-label="Education and career journey timeline">
        <defs>
          <linearGradient id="journey-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity=".24" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => <path key={i} className="journey-grid" d={`M 48 ${55 + i * 42} L 900 ${25 + i * 42}`} />)}
        <path className="journey-area" d={`${line} L 880 205 L 70 205 Z`} />
        <path className="journey-shadow" d={line} />
        <path className="journey-line" d={line} pathLength="1" />
        {points.map(([x, y], i) => <circle key={i} className="journey-point" cx={x} cy={y} r="5" />)}
      </svg>
      <div className="journey-labels">
        {journey.map((item) => <div className={`journey-label journey-${item.type}`} key={item.year}><span>{item.year}</span><strong>{item.title}</strong><small>{item.detail}</small></div>)}
      </div>
    </div>
  )
}
function Case({ p }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useGSAP(() => {
    const el = ref.current
    const loops = []
    const motif = el.querySelector('.motif')
    if (motif) loops.push(motifTimeline(motif, p.motif))
    const art = el.querySelector('.art')
    if (art) loops.push(meshTimeline(art))

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } })
      tl.fromTo(el.querySelector('.case-frame'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' })
        .from(el.querySelector('.case-zoom'), { scale: 1.25, duration: 1.4, ease: 'expo.out' }, 0)
        .from(el.querySelectorAll('.case-top, .case-bottom'), { opacity: 0, duration: 0.6 }, 0.3)
        .from(el.querySelectorAll('.case-body > *'), { opacity: 0, y: 22, duration: 0.8, ease: 'power3.out', stagger: 0.07 }, 0.15)

      const zoom = gsap.quickTo(el.querySelector('.case-zoom'), 'scale', { duration: 0.6, ease: 'power3.out' })
      const media = el.querySelector('.case-media')
      const enter = () => zoom(1.04)
      const leave = () => zoom(1)
      media.addEventListener('mouseenter', enter)
      media.addEventListener('mouseleave', leave)
      return () => { media.removeEventListener('mouseenter', enter); media.removeEventListener('mouseleave', leave) }
    })

    ScrollTrigger.create({
      trigger: el, start: 'top bottom', end: 'bottom top',
      onToggle: (self) => loops.forEach((t) => (self.isActive ? t.play() : t.pause())),
    })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) loops.forEach((t) => t.progress(0.5).pause())
  }, { scope: ref })

  const { built } = p
  return (
    <article className="case" ref={ref}>
      <div className="case-media">
        <div className="case-top"><span>{p.kind}</span><span>{p.year}</span></div>
        <div className="case-frame">
          <div className="case-zoom">
            {p.img ? <img src={p.img} alt={`${p.name} screenshot`} loading="lazy" /> : <MeshArt />}
          </div>
        </div>
        <div className="case-bottom">
          <span>{p.stack[0]}</span>
          <Motif type={p.motif} />
        </div>
      </div>
      <div className="case-body">
        <div className="case-head">
          <h3>{p.name}</h3>
          <a className="case-arrow" href={p.live || p.code} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
            <FiArrowUpRight />
          </a>
        </div>
        {built && (
          <p className="built">
            <span className="built-k">Built for</span>
            {built.href
              ? <a href={built.href} target="_blank" rel="noreferrer">{built.label} <FiArrowUpRight aria-hidden /></a>
              : <span className="built-v">{built.label}</span>}
            {built.note && <span className="built-note">{built.note}</span>}
          </p>
        )}
        <p className="desc">{p.desc}</p>
        <button className={`eng ${open ? 'on' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}>
          <span>The engineering</span>
          {open ? <FiMinus /> : <FiPlus />}
        </button>
        <div className="eng-body" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
          <p>{p.engineering}</p>
        </div>
        <ul className="tags">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="case-links">
          {p.live && <Ext href={p.live}>Live</Ext>}
          <Ext href={p.code}>Source</Ext>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const root = useRef(null)
  const nameRef = useRef(null)
  const casesRef = useRef(null)

  useEffect(() => {
    const rail = casesRef.current
    if (!rail || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame
    let paused = false
    const step = 0.35
    const tick = () => {
      if (!paused) {
        rail.scrollLeft += step
        const first = rail.querySelector('.case')
        if (first && rail.scrollLeft >= first.offsetWidth + 28) rail.scrollLeft -= first.offsetWidth + 28
      }
      frame = requestAnimationFrame(tick)
    }
    const pause = () => { paused = true }
    const resume = () => { paused = false }
    const move = (direction) => {
      paused = true
      rail.scrollBy({ left: direction * (rail.clientWidth * 0.82), behavior: 'smooth' })
      window.setTimeout(resume, 1800)
    }
    rail.addEventListener('mouseenter', pause)
    rail.addEventListener('mouseleave', resume)
    rail.addEventListener('focusin', pause)
    rail.addEventListener('focusout', resume)
    rail.parentElement.querySelector('.cases-prev')?.addEventListener('click', () => move(-1))
    rail.parentElement.querySelector('.cases-next')?.addEventListener('click', () => move(1))
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      rail.removeEventListener('mouseenter', pause)
      rail.removeEventListener('mouseleave', resume)
      rail.removeEventListener('focusin', pause)
      rail.removeEventListener('focusout', resume)
    }
  }, [])

  // Size the name so it spans the full content width on one line.
  useLayoutEffect(() => {
    const h = nameRef.current
    const line = h.querySelector('.hero-line')
    const fit = () => {
      h.style.fontSize = '100px'
      const w = line.scrollWidth
      if (w) h.style.fontSize = `${Math.floor((100 * h.clientWidth) / w) - 1}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(h)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-line', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.08 })
      gsap.from('.hero-fade', { opacity: 0, y: 14, duration: 0.9, ease: 'power3.out', delay: 0.35, stagger: 0.06 })
      gsap.from('.journey-line', { strokeDashoffset: 1, duration: 2.2, ease: 'power3.inOut', scrollTrigger: { trigger: '.journey-graph', start: 'top 80%', once: true } })
      gsap.from('.journey-point', { scale: 0, transformOrigin: 'center', duration: 0.45, stagger: 0.16, ease: 'back.out(2)', scrollTrigger: { trigger: '.journey-graph', start: 'top 80%', once: true } })

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 28, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <header className="nav">
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <h1 aria-label="Swastik Dutt" ref={nameRef}>
            <span className="mask"><span className="hero-line">Swastik Dutt</span></span>
          </h1>
          <div className="hero-row">
            <div className="hero-main">
              <p className="role hero-fade">Incoming SDE at JPMorgan Chase</p>
              <p className="intro hero-fade">
                I build products end to end: web apps, the services behind them, iOS apps, and the AI that makes them useful.
                Final-year CS at Manipal University Jaipur.
              </p>
              <div className="cta hero-fade">
                <a className="btn solid" href="#work">View the work</a>
                <a className="btn" href={`mailto:${links.email}`}><FiMail /> Email me</a>
              </div>
              <div className="socials hero-fade">
                <a href={links.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
                <a href={links.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
                <a href={links.x} target="_blank" rel="noreferrer"><FaXTwitter /> X</a>
              </div>
            </div>
            <aside className="now hero-fade">
              <div className="now-top"><span>Now</span><span>2026</span></div>
              <dl>
                <div><dt>Studying</dt><dd>Final-year CS, Manipal University Jaipur</dd></div>
                <div><dt>Next</dt><dd>SDE at JPMorgan Chase</dd></div>
                <div><dt>Building</dt><dd><a href="https://www.sketchracer.com" target="_blank" rel="noreferrer">SketchRacer</a>, a driving game for the browser</dd></div>
                <div><dt>Based in</dt><dd>Noida, India</dd></div>
              </dl>
            </aside>
          </div>
        </section>


        <section id="work" className="wrap section">
          <h2 className="reveal">Work</h2>
          <div className="cases-shell">
             <button className="cases-prev" type="button" aria-label="Previous project">←</button>
             <div className="cases" ref={casesRef}>
               {projects.map((p) => <Case p={p} key={p.name} />)}
             </div>
             <button className="cases-next" type="button" aria-label="Next project">→</button>
           </div>
          <div className="more reveal">
            <span className="label">Also built</span>
            <div className="more-grid">
              {more.map((m) => (
                <a key={m.name} href={m.href} target="_blank" rel="noreferrer" className="more-item">
                  <strong>{m.name} <FiArrowUpRight /></strong>
                  <span className="muted">{m.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="wrap section">
          <h2 className="reveal">Experience</h2>
           <JourneyGraph />
          <ul className="rows">
            {experience.map((e) => (
              <li className="row reveal" key={e.role}>
                <span className="when">{e.when}</span>
                <div>
                  <strong>{e.org}</strong>
                  <span className="muted">{e.role}</span>
                </div>
                <p className="muted note">{e.note}</p>
              </li>
            ))}
          </ul>

          <div className="wins-head reveal">
            <h2 className="sub">Wins</h2>
            <p className="wins-count"><strong>{winsCount}</strong> hackathon wins. The ones I'm proudest of:</p>
          </div>
          <ul className="rows">
            {wins.map((w) => (
              <li className="row reveal" key={w.what}>
                <span className="when">{w.what} <em>{w.year}</em></span>
                <div><strong>{w.built}</strong></div>
                <p className="muted note">{w.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="wrap section contact">
          <h2 className="reveal">Say hello</h2>
          <a className="mail reveal" href={`mailto:${links.email}`}>{links.email}</a>
          <div className="socials reveal">
            <a href={links.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
            <a href={links.x} target="_blank" rel="noreferrer"><FaXTwitter /> X</a>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>Noida, India</span>
      </footer>
    </div>
  )
}

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FiArrowUpRight, FiChevronDown, FiCopy, FiCheck } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { links, highlights, projects, more, experience, wins } from './data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const roles = ['web apps', 'iOS apps', 'AI agents', 'browser games']

function Socials() {
  return (
    <div className="socials">
      <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
      <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
      <a href={links.x} target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
    </div>
  )
}

function MeshArt() {
  const nodes = [[90, 80], [210, 55], [330, 105], [160, 170], [280, 205], [70, 225], [360, 235]]
  const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [3, 4], [2, 4], [3, 5], [4, 6], [2, 6]]
  return (
    <svg viewBox="0 0 420 280" className="mesh" aria-hidden>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
      ))}
      {nodes.map(([x, y], i) => (
        <rect key={i} x={x - 10} y={y - 17} width="20" height="34" rx="6" className={i === 3 ? 'hot' : ''} />
      ))}
    </svg>
  )
}

function Card({ p, size }) {
  const [open, setOpen] = useState(false)
  return (
    <article className={`card ${size} reveal`}>
      <a className="card-media" href={p.live || p.code} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
        {p.img ? <img src={p.img} alt="" loading="lazy" /> : <MeshArt />}
        <span className="open"><FiArrowUpRight /></span>
      </a>
      <div className="card-body">
        <div className="card-meta">
          <span>{p.kind}</span>
          {p.award && <span className="badge">{p.award}</span>}
        </div>
        <h3>{p.name}</h3>
        <p className="muted">{p.desc}</p>
        <div className="card-foot">
          <button className={`how ${open ? 'on' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}>
            How it works <FiChevronDown />
          </button>
          <div className="card-links">
            {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live</a>}
            <a href={p.code} target="_blank" rel="noreferrer">Code</a>
          </div>
        </div>
        <div className="how-body" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
          <div>
            <p>{p.engineering}</p>
            <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-in', { opacity: 0, y: 18, duration: 0.8, stagger: 0.07 })
        .from('.stack', { opacity: 0, y: 40, duration: 1 }, 0.15)

      // rotating role word
      const words = gsap.utils.toArray('.role-word')
      const roll = gsap.timeline({ repeat: -1 })
      words.forEach((w, i) => {
        roll.set(words, { yPercent: 110, opacity: 0 }, i === 0 ? 0 : undefined)
        roll.to(w, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        roll.to(w, { yPercent: -110, opacity: 0, duration: 0.45, ease: 'power3.in' }, '+=1.6')
      })

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.role-word', { opacity: 0 })
      gsap.set('.role-word:first-child', { opacity: 1, yPercent: 0 })
    })
  }, { scope: root })

  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${links.email}` }
  }

  const sizes = ['wide', 'tall', 'half', 'half', 'third', 'third']

  return (
    <div ref={root}>
      <header className="nav">
        <a href="#top" className="logo">s<span>.</span></a>
        <nav>
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-text">
            <span className="pill hero-in"><i /> Incoming SDE at JPMorgan Chase</span>
            <h1 className="hero-in">Swastik Dutt</h1>
            <p className="lede hero-in">
              I build{' '}
              <span className="roles" aria-label={roles.join(', ')}>
                {roles.map((r) => <span key={r} className="role-word">{r}</span>)}
              </span>
              <br />from the first commit to the deploy.
            </p>
            <p className="muted hero-in">Final-year CS at Manipal University Jaipur. Interned on iOS Payments at JPMorgan Chase.</p>
            <div className="hero-cta hero-in">
              <a className="btn primary" href="#work">See my work</a>
              <a className="btn" href={`mailto:${links.email}`}>Get in touch</a>
              <Socials />
            </div>
          </div>
          <a className="stack" href="#work" aria-label="See my work">
            <img src="/work/jalnetra.jpg" alt="" />
            <img src="/work/chatsnitch.jpg" alt="" />
            <img src="/work/sketchracer.jpg" alt="" />
          </a>
        </section>

        <section className="wrap badges reveal">
          {highlights.map((h) => (
            <div className="badge-card" key={h.title}>
              <span className="muted small">{h.k === 'Next' ? 'Up next' : 'Won'}</span>
              <strong>{h.title}</strong>
              <span className="muted small">{h.sub}</span>
            </div>
          ))}
        </section>

        <section id="work" className="wrap section">
          <div className="section-head reveal">
            <h2>Selected work</h2>
            <p className="muted">Things I've shipped. Click any card to open it, or see how it works.</p>
          </div>
          <div className="bento">
            {projects.map((p, i) => <Card key={p.name} p={p} size={sizes[i]} />)}
          </div>
          <div className="also reveal">
            <span className="muted small">Also built</span>
            {more.map((m) => (
              <a key={m.name} href={m.href} target="_blank" rel="noreferrer" title={m.desc}>
                {m.name} <FiArrowUpRight />
              </a>
            ))}
          </div>
        </section>

        <section id="journey" className="wrap section two">
          <div>
            <div className="section-head reveal"><h2>Journey</h2></div>
            <ol className="timeline">
              {experience.map((e) => (
                <li key={e.role} className="reveal">
                  <span className="dot" />
                  <span className="muted small">{e.when}</span>
                  <strong>{e.org}</strong>
                  <span>{e.role}</span>
                  <p className="muted">{e.note}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="section-head reveal"><h2>Wins</h2></div>
            <div className="wins">
              {wins.map((w) => (
                <div className="win reveal" key={w.what}>
                  <span className="win-result">{w.result}</span>
                  <strong>{w.what}</strong>
                  <span className="muted small">{w.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="wrap section">
          <div className="contact reveal">
            <h2>Let's build something.</h2>
            <p className="muted">Open to interesting problems, collaborations and a good chat.</p>
            <div className="contact-row">
              <button className="btn primary" onClick={copy}>
                {copied ? <><FiCheck /> Copied</> : <><FiCopy /> {links.email}</>}
              </button>
              <Socials />
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>© 2026 Swastik Dutt</span>
        <span>Noida, India</span>
      </footer>
    </div>
  )
}

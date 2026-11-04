import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FiArrowUpRight, FiPlus, FiMinus, FiMail } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { links, highlights, projects, more, experience, wins, winsCount } from './data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const pad = (n) => String(n).padStart(2, '0')

function Ext({ href, children, className = '' }) {
  return (
    <a className={`ext ${className}`} href={href} target="_blank" rel="noreferrer">
      {children}
      <FiArrowUpRight aria-hidden />
    </a>
  )
}

function MeshArt() {
  const nodes = [[90, 70], [210, 50], [320, 110], [150, 170], [270, 210], [60, 230], [360, 240]]
  const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [3, 4], [2, 4], [3, 5], [4, 6], [2, 6]]
  return (
    <svg viewBox="0 0 420 300" className="art" aria-hidden>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="art-line" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} transform={`translate(${x - 11} ${y - 18})`}>
          <rect width="22" height="36" rx="5" className={i === 3 ? 'art-node hot' : 'art-node'} />
          <rect x="8" y="30" width="6" height="2" rx="1" className="art-dot" />
        </g>
      ))}
      <text x="24" y="285" className="art-cap">NO INTERNET / MULTI-HOP</text>
    </svg>
  )
}

function Case({ p, i }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="case reveal">
      <div className="case-media">
        <div className="case-top"><span>Case {pad(i + 1)}</span><span>{p.year}</span></div>
        {p.img ? <img src={p.img} alt={`${p.name} screenshot`} loading="lazy" /> : <MeshArt />}
        <div className="case-bottom">{p.kind}</div>
      </div>
      <div className="case-body">
        <div className="case-head">
          <h3>{p.name}</h3>
          <a className="case-arrow" href={p.live || p.code} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
            <FiArrowUpRight />
          </a>
        </div>
        {p.award && <p className="award">{p.award}</p>}
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

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-line', { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.08 })
      gsap.from('.hero-fade', { opacity: 0, y: 14, duration: 0.9, ease: 'power3.out', delay: 0.35, stagger: 0.06 })
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
        <a href="#top" className="logo">swastik<span>.</span></a>
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-main">
          <h1 aria-label="Swastik Dutt">
            <span className="mask"><span className="hero-line">Swastik</span></span>
            <span className="mask"><span className="hero-line">Dutt</span></span>
          </h1>
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
        </section>

        <section className="wrap">
          <div className="strip">
            {highlights.map((h, i) => (
              <div className="strip-item reveal" key={h.title}>
                <span className="num">{pad(i + 1)}</span>
                <div>
                  <span className="kicker">{h.k}</span>
                  <strong>{h.title}</strong>
                  <span className="muted">{h.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="wrap section">
          <h2 className="reveal">Work<span>.</span></h2>
          <div className="cases">
            {projects.map((p, i) => <Case p={p} i={i} key={p.name} />)}
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
          <h2 className="reveal">Experience<span>.</span></h2>
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
            <h2 className="sub">Wins<span>.</span></h2>
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
          <h2 className="reveal">Say hello<span>.</span></h2>
          <a className="mail reveal" href={`mailto:${links.email}`}>{links.email}</a>
          <div className="socials reveal">
            <a href={links.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
            <a href={links.x} target="_blank" rel="noreferrer"><FaXTwitter /> X</a>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>Swastik Dutt</span>
        <span>Noida, India</span>
      </footer>
    </div>
  )
}

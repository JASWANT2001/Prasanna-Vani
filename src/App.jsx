import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── hooks ── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return pct
}

/* ── data ── */
const papers = [
  { year: '2024', title: 'Ultrasound-Guided Genicular Nerve Block in Chronic Knee Osteoarthritis', meta: 'ISSPCON Annual Conference · Indian Society for the Study of Pain', tag: 'Podium' },
  { year: '2023', title: 'Pulsed Radiofrequency for Post-Herpetic Neuralgia: A Case Series', meta: 'World Institute of Pain – Regional Meeting', tag: 'Oral' },
  { year: '2023', title: 'Transforaminal Epidural Steroid Injections in Lumbar Radiculopathy', meta: 'Indian Journal of Pain · Original Research', tag: 'Published' },
  { year: '2022', title: 'Cervical Facet Joint Interventions: Outcomes at Twelve Months', meta: 'South Asian Pain Congress', tag: 'Poster' },
  { year: '2021', title: 'Multimodal Approach to Cancer Pain in a Tertiary Care Setting', meta: 'Indian Association of Palliative Care – National Conference', tag: 'Oral' },
  { year: '2020', title: 'Stellate Ganglion Block for Complex Regional Pain Syndrome', meta: 'Asia Pacific Pain Symposium', tag: 'Podium' },
]

const awards = [
  { roman: 'i.', title: 'Best Paper Award', body: 'Recognised for outstanding clinical research presented at the ISSPCON Annual Conference.', year: '2024' },
  { roman: 'ii.', title: 'Young Pain Physician of the Year', body: 'Awarded by the Indian Society for the Study of Pain for contributions to interventional practice.', year: '2023' },
  { roman: 'iii.', title: 'Excellence in Patient Care', body: 'Hospital-wide recognition for consistently high patient satisfaction and outcomes.', year: '2022' },
  { roman: 'iv.', title: 'Travel Fellowship', body: 'Awarded to attend the World Institute of Pain (WIP) advanced training programme.', year: '2021' },
  { roman: 'v.', title: 'Best Poster Presentation', body: 'Asia Pacific Pain Symposium – research on stellate ganglion interventions in CRPS.', year: '2020' },
]

const memberships = [
  { mark: 'α', abbr: 'ISSP', full: 'Indian Society for the Study of Pain – Life Member' },
  { mark: 'β', abbr: 'WIP', full: 'World Institute of Pain – Certified FIPP' },
  { mark: 'γ', abbr: 'IASP', full: 'International Association for the Study of Pain' },
  { mark: 'δ', abbr: 'IMA', full: 'Indian Medical Association – Active Member' },
  { mark: 'ε', abbr: 'IAPC', full: 'Indian Association of Palliative Care' },
  { mark: 'ζ', abbr: 'SPI', full: 'Spine Society of India – Associate Member' },
]

const partners = [
  { n: '→ 01', title: 'Referring Physicians', body: 'Refer patients with complex pain presentations and receive structured follow-up reports. We respect the relationship between you and your patient.' },
  { n: '→ 02', title: 'Hospitals & Clinics', body: 'Visiting consultant arrangements, multidisciplinary pain clinics, and shared procedural protocols. We bring the practice; you bring the patients.' },
  { n: '→ 03', title: 'Corporate & Insurance', body: 'Employee wellness, structured back-pain programmes, and second-opinion services for insurers. Better outcomes, fewer days lost.' },
  { n: '→ 04', title: 'NGOs & Palliative Care', body: 'Pro-bono cancer pain clinics, training for community health workers, and access programmes for under-served patients.' },
  { n: '→ 05', title: 'Academic Institutions', body: 'Guest lectures, clinical observership, and joint research projects in interventional pain medicine and outcomes tracking.' },
  { n: '→ 06', title: 'Media & Public Education', body: 'Conversations about chronic pain literacy, opioid stewardship, and demystifying pain interventions for general audiences.' },
]

const services = [
  { title: 'Epidural Injections', sub: 'Caudal, interlaminar, transforaminal' },
  { title: 'Radiofrequency Ablation', sub: 'Conventional & pulsed RF' },
  { title: 'Nerve Blocks', sub: 'Diagnostic & therapeutic' },
  { title: 'Joint Injections', sub: 'Image-guided, hyaluronic acid, PRP' },
  { title: 'Spinal Cord Stimulation', sub: 'Trial & permanent implants' },
  { title: 'Cancer Pain Management', sub: 'Neurolytic & infusion techniques' },
]

/* ── Nav ── */
function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <nav className="nav">
      <a href="#" className="nav-brand" onClick={close}>Dr. Prasanna Vani</a>
      <div className={`nav-links${open ? ' open' : ''}`}>
        <a href="#about" onClick={close}>About</a>
        <a href="#papers" onClick={close}>Papers</a>
        <a href="#awards" onClick={close}>Awards</a>
        <a href="#memberships" onClick={close}>Memberships</a>
        <a href="#app" onClick={close}>Pain App</a>
        <a href="#partner" onClick={close}>Partner</a>
        <a href="#centre" onClick={close}>Centre</a>
        <a href="#contact" className="nav-cta" onClick={close}>Get in Touch</a>
      </div>
      <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        )}
      </button>
    </nav>
  )
}

/* ── Hero ── */
function Hero() {
  return (
    <header className="hero">
      <div className="hero-left">
        <h1>Relief that <em>listens.</em><br />Care that <em>restores.</em></h1>
        <p className="hero-sub">
          Dr. Prasanna Vani brings over a decade of interventional pain medicine to JP Neuro Spine
          Hospital &amp; Pain Management Centre — blending evidence-based protocols with deeply
          personal, patient-first care.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">Book a Consultation <span className="arr">→</span></a>
          <a href="#about" className="btn btn-ghost">Meet Dr. Vani</a>
        </div>

        {/* Mobile-only stats grid — replaces portrait */}
        <div className="hero-stats-strip">
          {[
            { n: '15+', l: 'Years of practice' },
            { n: '5K+', l: 'Patients treated' },
            { n: '20+', l: 'Papers presented' },
            { n: '8+',  l: 'Awards received' },
          ].map(s => (
            <div key={s.n} className="hero-stat-chip">
              <span className="hsc-num">{s.n}</span>
              <span className="hsc-lbl">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop only — hidden on mobile */}
      <div className="hero-right">
        <div className="portrait">
          <span className="initials">PV</span>
        </div>
        <div className="badge-float badge-1">
          <div className="ic">✦</div>
          <div><strong>15+ Years</strong><span>Pain Medicine</span></div>
        </div>
        <div className="badge-float badge-2">
          <div className="ic">♡</div>
          <div><strong>5,000+</strong><span>Patients Treated</span></div>
        </div>
      </div>
    </header>
  )
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-head reveal">
        <h2 className="section-title">A practice rooted in <em>compassion,</em> guided by evidence.</h2>
      </div>
      <div className="about-grid">
        {/* Desktop: vertical stat list. Mobile: 2×2 stat cards (CSS swaps rendering) */}
        <div className="about-card reveal">
          {/* Desktop list */}
          <div className="stat stats-list-item"><span className="num">15+</span><span className="lbl">Years of clinical practice</span></div>
          <div className="stat stats-list-item"><span className="num">5K+</span><span className="lbl">Patients successfully treated</span></div>
          <div className="stat stats-list-item"><span className="num">20+</span><span className="lbl">Research papers presented</span></div>
          <div className="stat stats-list-item"><span className="num">8+</span><span className="lbl">National &amp; international awards</span></div>
          {/* Mobile 2×2 grid */}
          <div className="stats-grid">
            {[
              { n: '15+', l: 'Years of practice' },
              { n: '5K+', l: 'Patients treated' },
              { n: '20+', l: 'Papers presented' },
              { n: '8+', l: 'Awards received' },
            ].map(s => (
              <div key={s.n} className="stat-card">
                <span className="num">{s.n}</span>
                <span className="lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-text reveal">
          <p>Dr. Prasanna Vani practices at JP Neuro Spine Hospital &amp; Pain Management Centre, where she leads the interventional pain practice with a focus on minimally invasive, image-guided procedures and long-term recovery.</p>
          <p>Her clinical interests span chronic spinal pain, neuropathic pain syndromes, cancer pain, and complex regional pain syndrome. She is known among patients and peers for her unhurried consultations, her insistence on shared decision-making, and her commitment to combining procedural precision with rehabilitation and lifestyle care.</p>
          <p>Beyond clinical practice, Dr. Vani actively contributes to the field through research, teaching, and advocacy for better pain literacy in India.</p>
          <div className="specialties">
            {['Interventional Pain', 'Spinal Pain', 'Neuropathic Pain', 'Cancer Pain', 'CRPS', 'Headache Disorders'].map(s => (
              <span key={s} className="spec-pill">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Papers ── */
function Papers() {
  return (
    <section id="papers" className="papers-section">
      <div className="section-head reveal">
        <h2 className="section-title">Papers <em>presented</em> at national &amp; international forums.</h2>
        <p className="section-sub">Selected scholarly contributions in interventional pain medicine.</p>
      </div>
      <div className="papers-list">
        {papers.map((p, i) => (
          <div key={i} className="paper reveal">
            <div className="p-year">{p.year}</div>
            <div>
              <div className="p-title">{p.title}</div>
              <div className="p-meta">{p.meta}</div>
            </div>
            <span className="p-tag">{p.tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Awards – with scroll-snap on mobile ── */
function Awards() {
  const scrollRef = useRef(null)
  const [activeDot, setActiveDot] = useState(0)

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / awards.length))
    setActiveDot(Math.min(idx, awards.length - 1))
  }

  return (
    <section id="awards" className="awards-section">
      <div className="section-head reveal">
        <h2 className="section-title">Awards &amp; <em>distinctions</em> earned along the way.</h2>
      </div>
      <div className="awards-scroll-wrap">
        <div className="awards-grid" ref={scrollRef} onScroll={onScroll}>
          {awards.map((a, i) => (
            <div key={i} className="award reveal">
              <div className="award-icon">{a.roman}</div>
              <h4>{a.title}</h4>
              <p>{a.body}</p>
              <span className="yr">{a.year}</span>
            </div>
          ))}
        </div>
        <div className="awards-scroll-hint">
          {awards.map((_, i) => (
            <span key={i} className={`scroll-dot${activeDot === i ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Memberships ── */
function Memberships() {
  return (
    <section id="memberships" className="memberships-section">
      <div className="section-head reveal">
        <h2 className="section-title">Affiliated with the <em>societies</em> shaping modern pain medicine.</h2>
      </div>
      <div className="mem-grid">
        {memberships.map((m, i) => (
          <div key={i} className="mem reveal">
            <div className="mem-mark">{m.mark}</div>
            <h5>{m.abbr}</h5>
            <span>{m.full}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Pain App ── */
function PainApp() {
  return (
    <section id="app" className="app-section">
      <div className="app-grid">
        <div className="reveal">
          <div className="section-head" style={{ marginBottom: 28 }}>
            <h2 className="section-title">Your pain, <em>understood</em> between visits.</h2>
            <p className="section-sub">A companion app for patients — log daily pain scores, triggers, and medication response.</p>
          </div>
          <ul className="app-features">
            {[
              { title: 'Visual Pain Scale', desc: 'Quick 1–10 logging with intensity, location, and quality tags.' },
              { title: 'Medication Diary', desc: 'Track dosage, timing, and side-effects across your prescription cycle.' },
              { title: 'Trigger Patterns', desc: 'Identify activities, foods, sleep, and weather correlations over time.' },
              { title: 'Shareable Reports', desc: 'One-tap export of a clean PDF summary for your next consultation.' },
            ].map((f, i) => (
              <li key={i}>
                <span className="app-feat-icon">◆</span>
                <div><strong>{f.title}</strong><span>{f.desc}</span></div>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary">Open Your Pain Journal <span className="arr">→</span></a>
        </div>
        <div className="app-visual reveal">
          <div className="app-orbit" />
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(31,42,37,.5)' }}>Tuesday · Today</div>
              <h3>How is your<br />pain right now?</h3>
              <div className="phone-scale">
                <span>1</span><span>3</span><span>5</span><span>7</span><span>9</span>
              </div>
              <div className="lbl-mini">Recent entries</div>
              <div className="phone-entry"><strong>Lower back · Score 6</strong>After long sitting · Mon 8:42 PM</div>
              <div className="phone-entry"><strong>Right shoulder · Score 4</strong>Morning stiffness · Mon 7:10 AM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Partner ── */
function Partner() {
  return (
    <section id="partner" className="partner-section">
      <div className="section-head reveal">
        <h2 className="section-title">Partner <em>with us.</em></h2>
        <p className="section-sub">Whether you're a hospital, primary care physician, employer, or NGO — we believe pain care gets better when expertise is shared.</p>
      </div>
      <div className="partner-grid">
        {partners.map((p, i) => (
          <div key={i} className="partner-card reveal">
            <span className="n">{p.n}</span>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Centre ── */
function Centre() {
  return (
    <section id="centre" className="centre-section">
      <div className="section-head reveal">
        <h2 className="section-title">JP Neuro Spine Hospital &amp; <em>Pain Management Centre.</em></h2>
      </div>
      <div className="centre-wrap">
        <div className="reveal">
          <p style={{ fontSize: 16.5, color: 'rgba(31,42,37,.78)', marginBottom: 18 }}>
            Our centre is built around a single principle — that chronic pain deserves dedicated, specialist attention, not an afterthought tucked into another department.
          </p>
          <p style={{ fontSize: 16.5, color: 'rgba(31,42,37,.78)' }}>
            Equipped with C-arm fluoroscopy, ultrasound guidance, and a fully equipped procedure suite, we offer a complete spectrum of interventional and conservative pain treatments — alongside on-site rehabilitation and counselling support.
          </p>
          <div className="centre-services">
            {services.map((s, i) => (
              <div key={i} className="serv">
                <strong>{s.title}</strong>
                <span>{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="centre-visual reveal">
          <div className="label">
            <div className="small">Visit Us At</div>
            <h3>JP Neuro Spine Hospital<br />&amp; Pain Centre</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ── */
function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 4000)
  }
  return (
    <section id="contact" className="contact-section">
      <div className="section-head reveal">
        <h2 className="section-title">Begin your <em>recovery</em> with a conversation.</h2>
        <p className="section-sub">Send us a note and we'll get back to you within one working day.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info reveal">
          <h3>Clinic Hours &amp; Reach</h3>
          {/* Mobile quick-action chips */}
          <div className="contact-quick-actions">
            <a href="tel:+910000000000" className="cqa-call">📞 Call Now</a>
            <a href="mailto:contact@drprasannavani.com" className="cqa-email">✉ Email Us</a>
          </div>
          {[
            { k: 'Address', v: 'JP Neuro Spine Hospital & Pain Management Centre' },
            { k: 'Phone', v: <a href="tel:+910000000000">+91 00000 00000</a> },
            { k: 'Email', v: <a href="mailto:contact@drprasannavani.com">contact@drprasannavani.com</a> },
            { k: 'Hours', v: 'Mon – Sat · 10:00 AM – 7:00 PM' },
            { k: 'Emergency', v: 'Hospital reception available 24/7' },
          ].map((item, i) => (
            <div key={i} className="info-item" style={i === 4 ? { borderBottom: 'none' } : {}}>
              <div className="k">{item.k}</div>
              <div className="v">{item.v}</div>
            </div>
          ))}
        </div>
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="row-2">
            <div className="field"><label>Full Name</label><input type="text" required placeholder="Your name" /></div>
            <div className="field"><label>Phone</label><input type="tel" required placeholder="+91" /></div>
          </div>
          <div className="field"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
          <div className="field">
            <label>Concern</label>
            <select>
              {['Chronic back pain', 'Neck or cervical pain', 'Joint pain / arthritis', 'Cancer pain', 'Headache / migraine', 'Second opinion', 'Partnership enquiry', 'Other'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="field"><label>Message</label><textarea required placeholder="Tell us briefly what brings you here…" /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
            {sent ? 'Sent ✓' : <>Send Message <span className="arr">→</span></>}
          </button>
        </form>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div className="foot-col">
          <div className="foot-brand-name">Dr. Prasanna Vani</div>
          <p>Practicing at JP Neuro Spine Hospital &amp; Pain Management Centre. Compassionate, evidence-based interventional pain care.</p>
          <span className="foot-dotted">Now accepting consultations</span>
        </div>
        <div className="foot-col">
          <h6>Explore</h6>
          {/* On mobile these two columns merge into one row */}
          <div className="foot-links-row">
            <a href="#about">About</a>
            <a href="#papers">Papers</a>
            <a href="#awards">Awards</a>
            <a href="#memberships">Memberships</a>
          </div>
        </div>
        <div className="foot-col">
          <h6>Connect</h6>
          <div className="foot-links-row">
            <a href="#app">Pain Journal</a>
            <a href="#partner">Partner</a>
            <a href="#centre">Centre</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="foot-col">
          <h6>Reach Out</h6>
          <div className="foot-contact-row">
            <div><div className="lbl">Phone</div><div className="val"><a href="tel:+910000000000">+91 00000 00000</a></div></div>
            <div><div className="lbl">Email</div><div className="val"><a href="mailto:contact@drprasannavani.com">contact@drprasannavani.com</a></div></div>
            <div><div className="lbl">Hours</div><div className="val">Mon – Sat · 10 AM – 7 PM</div></div>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Dr. Prasanna Vani · All rights reserved.</span>
        <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top <span className="arrow">↑</span>
        </button>
      </div>
    </footer>
  )
}

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const pct = useScrollProgress()
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

/* ── Root ── */
export default function App() {
  useReveal()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Papers />
      <Awards />
      <Memberships />
      <PainApp />
      <Partner />
      <Centre />
      <Contact />
      <Footer />
    </>
  )
}

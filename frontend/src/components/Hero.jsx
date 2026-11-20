import { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate as fmAnimate,
  useMotionValue,
  useTransform,
} from 'framer-motion'

const positiveReviews = [
  { text: 'this is the best app i have used all year', conf: '94.2%' },
  { text: 'customer support fixed it in minutes', conf: '91.3%' },
  { text: 'battery finally lasts a full day', conf: '89.7%' },
  { text: 'exactly what the listing promised', conf: '88.5%' },
  { text: 'worth every penny spent', conf: '92.1%' },
]

const negativeReviews = [
  { text: 'returned a broken unit, no refund offered', conf: '87.6%' },
  { text: 'refund took three support calls', conf: '82.1%' },
  { text: 'app keeps crashing on startup', conf: '93.4%' },
  { text: 'shipped the wrong color twice', conf: '85.9%' },
  { text: 'quality dropped after the update', conf: '86.3%' },
]

const streamItems = []
for (let i = 0; i < 5; i++) {
  streamItems.push({ ...positiveReviews[i], label: 'positive' })
  streamItems.push({ ...negativeReviews[i], label: 'negative' })
}

const MAX_DONE = 4
const TYPING_SPEED = 50
const EASE = [0.16, 1, 0.3, 1]

const titleText = 'Understand the '
const titleHighlight = 'Emotion'
const titleText2 = 'Behind the Text.'

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.04 },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
}

function FloatingOrbs() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)', filter: 'blur(40px)' }}
      />
      <motion.div
        animate={{ x: [0, -25, 35, 0], y: [0, 30, -25, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '50%', right: '8%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent 70%)', filter: 'blur(35px)' }}
      />
      <motion.div
        animate={{ x: [0, 20, -15, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '10%', left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)', filter: 'blur(30px)' }}
      />
    </div>
  )
}

function GlowingGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.04 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>
  )
}

function Particles() {
  const dots = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 2 + Math.random() * 3, duration: 4 + Math.random() * 6, delay: Math.random() * 4,
    }))
  ).current
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {dots.map((dot) => (
        <motion.div key={dot.id}
          animate={{ opacity: [0, 0.6, 0], y: [0, -30] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size, borderRadius: '50%', background: 'var(--accent)' }}
        />
      ))}
    </div>
  )
}

function TerminalBar() {
  return (
    <div className="terminal-bar">
      <span className="t-dot t-dot-a"></span>
      <span className="t-dot t-dot-b"></span>
      <span className="t-dot t-dot-c"></span>
      <span className="terminal-title mono">live.ReviewPulse / analyze</span>
      <span className="live-badge mono"><span className="live-dot"></span>LIVE</span>
    </div>
  )
}

export default function Hero() {
  const [inputText, setInputText] = useState('')
  const [resultLine, setResultLine] = useState(null)
  const [doneRows, setDoneRows] = useState([])
  const [floatLabel, setFloatLabel] = useState('positive')
  const confidence = useMotionValue(72.4)
  const confidenceText = useTransform(confidence, (v) => v.toFixed(1) + '%')
  const fillWidth = useTransform(confidence, (v) => v + '%')

  const idxRef = useRef(0)
  const timerRef = useRef(null)
  const phaseRef = useRef('start')
  const charRef = useRef(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    function scheduleNext(ms) {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(runPhase, ms)
    }

    function runPhase() {
      if (!mountedRef.current) return

      const phase = phaseRef.current

      if (phase === 'start' || phase === 'typing') {
        const item = streamItems[idxRef.current % streamItems.length]
        const fullText = item.text

        if (charRef.current === 0) {
          setInputText('')
          setResultLine(null)
        }

        if (charRef.current < fullText.length) {
          charRef.current++
          setInputText(fullText.slice(0, charRef.current))

          if (charRef.current >= fullText.length) {
            phaseRef.current = 'showing'
            scheduleNext(600)
          } else {
            phaseRef.current = 'typing'
            scheduleNext(TYPING_SPEED + Math.random() * 18)
          }
        } else {
          phaseRef.current = 'showing'
          scheduleNext(600)
        }
      } else if (phase === 'showing') {
        const item = streamItems[idxRef.current % streamItems.length]
        idxRef.current++

        setResultLine({ label: item.label, text: item.text, conf: item.conf })
        setFloatLabel(item.label)
        fmAnimate(confidence, parseFloat(item.conf), { duration: 0.9, ease: EASE })

        phaseRef.current = 'waiting'
        scheduleNext(2400)
      } else if (phase === 'waiting') {
        const item = streamItems[(idxRef.current - 1 + streamItems.length) % streamItems.length]
        setDoneRows((prev) =>
          [...prev, { label: item.label, text: item.text, conf: item.conf }].slice(-MAX_DONE)
        )
        setInputText('')
        setResultLine(null)
        charRef.current = 0

        phaseRef.current = 'typing'
        scheduleNext(300)
      }
    }

    timerRef.current = setTimeout(runPhase, 800)

    return () => {
      mountedRef.current = false
      clearTimeout(timerRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MotionConfig reducedMotion="user">
      <section className="hero" id="top" style={{ position: 'relative' }}>
        <FloatingOrbs />
        <GlowingGrid />
        <Particles />

        <div className="hero-grid" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div className="hero-copy" initial="hidden" animate="visible">
            <motion.span className="eyebrow" custom={0} variants={fadeUp}>
              TF-IDF vectorizer + LogisticRegression
            </motion.span>

            <h1 className="hero-title" style={{ perspective: 600 }}>
              <span style={{ display: 'flex', flexWrap: 'wrap' }}>
                {titleText.split('').map((char, i) => (
                  <motion.span key={`t1-${i}`} custom={i} initial="hidden" animate="visible"
                    variants={letterVariants}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}>
                    {char}
                  </motion.span>
                ))}
                <motion.span key="highlight" custom={titleText.length} initial="hidden" animate="visible"
                  variants={letterVariants}
                  className="hero-highlight"
                  style={{ display: 'inline-block' }}>
                  {titleHighlight}
                </motion.span>
              </span>
              <span style={{ display: 'flex', flexWrap: 'wrap' }}>
                {titleText2.split('').map((char, i) => (
                  <motion.span key={`t2-${i}`} custom={i + titleText.length + titleHighlight.length} initial="hidden" animate="visible"
                    variants={letterVariants}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}>
                    {char}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p className="hero-sub" custom={2} variants={fadeUp}>
              ReviewPulse reads 10,000 weighted features per text and scores the
              balance — returning a verdict and a calibrated probability before
              your cursor leaves the box.
            </motion.p>

            <motion.div className="hero-actions" custom={3} variants={fadeUp}>
              <motion.a className="btn btn-primary btn-lg" href="#analyzer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
                whileTap={{ scale: 0.97 }}>
                Analyze a text
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </motion.a>
            </motion.div>

            <motion.p className="hero-meta mono" custom={4} variants={fadeUp}>
              median <span className="pill">3.8 ms</span> ·{' '}
              <span className="pill">10,000</span> features ·{' '}
              <span className="pill">2</span> classes
            </motion.p>
          </motion.div>

          <motion.div className="hero-visual"
            initial={{ opacity: 0, x: 60, scale: 0.94, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            aria-hidden="true"
            style={{ perspective: 1200 }}>

            <div className="terminal">
              <TerminalBar />
              <div className="terminal-body mono">
                <AnimatePresence initial={false} mode="popLayout">
                  {doneRows.map((row) => (
                    <motion.div key={row.text} layout
                      className={`term-done-row ${row.label}`}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.96 }}
                      transition={{ duration: 0.45, ease: EASE }}>
                      <motion.span className="term-label"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 520, damping: 24, delay: 0.16 }}>
                        {row.label === 'positive' ? 'POS' : 'NEG'}
                      </motion.span>
                      <span className="term-text">{row.text}</span>
                      <span className="term-conf">{row.conf}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {resultLine && (
                  <motion.div
                    className={`term-result-line show ${resultLine.label}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}>
                    <span className="term-label">
                      {resultLine.label === 'positive' ? 'POS' : 'NEG'}
                    </span>
                    <span className="term-text">{resultLine.text}</span>
                    <span className="term-conf">{resultLine.conf}</span>
                  </motion.div>
                )}

                <div className="term-input-line">
                  <span className="term-prompt">&gt;</span>
                  <span className="term-input-text">{inputText}</span>
                  <span className="term-cursor"></span>
                </div>
              </div>
            </div>

            <motion.div className={`float-chip mono ${floatLabel}`}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="fc-bar">
                <motion.span className="fc-fill" style={{ width: fillWidth }}></motion.span>
              </span>
              <span className="fc-caption">
                <motion.b>{confidenceText}</motion.b>{' '}
                <span>{floatLabel}</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.15); }
            50% { box-shadow: 0 0 40px rgba(16,185,129,0.3); }
          }
          .hero .terminal { animation: pulse-glow 4s ease-in-out infinite; }
        `}</style>
      </section>
    </MotionConfig>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useEffect, useState } from 'react'

const pipelineSteps = [
  { text: 'text', out: false },
  { text: 'TfidfVectorizer', out: false },
  { text: '10k sparse', out: false },
  { text: 'LR · lbfgs', out: false },
  { text: '0 … 1', out: true },
]

const stats = [
  { value: 10000, label: 'weighted features', format: (v) => v.toLocaleString(), icon: '01' },
  { value: 2, label: 'classes · neg / pos', format: (v) => String(v), icon: '02' },
  { value: 80, label: 'model on disk', format: (v) => v + ' KB', icon: '03' },
  { value: 15, label: 'fitting iterations', format: (v) => String(v), icon: '04' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

function AnimatedStat({ value, format, label, icon, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(format(0))

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const duration = 1200
    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(value * eased)
      setDisplay(format(current))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [isInView, value, format])

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.4s var(--ease), box-shadow 0.4s',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5), 0 0 30px -10px rgba(16,185,129,0.12)',
        borderColor: 'rgba(16,185,129,0.25)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        opacity: 0,
        transition: 'opacity 0.3s',
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.1em',
        color: 'var(--faint)',
      }}>{icon}</span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.2rem',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--text)',
      }}>{display}</span>
      <span style={{
        fontSize: '0.88rem',
        color: 'var(--muted)',
        lineHeight: 1.4,
      }}>{label}</span>
    </motion.div>
  )
}

export default function Model() {
  return (
    <section className="section" id="model">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-kicker">Under the hood</span>
        <h2 className="section-title">A small model, shipped honestly</h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
        maxWidth: 960,
        margin: '0 auto',
      }}>
        {stats.map((stat, i) => (
          <AnimatedStat key={i} {...stat} index={i} />
        ))}
      </div>

    </section>
  )
}

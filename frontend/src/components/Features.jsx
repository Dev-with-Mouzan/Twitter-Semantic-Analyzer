import { motion } from 'framer-motion'

const features = [
  {
    title: 'Calibrated verdicts',
    body: 'Each response carries the predicted class, its confidence, and both class probabilities — nothing hidden behind a badge.',
    code: 'response.prediction & response.confidence',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Single text prediction',
    body: 'Paste any text and get an instant sentiment verdict with confidence score.',
    code: null,
    stat: '1',
    statLabel: 'text per request',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Millisecond latency',
    body: 'Models load once into memory at startup. A single 10k-dimensional dot product decides — median round-trip 3.8 ms.',
    code: null,
    stat: '3.8',
    statLabel: 'ms median',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Clean REST contract',
    body: 'Three endpoints, typed schemas on both sides, OpenAPI docs generated for free.',
    code: null,
    endpoints: ['/predict', '/health'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Features() {
  return (
    <section className="section" id="features">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-kicker">Capabilities</span>
        <h2 className="section-title">Built for scores, not screenshots</h2>
        <p className="section-sub">Every endpoint returns JSON. No dashboards lock your data away — take the verdict wherever you build.</p>
      </motion.div>

      <motion.div
        className="feat-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((f, i) => (
          <motion.div key={i} className="feat-card" variants={cardVariants}>
            <div className="feat-card-header">
              <div className="feat-icon">{f.icon}</div>
              <h3 className="feat-title">{f.title}</h3>
            </div>
            <p className="feat-body">{f.body}</p>

            {f.code && (
              <div className="feat-code mono">{f.code}</div>
            )}

            {f.stat && (
              <div className="feat-stat">
                <span className="feat-stat-value mono">{f.stat}</span>
                <span className="feat-stat-label">{f.statLabel}</span>
              </div>
            )}

            {f.endpoints && (
              <div className="feat-endpoints">
                {f.endpoints.map((ep) => (
                  <span key={ep} className="feat-endpoint mono">{ep}</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .feat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          max-width: 960px;
          margin: 0 auto;
        }

        .feat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.4s var(--ease), box-shadow 0.4s;
        }

        .feat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08), transparent 70%);
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .feat-card:hover {
          border-color: rgba(16, 185, 129, 0.25);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px -16px rgba(0, 0, 0, 0.5), 0 0 40px -12px rgba(16, 185, 129, 0.1);
        }

        .feat-card:hover::before {
          opacity: 1;
        }

        .feat-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .feat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--accent-tint);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: grid;
          place-items: center;
          color: var(--accent-strong);
          flex-shrink: 0;
          transition: transform 0.3s var(--ease-spring), box-shadow 0.3s;
        }

        .feat-card:hover .feat-icon {
          transform: scale(1.1) rotate(-5deg);
          box-shadow: 0 0 18px rgba(16, 185, 129, 0.3);
        }

        .feat-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .feat-body {
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.6;
          flex: 1;
        }

        .feat-code {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 0.78rem;
          color: var(--muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .feat-stat {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 16px 0 0;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }

        .feat-stat-value {
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--accent-strong);
          line-height: 1;
        }

        .feat-stat-label {
          color: var(--faint);
          font-size: 0.85rem;
        }

        .feat-endpoints {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .feat-endpoint {
          background: var(--accent-tint);
          color: var(--accent-strong);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        @media (max-width: 700px) {
          .feat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

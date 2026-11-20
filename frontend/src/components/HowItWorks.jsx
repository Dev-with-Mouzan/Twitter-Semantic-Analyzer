import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'User Text',
    body: 'User types or pastes a review into the input field.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 10H3M21 6H3M21 14H3M17 18H3" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Clean',
    body: 'Strip noise — lowercase, remove punctuation, handle special characters.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Tokenize',
    body: 'Split cleaned text into unigrams + bigrams across 10,000 dimensions.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16M4 12h10M4 17h12" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Vectorize',
    body: 'TF-IDF converts tokens into weighted numerical feature vectors.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Predict',
    body: 'Logistic regression computes class probabilities via softmax.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Result',
    body: 'Verdict label + confidence score returned to the user in milliseconds.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
}

const arrowFade = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 + 0.08 },
  }),
}

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
}

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-kicker">Process</span>
        <h2 className="section-title">How it works</h2>
      </motion.div>

      <div className="v-pipeline">
        <motion.div
          className="v-pipeline-line"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={lineGrow}
        />

        {steps.map((step, i) => (
          <div key={i} className="v-pipeline-item">
            <motion.div
              className="v-pipeline-step"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="v-pipeline-dot" />
              <div className="v-pipeline-card">
                <div className="v-pipeline-card-top">
                  <span className="v-pipeline-icon">{step.icon}</span>
                  <span className="v-pipeline-num mono">{step.num}</span>
                </div>
                <h3 className="v-pipeline-title">{step.title}</h3>
                <p className="v-pipeline-body">{step.body}</p>
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                className="v-pipeline-arrow"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={arrowFade}
              >
                <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                  <path d="M7 0v14M3 11l4 4 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .v-pipeline {
          max-width: 520px;
          margin: 0 auto;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .v-pipeline-line {
          position: absolute;
          top: 28px;
          bottom: 28px;
          left: 27px;
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--accent) 10%, var(--accent) 90%, transparent);
          opacity: 0.2;
          transform-origin: top center;
        }

        .v-pipeline-item {
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .v-pipeline-step {
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }

        .v-pipeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid var(--bg);
          box-shadow: 0 0 0 2px var(--accent), 0 0 20px rgba(16, 185, 129, 0.3);
          flex-shrink: 0;
          margin-top: 8px;
          z-index: 2;
        }

        .v-pipeline-card {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px 26px;
          transition: border-color 0.3s, transform 0.4s var(--ease), box-shadow 0.4s;
        }

        .v-pipeline-card:hover {
          border-color: rgba(16, 185, 129, 0.3);
          transform: translateX(6px);
          box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(16, 185, 129, 0.12);
        }

        .v-pipeline-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .v-pipeline-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--accent-tint);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: grid;
          place-items: center;
          color: var(--accent-strong);
          transition: transform 0.3s var(--ease-spring), box-shadow 0.3s;
        }

        .v-pipeline-card:hover .v-pipeline-icon {
          transform: scale(1.08) rotate(-5deg);
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.3);
        }

        .v-pipeline-num {
          color: var(--faint);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
        }

        .v-pipeline-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .v-pipeline-body {
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .v-pipeline-arrow {
          display: flex;
          justify-content: center;
          padding: 6px 0;
          margin-left: 28px;
          z-index: 1;
        }
      `}</style>
    </section>
  )
}

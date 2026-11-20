import { useState } from 'react'
import { motion } from 'framer-motion'

const MAX_TEXT_LENGTH = 5000

const samples = [
  { label: 'Great take', text: 'This app is absolutely incredible, I use it every single day!' },
  { label: 'Bad take', text: 'The delivery took forever and the box arrived destroyed.' },
]

const ICON_POSITIVE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12a8 8 0 1 1-2.34-5.66" />
    <path d="M20 4v4h-4" />
  </svg>
)

const ICON_NEGATIVE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12a8 8 0 1 0 2.34-5.66" />
    <path d="M4 20v-4h4" />
  </svg>
)

function percentVal(p) {
  return Math.round(p * 100) + '%'
}

export default function Analyzer() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [showEmpty, setShowEmpty] = useState(true)

  const charCount = text.length
  const isWarn = charCount > MAX_TEXT_LENGTH * 0.85

  const handleClear = () => {
    setText('')
    setError('')
  }

  const handleSample = (sampleText) => {
    setText(sampleText)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) {
      setError('Please enter some text to analyze.')
      return
    }

    setError('')
    setLoading(true)
    setShowEmpty(false)
    setResult(null)

    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value }),
      })

      let data = null
      try { data = await res.json() } catch { /* no body */ }

      if (!res.ok) {
        const detail = data && data.detail
        const msg = Array.isArray(detail)
          ? (detail[0] && detail[0].msg) || 'Invalid request.'
          : typeof detail === 'string'
            ? detail
            : 'Request failed (HTTP ' + res.status + ').'
        throw new Error(msg)
      }

      const probObj = data.probabilities || {}
      setResult({
        ...data,
        probabilities: {
          positive: probObj['1'] ?? probObj.positive ?? 0,
          negative: probObj['0'] ?? probObj.negative ?? 0,
        },
      })
    } catch (err) {
      setError(err.message)
      setShowEmpty(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section analyzer-section" id="analyzer">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-kicker">Try it live</span>
        <h2 className="section-title">Paste a text, read the verdict</h2>
        <p className="section-sub">One request returns the class, the confidence, and both probabilities — straight from a tuned logistic regression.</p>
      </motion.div>

      <motion.div
        className="analyzer-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="card-head">
          <span className="hint">Analyze any text sentiment</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <textarea
              required
              maxLength={MAX_TEXT_LENGTH}
              rows={5}
              placeholder='Type or paste your text here... e.g. "Honestly, this is the best purchase I have made all year."'
              aria-label="Text to analyze"
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setError('')
              }}
            />
            <div className="field-meta">
              <span className={`count${isWarn ? ' warn' : ''}`}><span>{charCount}</span> / 5000</span>
              <button type="button" className="ghost-btn" onClick={handleClear}>Clear</button>
            </div>
          </div>

          <div className="samples" aria-label="Sample texts">
            <span className="samples-label">Try:</span>
            {samples.map((s) => (
              <button key={s.label} type="button" className="chip" onClick={() => handleSample(s.text)}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="actions">
            <button type="submit" className={`submit-btn${loading ? ' loading' : ''}`} disabled={loading}>
              <span className="btn-label">{loading ? 'Analyzing...' : 'Analyze sentiment'}</span>
              <span className="btn-spinner" aria-hidden="true"></span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>

        {error && (
          <div className="alert" role="alert">{error}</div>
        )}

        <div className="result-area" aria-live="polite">
          {showEmpty && !loading && !result && !error && (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
                </svg>
              </div>
              <p>Your verdict will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="skeleton">
              <div className="skeleton-block" style={{ height: 24, width: '34%' }}></div>
              <div className="skeleton-block" style={{ height: 10 }}></div>
              <div className="skeleton-block" style={{ height: 10, width: '88%' }}></div>
              <div className="skeleton-block" style={{ height: 10, width: '60%' }}></div>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 28,
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${result.label === 'positive' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(251, 113, 133, 0.25)'}`,
                background: 'var(--surface)',
              }}
            >
              {/* Verdict banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: result.label === 'positive'
                  ? 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))'
                  : 'linear-gradient(135deg, rgba(251,113,133,0.12), rgba(251,113,133,0.04))',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: result.label === 'positive' ? 'var(--accent-tint)' : 'rgba(251,113,133,0.12)',
                    border: `1px solid ${result.label === 'positive' ? 'rgba(16,185,129,0.3)' : 'rgba(251,113,133,0.3)'}`,
                    display: 'grid',
                    placeItems: 'center',
                    color: result.label === 'positive' ? 'var(--accent-strong)' : 'var(--negative)',
                  }}>
                    {result.label === 'positive' ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 15V19a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                        <path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      color: result.label === 'positive' ? 'var(--accent-strong)' : 'var(--negative)',
                      letterSpacing: '-0.01em',
                    }}>
                      {result.label} sentiment
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--faint)',
                      marginTop: 2,
                    }}>
                      Model verdict with confidence score
                    </div>
                  </div>
                </div>
                <div style={{
                  textAlign: 'right',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: result.label === 'positive' ? 'var(--accent-strong)' : 'var(--negative)',
                  }}>
                    {Math.round(result.confidence * 100)}%
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: 'var(--faint)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    marginTop: 4,
                  }}>
                    CONFIDENCE
                  </div>
                </div>
              </div>

              {/* Probability bars */}
              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Positive bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>Positive</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent-strong)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {percentVal(result.probabilities.positive)}
                    </span>
                  </div>
                  <div style={{
                    height: 8,
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: percentVal(result.probabilities.positive) }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      style={{
                        height: '100%',
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                        boxShadow: '0 0 12px rgba(16,185,129,0.3)',
                      }}
                    />
                  </div>
                </div>

                {/* Negative bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 500 }}>Negative</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--negative)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {percentVal(result.probabilities.negative)}
                    </span>
                  </div>
                  <div style={{
                    height: 8,
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: percentVal(result.probabilities.negative) }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      style={{
                        height: '100%',
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #fb7185, #fda4af)',
                        boxShadow: '0 0 12px rgba(251,113,133,0.3)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Input text */}
              <div style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--border)',
                background: 'rgba(0,0,0,0.15)',
              }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--faint)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Input</span>
                <p style={{
                  marginTop: 6,
                  fontSize: '0.9rem',
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}>
                  "{result.text}"
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

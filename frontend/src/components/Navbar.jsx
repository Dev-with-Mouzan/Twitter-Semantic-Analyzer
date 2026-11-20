import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#top', label: 'Home' },
  { href: '#how-it-works', label: 'Process' },
  { href: '#features', label: 'Features' },
  { href: '#analyzer', label: 'Analyzer' },
  { href: '#model', label: 'Model' },
]

function BrandSvg() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Detect active section
      const sections = document.querySelectorAll('section[id], [id="top"]')
      let current = 'top'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 120) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const close = (e) => {
        if (e.key === 'Escape') setMenuOpen(false)
      }
      document.addEventListener('keydown', close)
      return () => document.removeEventListener('keydown', close)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="nb" data-scrolled={scrolled}>
        <div className="nb-inner">
          <a className="nb-brand" href="#top" aria-label="ReviewPulse home">
            <span className="nb-logo" aria-hidden="true">
              <BrandSvg />
            </span>
            <span className="nb-name">ReviewPulse</span>
          </a>

          <nav className="nb-links" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nb-link${isActive ? ' active' : ''}`}
                  data-glow={isActive}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="nb-actions">
            <a className="nb-cta" href="#analyzer">
              Try it
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <button
              className="nb-burger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span data-open={menuOpen}></span>
              <span data-open={menuOpen}></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`nb-mobile${menuOpen ? ' open' : ''}`}>
        <nav className="nb-mobile-links" aria-label="Mobile">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nb-mobile-link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            )
          })}
          <a className="nb-mobile-cta" href="#analyzer" onClick={closeMenu}>
            Try the analyzer
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </nav>
      </div>

      <style>{`
        .nb {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid transparent;
          transition: background 0.35s var(--ease), border-color 0.35s, backdrop-filter 0.35s;
        }

        .nb[data-scrolled="true"] {
          background: rgba(9, 9, 11, 0.75);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border-bottom-color: var(--border);
        }

        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Brand */
        .nb-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text);
        }

        .nb-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent-tint), rgba(16, 185, 129, 0.06));
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: grid;
          place-items: center;
          color: var(--accent-strong);
          transition: transform 0.3s var(--ease-spring), box-shadow 0.3s;
        }

        .nb-brand:hover .nb-logo {
          transform: rotate(-8deg) scale(1.08);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }

        .nb-name {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        /* Desktop links */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nb-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 8px;
          transition: color 0.25s, background 0.25s, text-shadow 0.25s;
          position: relative;
        }

        .nb-link:hover {
          color: var(--text);
          background: rgba(255, 255, 255, 0.04);
        }

        .nb-link.active {
          color: var(--accent-strong);
          text-shadow: 0 0 12px rgba(52, 211, 153, 0.5), 0 0 24px rgba(52, 211, 153, 0.2);
        }

        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        /* CTA button */
        .nb-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nb-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent);
          color: #04120c;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 8px 18px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.25s;
        }

        .nb-cta:hover {
          background: var(--accent-strong);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px -8px rgba(16, 185, 129, 0.4);
        }

        .nb-cta:active {
          transform: translateY(0) scale(0.98);
        }

        /* Burger */
        .nb-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          padding: 0 9px;
          background: none;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          cursor: pointer;
        }

        .nb-burger span {
          display: block;
          width: 100%;
          height: 1.5px;
          background: var(--text);
          border-radius: 2px;
          transition: transform 0.3s var(--ease), opacity 0.2s;
        }

        .nb-burger span[data-open="true"]:first-child {
          transform: translateY(3.25px) rotate(45deg);
        }

        .nb-burger span[data-open="true"]:nth-child(2) {
          transform: translateY(-3.25px) rotate(-45deg);
        }

        /* Mobile overlay */
        .nb-mobile {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 49;
          background: rgba(9, 9, 11, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
          display: flex;
          padding: 32px 28px;
        }

        .nb-mobile.open {
          opacity: 1;
          visibility: visible;
        }

        .nb-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
        }

        .nb-mobile-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 1.15rem;
          font-weight: 500;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s, padding-left 0.2s, text-shadow 0.25s;
        }

        .nb-mobile-link:hover,
        .nb-mobile-link.active {
          color: var(--accent-strong);
          padding-left: 8px;
          text-shadow: 0 0 12px rgba(52, 211, 153, 0.5);
        }

        .nb-mobile-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          background: var(--accent);
          color: #04120c;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 24px;
          border-radius: 12px;
          text-decoration: none;
          width: fit-content;
          transition: background 0.2s, transform 0.15s;
        }

        .nb-mobile-cta:hover {
          background: var(--accent-strong);
          transform: translateY(-1px);
        }

        @media (max-width: 820px) {
          .nb-links {
            display: none;
          }

          .nb-cta {
            display: none;
          }

          .nb-burger {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}

function BrandSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-8 8H3l2.6-3.1A8 8 0 1 1 21 12z" />
      <path d="M8.5 10.5h7M10.5 14h3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4 4 0 0 0-1-3.1c3.4-.2 7-1.6 7-6.6a5 5 0 0 0-1.3-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12 12 0 0 0-6.5 0C7.5 1.5 6.4 1.8 6.4 1.8a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 5 8.7c0 5 3.6 6.4 7 6.6a4 4 0 0 0-1 3.1V22" />
      <path d="M9 18.5c-3 .7-5.4-.2-6.5-2.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.8-6.3L5.4 22H2.6l7-8L2 2h6.3l4.3 5.7L18.2 2zm-1.1 18.1h1.7L7.2 3.8H5.4l11.7 16.3z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5A6 6 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <BrandSvg />
            </span>
            <span className="brand-name">ReviewPulse</span>
          </a>
          <p className="footer-desc">Sentiment analysis as an honest API. Built on scikit-learn, served with FastAPI.</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Product</h4>
          <a href="#analyzer">Analyzer</a>
          <a href="#api">API reference</a>
          <a href="#model">Model</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Resources</h4>
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="/docs" rel="nofollow">OpenAPI docs</a>
          <a href="#top">Status</a>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Community</h4>
          <div className="footer-social">
            <a href="#" aria-label="GitHub"><GithubIcon /></a>
            <a href="#" aria-label="X"><XIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom mono">
        <span>&copy; 2026 ReviewPulse Labs</span>
        <span>FastAPI &middot; scikit-learn &middot; MIT</span>
      </div>
    </footer>
  )
}

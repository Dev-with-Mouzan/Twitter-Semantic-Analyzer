const reviews = [
  { text: 'Absolutely love it', sentiment: 'POSITIVE' },
  { text: 'Battery died in two hours', sentiment: 'NEGATIVE' },
  { text: 'Fast, clean, does the job', sentiment: 'POSITIVE' },
  { text: 'Support never answered', sentiment: 'NEGATIVE' },
  { text: 'Would buy again', sentiment: 'POSITIVE' },
]

const doubled = [...reviews, ...reviews]

export default function Marquee() {
  return (
    <section className="marquee-band">
      <div className="marquee-wrap">
        <div
          className="marquee-track"
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running'
          }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="mq-pair">
              <em>"{item.text}"</em>
              <span className={`mq-sentiment ${item.sentiment === 'POSITIVE' ? 'pos' : 'neg'}`}>
                {item.sentiment}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

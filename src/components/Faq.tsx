import { useState } from 'react'

const faqs = [
  {
    q: 'What chains are supported?',
    a: 'Ethereum, BNB Chain, Base, Polygon, and Arbitrum on the EVM side, plus Solana.',
  },
  {
    q: 'Where does the scan data come from?',
    a: "Every check runs against GoPlus Security's public token security API — the same engine used by major wallets and explorers.",
  },
  {
    q: 'Is a "Low Risk" verdict a guarantee the token is safe?',
    a: 'No. VERDANT is an automated first pass, not financial advice. Always verify contracts, liquidity locks, and team info yourself before trading.',
  },
  {
    q: 'Does VERDANT store the addresses I scan?',
    a: 'No. Scans run directly from your browser to GoPlus — nothing is logged or stored on our end.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq" id="docs">
      <div className="section-header">
        <h2>Docs & FAQ</h2>
        <p>Everything you need to know about how the scanner works.</p>
      </div>

      <div className="faq-list">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.q}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {item.q}
                <span className="faq-toggle" />
              </button>
              {isOpen && <p className="faq-answer">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

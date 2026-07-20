const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
        <path d="M9 11h6M9 15h4" />
      </svg>
    ),
    title: 'Paste an address',
    desc: 'Drop in any EVM contract or Solana mint address — no wallet connection required.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
    title: 'Automated deep scan',
    desc: "We query on-chain data and GoPlus Security's threat database for honeypot, ownership, and liquidity risks.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Get an instant verdict',
    desc: 'A clear Low / Caution / High risk verdict with every check broken down in plain English.',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How It Works</h2>
        <p>Three steps between you and a rug pull.</p>
      </div>

      <div className="steps-grid">
        {steps.map((step, i) => (
          <div className="step-card" key={step.title}>
            <span className="step-number">{String(i + 1).padStart(2, '0')}</span>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

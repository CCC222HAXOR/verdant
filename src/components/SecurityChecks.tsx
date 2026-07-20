const checks = [
  {
    title: 'Honeypot Detection',
    desc: 'A simulated buy-then-sell round trip against the live contract — the single most common rug mechanic caught before you risk real funds.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20 15.2 15.2" />
      </svg>
    ),
  },
  {
    title: 'Ownership & Renouncement',
    desc: 'Checks whether a live owner address still holds privileged control — pausing trades, blacklisting wallets, reclaiming ownership — after launch.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12 19 4M16 4h4v4M14.5 9.5 17 12" />
      </svg>
    ),
  },
  {
    title: 'Mint & Inflation Risk',
    desc: "Flags contracts where the owner or mint authority can create new supply on demand, silently diluting every existing holder's share.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="16" height="11" rx="1.5" />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
  {
    title: 'Blacklist & Freeze Controls',
    desc: 'Detects functions that let a privileged address block or freeze specific wallets from trading or moving their balance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M5.5 5.5 18.5 18.5" />
      </svg>
    ),
  },
  {
    title: 'Trading Kill-Switch',
    desc: 'Checks for a pause function that can freeze all transfers network-wide — a switch that can be flipped the moment it benefits the owner most.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Hidden Owner Patterns',
    desc: 'Static analysis for contracts written to obscure who actually controls owner-level functions behind a proxy or renamed variable.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <path d="M4 4l16 16" />
      </svg>
    ),
  },
  {
    title: 'Buy / Sell Tax Analysis',
    desc: 'Flags unusually high trade taxes — including contracts that silently raise tax toward 100% after launch to trap sellers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 5 5 19" />
        <circle cx="7.5" cy="7.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Liquidity & Concentration',
    desc: 'Measures DEX liquidity depth and top-holder concentration — thin liquidity or a handful of wallets holding most supply are red flags.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10M12 20V4M20 20v-7" />
      </svg>
    ),
  },
]

export default function SecurityChecks() {
  return (
    <section className="security-checks" id="checks">
      <div className="section-header">
        <h2>Every Check We Run</h2>
        <p>Full-depth analysis on every scan — click any result later to see exactly why it matters.</p>
      </div>

      <div className="checks-grid">
        {checks.map((c) => (
          <div className="check-card" key={c.title}>
            <div className="check-card-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

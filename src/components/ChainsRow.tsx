const otherChains = [
  {
    name: 'Ethereum',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 1.5 4.5 13 12 17l7.5-4L12 1.5z" opacity="0.6" />
        <path d="M12 18.5 4.5 14.3 12 22.5l7.5-8.2L12 18.5z" />
      </svg>
    ),
  },
  {
    name: 'BNB Chain',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2 14.5 4.5 12 7 9.5 4.5 12 2zM5 9l2.5 2.5L5 14 2.5 11.5 5 9zm14 0 2.5 2.5L19 14l-2.5-2.5L19 9zM9.5 14.5 12 12l2.5 2.5L12 17l-2.5-2.5zM12 17 14.5 19.5 12 22 9.5 19.5 12 17z" />
      </svg>
    ),
  },
  {
    name: 'Base',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <circle cx="12" cy="12" r="10" opacity="0.55" />
        <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    name: 'Polygon',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M16.5 8.3 12 5.7 7.5 8.3v5.4L12 16.3l4.5-2.6zM12 3l7.5 4.3v8.6L12 20.2 4.5 15.9V7.3L12 3z" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: 'Arbitrum',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2 21 7v10l-9 5-9-5V7l9-5z" opacity="0.5" />
        <path d="M9.5 8.5 12 13l2.5-4.5M8 16l4-7.5 4 7.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    name: 'Solana',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <rect x="3" y="5" width="18" height="2.4" rx="1.2" />
        <rect x="3" y="10.8" width="18" height="2.4" rx="1.2" opacity="0.6" />
        <rect x="3" y="16.6" width="18" height="2.4" rx="1.2" />
      </svg>
    ),
  },
]

export default function ChainsRow() {
  return (
    <div className="chains-section">
      <a
        className="featured-chain"
        href="https://robinhood.com/us/en/chain/"
        target="_blank"
        rel="noreferrer"
      >
        <div className="featured-chain-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8.5" cy="8.5" r="4.5" />
            <circle cx="15.5" cy="15.5" r="4.5" />
          </svg>
        </div>
        <div className="featured-chain-copy">
          <span className="featured-chain-eyebrow">
            <span className="live-dot" />
            Built first for
          </span>
          <span className="featured-chain-name">Robinhood Chain</span>
          <span className="featured-chain-desc">
            Arbitrum-powered EVM L2 (chain ID 4663), live with Uniswap v2/v3/v4 — scanned in full depth, with every
            check tuned for it first.
          </span>
        </div>
        <span className="featured-chain-cta">robinhood.com/chain ↗</span>
      </a>

      <div className="chains-secondary">
        <span className="chains-secondary-label">Also scans</span>
        <div className="brands">
          {otherChains.map((chain) => (
            <div className="brand-item" key={chain.name}>
              {chain.icon}
              <span>{chain.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

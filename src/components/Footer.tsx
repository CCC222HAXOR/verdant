import { BUY_LINK, TWITTER_LINK } from '../config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="nav-logo">
            <svg className="logo-mark" viewBox="0 0 32 40" aria-hidden="true">
              <path
                d="M16 2 C24 10 28 18 28 25 C28 33 22 38 16 38 C10 38 4 33 4 25 C4 18 8 10 16 2 Z"
                fill="none"
                stroke="#00e676"
                strokeWidth={3}
                strokeLinejoin="round"
              />
              <path d="M10.5 19.5 L16.5 17.5 L13.5 24.5 Z" fill="#062615" />
              <rect x="17.5" y="21" width="6" height="2.4" rx="1.2" fill="#eafff2" />
            </svg>
            VERDANT
          </span>
          <p className="footer-tagline">Trust nothing. Scan everything.</p>
          <p className="footer-blurb">
            Fully automated rug, honeypot, and scam-pattern scanner — built first for Robinhood Chain, and covering
            every major EVM network plus Solana.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Product</span>
          <a href="#scanner">Scanner</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#checker">Scan a Token</a>
          <a href="#docs">Docs &amp; FAQ</a>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Network</span>
          <a href="https://robinhood.com/us/en/chain/" target="_blank" rel="noreferrer">
            Robinhood Chain
          </a>
          <a href="https://robinhoodchain.blockscout.com" target="_blank" rel="noreferrer">
            Chain Explorer ↗
          </a>
          <a href="https://docs.gopluslabs.io" target="_blank" rel="noreferrer">
            Powered by GoPlus Security ↗
          </a>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Community</span>
          <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
            Twitter / X
          </a>
          <a href={BUY_LINK} target="_blank" rel="noreferrer">
            Buy $VERDANT
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} VERDANT. All scan results are automated and informational only — not financial advice.</span>
      </div>
    </footer>
  )
}

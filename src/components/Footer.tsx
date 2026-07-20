import { BUY_LINK, TWITTER_LINK } from '../config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="nav-logo">
            <img className="logo-mark" src="/funkrithm-logo.png" alt="" />
            FUNKRITHM
          </span>
          <p className="footer-tagline">The on-chain crime bureau.</p>
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
            Buy $FUNKRITHM
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} FUNKRITHM. All scan results are automated and informational only — not financial advice.</span>
      </div>
    </footer>
  )
}

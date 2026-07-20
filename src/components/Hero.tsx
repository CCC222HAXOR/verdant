import IconPipeline from './IconPipeline'

export default function Hero() {
  return (
    <section className="hero-card" id="scanner">
      <div className="hero-grid" />

      <IconPipeline />

      <div className="hero-content">
        <span className="hero-eyebrow">&gt; BUREAU_OS // ONLINE_ — The On-Chain Crime Bureau</span>
        <h1 className="hero-heading">
          The simple way
          <strong>to catch rugs before they catch you</strong>
        </h1>
        <p className="hero-sub">
          Fully automated token risk scanner — built first for Robinhood Chain, plus every major EVM network and
          Solana.
          <br />
          Paste a contract or mint address and get an instant verdict.
        </p>
        <a href="#checker" className="btn-cta">
          Scan a Token
        </a>
      </div>
    </section>
  )
}

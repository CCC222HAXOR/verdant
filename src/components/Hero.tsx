import IconPipeline from './IconPipeline'

export default function Hero() {
  return (
    <section className="hero-card" id="scanner">
      <div className="hero-grid" />

      <IconPipeline />

      <div className="hero-content">
        <h1 className="hero-heading">
          The simple way
          <strong>to catch rugs before they catch you</strong>
        </h1>
        <p className="hero-sub">
          Fully automated token risk scanner for EVM and Solana.
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

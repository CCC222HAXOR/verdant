import { FormEvent, useState } from 'react'
import { Check, ChainKind, EVM_CHAINS, ScanResult, scanEvmToken, scanSolanaToken, Verdict } from '../lib/goplus'

const VERDICT_COPY: Record<Verdict, { label: string; className: string }> = {
  low: { label: 'Low Risk', className: 'verdict-low' },
  caution: { label: 'Caution', className: 'verdict-caution' },
  high: { label: 'High Risk', className: 'verdict-high' },
  unknown: { label: 'Unknown', className: 'verdict-unknown' },
}

function StatusDot({ status }: { status: Check['status'] }) {
  return <span className={`status-dot status-${status}`} />
}

export default function Checker() {
  const [chainKind, setChainKind] = useState<ChainKind>('evm')
  const [evmChainId, setEvmChainId] = useState(EVM_CHAINS[0].chainId)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = address.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = chainKind === 'evm' ? await scanEvmToken(evmChainId, trimmed) : await scanSolanaToken(trimmed)
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while scanning this token.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="checker-card" id="checker">
      <div className="checker-header">
        <h2>Token Scanner</h2>
        <p>Paste a contract or mint address to check for honeypots, rug risk, and scam patterns.</p>
      </div>

      <form className="checker-form" onSubmit={handleSubmit}>
        <div className="chain-toggle" role="tablist" aria-label="Chain type">
          <button
            type="button"
            className={chainKind === 'evm' ? 'active' : ''}
            onClick={() => setChainKind('evm')}
          >
            EVM
          </button>
          <button
            type="button"
            className={chainKind === 'solana' ? 'active' : ''}
            onClick={() => setChainKind('solana')}
          >
            Solana
          </button>
        </div>

        <div className="checker-inputs">
          {chainKind === 'evm' && (
            <select
              className="chain-select"
              value={evmChainId}
              onChange={(e) => setEvmChainId(e.target.value)}
              aria-label="EVM chain"
            >
              {EVM_CHAINS.map((c) => (
                <option key={c.id} value={c.chainId}>
                  {c.label}
                </option>
              ))}
            </select>
          )}

          <input
            className="address-input"
            type="text"
            placeholder={chainKind === 'evm' ? '0x contract address' : 'Solana mint address'}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />

          <button type="submit" className="btn-cta scan-btn" disabled={loading || !address.trim()}>
            {loading ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </form>

      {error && <div className="checker-error">{error}</div>}

      {result && (
        <div className="checker-results">
          <div className={`verdict-banner ${VERDICT_COPY[result.verdict].className}`}>
            <div>
              <span className="verdict-label">{VERDICT_COPY[result.verdict].label}</span>
              {(result.tokenName || result.tokenSymbol) && (
                <span className="verdict-token">
                  {result.tokenName}
                  {result.tokenSymbol ? ` (${result.tokenSymbol})` : ''}
                </span>
              )}
            </div>
            {result.explorerUrl && (
              <a className="explorer-link" href={result.explorerUrl} target="_blank" rel="noreferrer">
                View on Explorer ↗
              </a>
            )}
          </div>

          <ul className="checks-list">
            {result.checks.map((check) => (
              <li key={check.id} className="check-row">
                <StatusDot status={check.status} />
                <div>
                  <div className="check-label">{check.label}</div>
                  <div className="check-detail">{check.detail}</div>
                </div>
              </li>
            ))}
          </ul>

          <p className="checker-disclaimer">
            Automated results are informational only and not financial advice. Always verify independently before
            trading.
          </p>
        </div>
      )}
    </section>
  )
}

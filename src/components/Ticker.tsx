const items = [
  'FUNKRITHM — THE ON-CHAIN CRIME BUREAU',
  'ROBINHOOD CHAIN LIVE — CHAIN ID 4663',
  'ARBITRUM-POWERED EVM L2',
  'UNISWAP V2 / V3 / V4 ONCHAIN',
  'REAL-TIME GOPLUS SECURITY DATA',
  'EVM + SOLANA SUPPORTED',
  'HONEYPOT + RUG DETECTION',
  'BUREAU_OS // ONLINE_',
  'NOT FINANCIAL ADVICE — DYOR',
]

export default function Ticker() {
  const track = items.join('   ●   ') + '   ●   '

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span className="ticker-segment">{track}</span>
        <span className="ticker-segment">{track}</span>
      </div>
    </div>
  )
}

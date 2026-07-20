export type ChainKind = 'evm' | 'solana'

export interface EvmChainOption {
  id: string
  chainId: string
  label: string
}

export const EVM_CHAINS: EvmChainOption[] = [
  { id: 'eth', chainId: '1', label: 'Ethereum' },
  { id: 'bsc', chainId: '56', label: 'BNB Chain' },
  { id: 'base', chainId: '8453', label: 'Base' },
  { id: 'polygon', chainId: '137', label: 'Polygon' },
  { id: 'arbitrum', chainId: '42161', label: 'Arbitrum' },
]

export type CheckStatus = 'good' | 'warn' | 'danger' | 'unknown'

export interface Check {
  id: string
  label: string
  status: CheckStatus
  detail: string
}

export type Verdict = 'low' | 'caution' | 'high' | 'unknown'

export interface ScanResult {
  tokenName: string | null
  tokenSymbol: string | null
  checks: Check[]
  verdict: Verdict
  raw: unknown
}

const GOPLUS_BASE = 'https://api.gopluslabs.io/api/v1'

class GoPlusError extends Error {}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new GoPlusError(`Request failed (${res.status})`)
  }
  return res.json()
}

function pct(value: string | number | undefined | null): string {
  if (value === undefined || value === null || value === '') return 'unknown'
  const n = Number(value)
  if (Number.isNaN(n)) return 'unknown'
  return `${(n * 100).toFixed(1)}%`
}

function flag(value: unknown): boolean {
  return value === '1' || value === 1 || value === true
}

function verdictFromChecks(checks: Check[]): Verdict {
  if (checks.every((c) => c.status === 'unknown')) return 'unknown'
  const dangerCount = checks.filter((c) => c.status === 'danger').length
  const warnCount = checks.filter((c) => c.status === 'warn').length
  if (dangerCount >= 1) return 'high'
  if (warnCount >= 2) return 'caution'
  if (warnCount === 1) return 'caution'
  return 'low'
}

export async function scanEvmToken(chainId: string, address: string): Promise<ScanResult> {
  const url = `${GOPLUS_BASE}/token_security/${chainId}?contract_addresses=${address.toLowerCase()}`
  const json = await fetchJson(url)
  if (json.code !== 1) {
    throw new GoPlusError(json.message || 'Lookup failed')
  }
  const result = json.result?.[address.toLowerCase()]
  if (!result) {
    throw new GoPlusError('No data returned for this address on the selected chain.')
  }

  const checks: Check[] = []

  checks.push({
    id: 'honeypot',
    label: 'Honeypot (can you sell?)',
    status: flag(result.is_honeypot) ? 'danger' : 'good',
    detail: flag(result.is_honeypot)
      ? 'Simulation shows this token cannot be sold after buying.'
      : 'Simulation shows the token can be sold.',
  })

  checks.push({
    id: 'open_source',
    label: 'Contract verified / open source',
    status: result.is_open_source === undefined ? 'unknown' : flag(result.is_open_source) ? 'good' : 'danger',
    detail: flag(result.is_open_source)
      ? 'Source code is verified and readable.'
      : 'Source code is not verified — contract behavior cannot be fully audited.',
  })

  checks.push({
    id: 'ownership',
    label: 'Ownership renounced',
    status:
      result.owner_address === undefined
        ? 'unknown'
        : result.owner_address === '0x0000000000000000000000000000000000000000' || result.owner_address === ''
          ? 'good'
          : flag(result.can_take_back_ownership)
            ? 'danger'
            : 'warn',
    detail:
      result.owner_address === '0x0000000000000000000000000000000000000000' || result.owner_address === ''
        ? 'Ownership has been renounced.'
        : flag(result.can_take_back_ownership)
          ? 'An owner exists and can reclaim ownership after renouncing.'
          : `An active owner address can still call privileged functions (${result.owner_address ?? 'unknown'}).`,
  })

  checks.push({
    id: 'mintable',
    label: 'Mintable supply',
    status: result.is_mintable === undefined ? 'unknown' : flag(result.is_mintable) ? 'warn' : 'good',
    detail: flag(result.is_mintable)
      ? 'The contract owner can mint new tokens, diluting holders.'
      : 'No function allows minting additional supply.',
  })

  checks.push({
    id: 'blacklist',
    label: 'Blacklist function',
    status: result.is_blacklisted === undefined ? 'unknown' : flag(result.is_blacklisted) ? 'warn' : 'good',
    detail: flag(result.is_blacklisted)
      ? 'The contract can block specific wallets from trading.'
      : 'No blacklist function detected.',
  })

  checks.push({
    id: 'pausable',
    label: 'Trading can be paused',
    status: result.transfer_pausable === undefined ? 'unknown' : flag(result.transfer_pausable) ? 'warn' : 'good',
    detail: flag(result.transfer_pausable)
      ? 'The owner can pause all transfers at will.'
      : 'Transfers cannot be paused.',
  })

  checks.push({
    id: 'hidden_owner',
    label: 'Hidden owner',
    status: result.hidden_owner === undefined ? 'unknown' : flag(result.hidden_owner) ? 'danger' : 'good',
    detail: flag(result.hidden_owner)
      ? 'Ownership control is hidden from standard checks.'
      : 'No hidden owner pattern detected.',
  })

  checks.push({
    id: 'selfdestruct',
    label: 'Self-destruct function',
    status: result.selfdestruct === undefined ? 'unknown' : flag(result.selfdestruct) ? 'danger' : 'good',
    detail: flag(result.selfdestruct)
      ? 'Contract can be destroyed, potentially freezing all funds.'
      : 'No self-destruct function detected.',
  })

  const buyTax = Number(result.buy_tax ?? 0)
  const sellTax = Number(result.sell_tax ?? 0)
  const highTax = buyTax > 0.15 || sellTax > 0.15
  checks.push({
    id: 'tax',
    label: 'Buy / sell tax',
    status: result.buy_tax === undefined ? 'unknown' : highTax ? 'warn' : 'good',
    detail: `Buy tax ${pct(result.buy_tax)}, sell tax ${pct(result.sell_tax)}.`,
  })

  return {
    tokenName: result.token_name ?? null,
    tokenSymbol: result.token_symbol ?? null,
    checks,
    verdict: verdictFromChecks(checks),
    raw: result,
  }
}

export async function scanSolanaToken(mintAddress: string): Promise<ScanResult> {
  const url = `${GOPLUS_BASE}/solana/token_security?contract_addresses=${mintAddress}`
  const json = await fetchJson(url)
  if (json.code !== 1) {
    throw new GoPlusError(json.message || 'Lookup failed')
  }
  const result = json.result?.[mintAddress]
  if (!result) {
    throw new GoPlusError('No data returned for this mint address.')
  }

  const checks: Check[] = []

  checks.push({
    id: 'mint_authority',
    label: 'Mint authority',
    status: result.mintable?.status === undefined ? 'unknown' : flag(result.mintable?.status) ? 'danger' : 'good',
    detail: flag(result.mintable?.status)
      ? 'Mint authority is still active — supply can be inflated at any time.'
      : 'Mint authority has been revoked.',
  })

  checks.push({
    id: 'freeze_authority',
    label: 'Freeze authority',
    status: result.freezable?.status === undefined ? 'unknown' : flag(result.freezable?.status) ? 'warn' : 'good',
    detail: flag(result.freezable?.status)
      ? 'Freeze authority is active — holder accounts can be frozen.'
      : 'Freeze authority has been revoked.',
  })

  checks.push({
    id: 'balance_mutable',
    label: 'Balance mutable authority',
    status:
      result.balance_mutable_authority?.status === undefined
        ? 'unknown'
        : flag(result.balance_mutable_authority?.status)
          ? 'danger'
          : 'good',
    detail: flag(result.balance_mutable_authority?.status)
      ? 'An authority can directly alter holder balances.'
      : 'No authority can alter balances directly.',
  })

  checks.push({
    id: 'closable',
    label: 'Closable mint',
    status: result.closable?.status === undefined ? 'unknown' : flag(result.closable?.status) ? 'warn' : 'good',
    detail: flag(result.closable?.status)
      ? 'The mint account can be closed by an authority.'
      : 'The mint account cannot be closed.',
  })

  checks.push({
    id: 'non_transferable',
    label: 'Transferable',
    status: result.non_transferable === undefined ? 'unknown' : flag(result.non_transferable) ? 'danger' : 'good',
    detail: flag(result.non_transferable)
      ? 'Token is flagged as non-transferable.'
      : 'Token transfers normally between wallets.',
  })

  const dexList: Array<{ tvl?: string }> = Array.isArray(result.dex) ? result.dex : []
  const totalTvl = dexList.reduce((sum, d) => sum + (Number(d.tvl) || 0), 0)
  checks.push({
    id: 'liquidity',
    label: 'DEX liquidity',
    status: dexList.length === 0 ? 'warn' : totalTvl < 5000 ? 'warn' : 'good',
    detail:
      dexList.length === 0
        ? 'No DEX liquidity pool found for this token.'
        : `Approx. $${totalTvl.toLocaleString(undefined, { maximumFractionDigits: 0 })} in tracked liquidity across ${dexList.length} pool(s).`,
  })

  const holders: Array<{ percent?: string }> = Array.isArray(result.holders) ? result.holders : []
  const top10 = holders.slice(0, 10).reduce((sum, h) => sum + (Number(h.percent) || 0), 0)
  checks.push({
    id: 'concentration',
    label: 'Top holder concentration',
    status: holders.length === 0 ? 'unknown' : top10 > 0.5 ? 'warn' : 'good',
    detail: holders.length === 0 ? 'Holder data unavailable.' : `Top 10 holders control ${pct(top10)} of supply.`,
  })

  return {
    tokenName: result.metadata?.name || null,
    tokenSymbol: result.metadata?.symbol || null,
    checks,
    verdict: verdictFromChecks(checks),
    raw: result,
  }
}

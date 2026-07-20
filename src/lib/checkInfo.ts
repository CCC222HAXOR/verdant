export interface CheckInfo {
  title: string
  why: string
  goodMeans: string
  badMeans: string
}

export const CHECK_INFO: Record<string, CheckInfo> = {
  honeypot: {
    title: 'Honeypot Simulation',
    why: 'A honeypot contract lets you buy a token but blocks or taxes-to-zero any attempt to sell it — the single most common rug mechanic. GoPlus simulates a real buy-then-sell round trip against the contract to catch this before you risk real funds.',
    goodMeans: 'The simulated sell succeeded — the contract does not block sales for a normal wallet.',
    badMeans: 'The simulated sell failed or was blocked. Funds sent to buy this token may be effectively unsellable.',
  },
  open_source: {
    title: 'Contract Verified / Open Source',
    why: 'Verified source code means the deployed bytecode matches human-readable Solidity that anyone can audit line by line. Unverified contracts can hide arbitrary logic — mint backdoors, transfer blocks, disguised owner privileges — with nothing public to check it against.',
    goodMeans: 'Source is published and matches the deployed bytecode — behavior can be independently audited.',
    badMeans: 'No verified source is available. The contract could contain undisclosed logic that no one outside the deployer can inspect.',
  },
  ownership: {
    title: 'Ownership Renounced',
    why: "Most token contracts have an owner address with privileged powers — pausing trades, minting new supply, blacklisting wallets. If ownership hasn't been renounced (sent to a null address), that owner retains the ability to use those powers at any time, including after launch looks stable.",
    goodMeans: 'Ownership has been renounced — no address retains privileged control over the contract.',
    badMeans: 'An active owner address still exists and can call privileged functions on this contract.',
  },
  mintable: {
    title: 'Mintable Supply',
    why: "If a contract can mint new tokens after deployment, the circulating supply isn't fixed — the owner can print more tokens at will, diluting every existing holder's share without warning.",
    goodMeans: 'No function in the contract can create additional supply beyond what already exists.',
    badMeans: 'The contract owner can mint new tokens on demand, which can silently dilute your holdings.',
  },
  blacklist: {
    title: 'Blacklist Function',
    why: 'A blacklist function lets the contract owner block specific wallet addresses from transferring or selling their tokens — commonly used to trap large or unwanted holders after they buy in.',
    goodMeans: 'No blacklist mechanism was found in the contract.',
    badMeans: 'The owner can add any wallet to a blacklist, blocking that wallet from trading the token.',
  },
  pausable: {
    title: 'Trading Can Be Paused',
    why: 'Some contracts include a kill-switch that freezes all transfers network-wide. Legitimate for emergency security response in theory, but it also means the owner can halt trading at the exact moment they choose — for example, right before dumping their own bag.',
    goodMeans: 'Transfers cannot be globally paused by any privileged address.',
    badMeans: 'The owner holds a switch that can freeze all trading for every holder at any time.',
  },
  hidden_owner: {
    title: 'Hidden Owner',
    why: 'Some contracts are written to obscure who actually controls owner-level functions — routing privileged calls through a proxy or renamed variable so standard ownership checks come back clean while control still exists behind the scenes.',
    goodMeans: 'No hidden-owner pattern was detected by static analysis.',
    badMeans: 'Ownership control appears to be concealed from standard checks — treat this as a strong red flag.',
  },
  selfdestruct: {
    title: 'Self-Destruct Function',
    why: "A self-destruct call can remove the contract's code entirely, which can permanently freeze or destroy any funds and logic tied to it — a rarely-legitimate, high-severity capability in a token contract.",
    goodMeans: 'No self-destruct function exists in this contract.',
    badMeans: 'The contract can be destroyed on-chain, which can permanently strand or destroy associated funds.',
  },
  tax: {
    title: 'Buy / Sell Tax',
    why: 'Many legitimate tokens apply a small tax on trades for liquidity or treasury funding. The risk is scale: taxes above roughly 15% are unusual outside a deliberate scam, and some malicious contracts silently raise tax to 99%+ after launch to trap sellers.',
    goodMeans: 'Buy and sell tax are both in a normal range for a legitimate token.',
    badMeans: 'Buy and/or sell tax is unusually high, which can eat most or all of a trade’s value.',
  },
  mint_authority: {
    title: 'Mint Authority (Solana)',
    why: "On Solana, the mint authority is the account allowed to create new units of a token. If it hasn't been revoked, whoever holds it can inflate supply at any time — the direct Solana equivalent of an EVM mint backdoor.",
    goodMeans: 'Mint authority has been revoked — total supply is fixed and can no longer be inflated.',
    badMeans: 'Mint authority is still active, meaning supply can be increased at any time by whoever holds it.',
  },
  freeze_authority: {
    title: 'Freeze Authority (Solana)',
    why: 'A live freeze authority lets its holder lock individual token accounts, preventing specific wallets from moving their balance — the SPL-token equivalent of a blacklist function.',
    goodMeans: 'Freeze authority has been revoked — no account can be frozen by the token.',
    badMeans: 'Freeze authority is still active — individual holder accounts can be frozen at will.',
  },
  balance_mutable: {
    title: 'Balance Mutable Authority',
    why: 'A small number of Solana token programs expose a function that lets a privileged authority directly edit holder balances, bypassing normal transfer rules entirely.',
    goodMeans: 'No authority can directly alter holder balances outside of normal transfers.',
    badMeans: 'A privileged authority can directly rewrite holder balances at will — an extreme and rare risk.',
  },
  closable: {
    title: 'Closable Mint',
    why: 'Some Solana mints can be closed by an authority, which can affect the ability to interact with the token account going forward.',
    goodMeans: 'The mint account cannot be closed by any authority.',
    badMeans: 'An authority retains the ability to close this mint account.',
  },
  non_transferable: {
    title: 'Transferability',
    why: "A small subset of SPL tokens are deliberately flagged non-transferable (e.g. soulbound-style tokens). For a token you intend to trade, this flag being set means you likely can't move it between wallets at all.",
    goodMeans: 'The token transfers normally between wallets, as expected for a tradeable asset.',
    badMeans: 'This token is flagged as non-transferable — it may not be movable between wallets at all.',
  },
  liquidity: {
    title: 'DEX Liquidity',
    why: 'Liquidity is the pool of paired assets (e.g. token/SOL or token/ETH) that lets you actually exit a position. Thin or absent liquidity means even a small sell can crash the price, or there may be no way to sell at all.',
    goodMeans: 'A meaningful amount of liquidity was found across tracked DEX pools.',
    badMeans: 'Liquidity is very thin or no pool was found — exiting a position may be difficult or costly.',
  },
  concentration: {
    title: 'Top Holder Concentration',
    why: "If a small number of wallets hold most of the supply, any one of them dumping can move the price sharply against everyone else — and concentrated holdings are a common sign of an insider or team-controlled float dressed up as a public token.",
    goodMeans: "The top 10 holders control a reasonable share of supply relative to the total.",
    badMeans: 'The top 10 holders control a large majority of supply — price is highly exposed to a small number of wallets.',
  },
}

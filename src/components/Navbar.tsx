import { useEffect, useState } from 'react'
import { BUY_LINK, CONTRACT_ADDRESS, TWITTER_LINK } from '../config'

function truncateAddress(address: string) {
  if (address.length <= 12) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function CaButton() {
  const [copied, setCopied] = useState(false)
  const address = CONTRACT_ADDRESS

  if (!address) {
    return (
      <span className="btn-pill btn-ca" aria-disabled="true">
        <span className="ca-dot" />
        CA: TBA
      </span>
    )
  }

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable; ignore
    }
  }

  return (
    <button type="button" className="btn-pill btn-ca" onClick={handleClick}>
      <span className="ca-dot" />
      {copied ? 'Copied!' : truncateAddress(address)}
    </button>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav className="navbar">
      <span className="nav-logo">
        <span className="logo-dot" />
        VERDANT
      </span>

      <button
        type="button"
        className={`menu-toggle${menuOpen ? ' active' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <div className={`nav-menu${menuOpen ? ' active' : ''}`}>
        <ul className="nav-links">
          <li>
            <a href="#scanner" onClick={() => setMenuOpen(false)}>
              Scanner
            </a>
          </li>
          <li>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
          </li>
          <li>
            <a href="#docs" onClick={() => setMenuOpen(false)}>
              Docs
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <CaButton />
          <a
            className="btn-pill btn-twitter"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="VERDANT on X (Twitter)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.5-7.2L4.4 22H1.3l8.1-9.3L1 2h7.3l5 6.6L18.9 2zm-1.2 18h1.9L7.4 4h-2l12.3 16z" />
            </svg>
          </a>
          <a className="btn-pill btn-buy" href={BUY_LINK} target="_blank" rel="noreferrer">
            Buy $VERDANT
          </a>
        </div>
      </div>
    </nav>
  )
}

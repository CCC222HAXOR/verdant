import { useEffect } from 'react'
import { Check } from '../lib/goplus'
import { CHECK_INFO } from '../lib/checkInfo'

const STATUS_COPY: Record<Check['status'], string> = {
  good: 'Passed',
  warn: 'Caution',
  danger: 'High Risk',
  unknown: 'Unknown',
}

export default function CheckModal({ check, onClose }: { check: Check; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const info = CHECK_INFO[check.id]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <span className={`modal-status status-${check.status}`}>{STATUS_COPY[check.status]}</span>
        <h3 className="modal-title">{info?.title ?? check.label}</h3>
        <p className="modal-result">{check.detail}</p>

        {info && (
          <>
            <div className="modal-section">
              <span className="modal-section-label">Why it matters</span>
              <p>{info.why}</p>
            </div>
            <div className="modal-section">
              <span className="modal-section-label">
                {check.status === 'good' ? 'What this result means' : 'What to watch for'}
              </span>
              <p>{check.status === 'good' ? info.goodMeans : info.badMeans}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

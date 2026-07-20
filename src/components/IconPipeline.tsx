import { useEffect, useRef } from 'react'

type Phase = 'p1' | 'splash' | 'p2' | 'idle'

const DURATIONS: Record<Phase, number> = {
  p1: 800,
  splash: 800,
  p2: 800,
  idle: 1000,
}

export default function IconPipeline() {
  const pipelineRef = useRef<HTMLDivElement>(null)
  const nodeStackRef = useRef<HTMLDivElement>(null)
  const nodeXRef = useRef<HTMLDivElement>(null)
  const nodeShieldRef = useRef<HTMLDivElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const corePathRef = useRef<SVGPathElement>(null)
  const gradientRef = useRef<SVGLinearGradientElement>(null)
  const splashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pipeline = pipelineRef.current
    const nodeStack = nodeStackRef.current
    const nodeX = nodeXRef.current
    const nodeShield = nodeShieldRef.current
    const glowPath = glowPathRef.current
    const corePath = corePathRef.current
    const gradient = gradientRef.current
    const splash = splashRef.current
    if (!pipeline || !nodeStack || !nodeX || !nodeShield || !glowPath || !corePath || !gradient || !splash) {
      return
    }

    let startX = 0,
      startY = 0,
      midX = 0,
      midY = 0,
      endX = 0,
      endY = 0

    const recomputePath = () => {
      const pRect = pipeline.getBoundingClientRect()
      const sRect = nodeStack.getBoundingClientRect()
      const xRect = nodeX.getBoundingClientRect()
      const shRect = nodeShield.getBoundingClientRect()

      startX = sRect.left + sRect.width / 2 - pRect.left
      startY = sRect.top + sRect.height / 2 - pRect.top
      midX = xRect.left + xRect.width / 2 - pRect.left
      midY = xRect.top + xRect.height / 2 - pRect.top
      endX = shRect.left + shRect.width / 2 - pRect.left
      endY = shRect.top + shRect.height / 2 - pRect.top

      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`
      glowPath.setAttribute('d', d)
      corePath.setAttribute('d', d)
    }

    recomputePath()
    window.addEventListener('resize', recomputePath)

    const setGradientWindow = (percentage: number) => {
      const halfWidth = 5
      const center = percentage * 100
      gradient.setAttribute('x1', `${center - halfWidth}%`)
      gradient.setAttribute('x2', `${center + halfWidth}%`)
      gradient.setAttribute('y1', '0%')
      gradient.setAttribute('y2', '0%')
    }

    let phase: Phase = 'p1'
    let lastStateChange = performance.now()
    let rafId = 0

    const setBeamOpacity = (value: string) => {
      glowPath.style.opacity = value
      corePath.style.opacity = value
    }

    const tick = (now: number) => {
      const elapsed = now - lastStateChange

      if (phase === 'p1') {
        const t = Math.min(elapsed / DURATIONS.p1, 1)
        const percentage = t * 0.5
        setGradientWindow(percentage)

        if (percentage < 0.4) {
          nodeStack.classList.add('active')
        } else {
          nodeStack.classList.remove('active')
        }

        if (elapsed >= DURATIONS.p1) {
          nodeStack.classList.remove('active')
          phase = 'splash'
          lastStateChange = now
          setBeamOpacity('0')
          splash.classList.add('animate')
        }
      } else if (phase === 'splash') {
        if (elapsed >= DURATIONS.splash) {
          phase = 'p2'
          lastStateChange = now
          splash.classList.remove('animate')
          setBeamOpacity('1')
        }
      } else if (phase === 'p2') {
        const t = Math.min(elapsed / DURATIONS.p2, 1)
        const percentage = 0.5 + t * 0.5
        setGradientWindow(percentage)

        if (percentage > 0.6) {
          nodeShield.classList.add('active')
        }

        if (elapsed >= DURATIONS.p2) {
          nodeShield.classList.remove('active')
          phase = 'idle'
          lastStateChange = now
        }
      } else if (phase === 'idle') {
        if (elapsed >= DURATIONS.idle) {
          phase = 'p1'
          lastStateChange = now
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', recomputePath)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="icon-pipeline" ref={pipelineRef}>
      <svg className="beam-svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" ref={gradientRef}>
            <stop offset="0%" stopColor="#00C805" stopOpacity="0" />
            <stop offset="20%" stopColor="#00C805" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fff" stopOpacity="1" />
            <stop offset="80%" stopColor="#73E176" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#73E176" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path ref={glowPathRef} stroke="url(#beam-gradient)" strokeWidth={2} filter="url(#glow)" fill="none" opacity={0.6} />
        <path ref={corePathRef} stroke="url(#beam-gradient)" strokeWidth={0.8} fill="none" />
      </svg>

      <div className="icon-node node-light-right" id="node-stack" ref={nodeStackRef}>
        <svg viewBox="0 0 24 24">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>

      <div className="pipeline-line" />

      <div className="center-wrapper">
        <div className="splash" ref={splashRef} />
        <div className="icon-node-center" id="node-x" ref={nodeXRef}>
          <svg viewBox="0 0 40 40">
            <path d="M20 4 L34 11 V22 C34 30 28 35.5 20 38 C12 35.5 6 30 6 22 V11 Z M20 8.6 L10 13.3 V22 C10 27.7 14.3 31.8 20 33.9 C25.7 31.8 30 27.7 30 22 V13.3 Z" />
            <path d="M14.5 20.5 L18.3 24.5 L26 15.5" fill="none" stroke="#06120b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="pipeline-line right" />

      <div className="icon-node node-light-left" id="node-shield" ref={nodeShieldRef}>
        <svg viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </div>
    </div>
  )
}

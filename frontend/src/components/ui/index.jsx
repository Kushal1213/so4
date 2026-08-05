import { motion, useReducedMotion } from 'motion/react'

/** High-end double-bezel surface (Skill 7) */
export function BezelCard({ children, className = '', elevated = false }) {
  return (
    <div
      className={`rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/[0.08] ${
        elevated ? 'shadow-soft' : ''
      } ${className}`}
    >
      <div className="rounded-[calc(1.75rem-0.375rem)] bg-night-800/90 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {children}
      </div>
    </div>
  )
}

export function MetricTile({ label, value, unit = '', trend }) {
  return (
    <BezelCard>
      <p className="text-[12px] font-medium tracking-wide text-white/45">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-moon-300 tabular">
        {value}
        {unit && <span className="ml-1 font-sans text-base font-normal text-white/50">{unit}</span>}
      </p>
      {trend && <p className="mt-2 text-sm text-white/55 text-pretty">{trend}</p>}
    </BezelCard>
  )
}

export function PageHeader({ title, description, action }) {
  const reduce = useReducedMotion()
  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
      className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-[65ch] text-base font-normal leading-relaxed text-white/60 text-pretty">
            {description}
          </p>
        )}
      </div>
      {action}
    </motion.header>
  )
}

export function LoadingGrid({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative h-32 overflow-hidden rounded-[1.75rem] bg-white/[0.04] ring-1 ring-white/[0.06]">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <BezelCard className="col-span-full">
      <div className="py-12 text-left sm:py-14">
        <h3 className="font-display text-xl font-semibold text-white text-balance">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55 text-pretty">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </BezelCard>
  )
}

/** Nested island CTA (Skill 7) */
export function PillButton({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const styles = {
    primary: 'bg-moon-300 text-night-950 hover:bg-moon-200',
    ghost: 'bg-white/[0.06] text-white hover:bg-white/10 ring-1 ring-white/15',
    subtle: 'bg-moon-300/12 text-moon-200 hover:bg-moon-300/20',
    link: 'bg-transparent px-0 text-moon-300 underline-offset-4 hover:underline',
  }
  return (
    <button
      type={type}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function CtaArrow() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-night-950/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function RiskBadge({ level }) {
  const colors = {
    high: 'bg-red-500/12 text-red-300 ring-red-400/20',
    moderate: 'bg-amber-500/12 text-amber-200 ring-amber-400/20',
    low: 'bg-emerald-500/12 text-emerald-200 ring-emerald-400/20',
  }
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium capitalize tracking-wide ring-1 ${
        colors[level] || colors.low
      }`}
    >
      {level}
    </span>
  )
}

export function SectionGrid({ children, cols = 2 }) {
  const gridClass =
    cols === 3 ? 'xl:grid-cols-3' : cols === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-2'
  return <div className={`grid gap-4 ${gridClass}`}>{children}</div>
}

export function InlineError({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-3 text-sm text-red-300">
      {message}
    </p>
  )
}

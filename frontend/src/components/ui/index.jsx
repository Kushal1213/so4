import { motion, useReducedMotion } from 'motion/react'

export function BezelCard({ children, className = '', glow = false }) {
  return (
    <div className={`rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10 ${glow ? 'shadow-glow' : ''} ${className}`}>
      <div className="rounded-[calc(1.75rem-0.375rem)] bg-night-800/80 p-5 shadow-bezel backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}

export function MetricTile({ label, value, unit = '', trend, accent = 'moon' }) {
  const accentClass = accent === 'dream' ? 'text-dream-400' : 'text-moon-300'
  return (
    <BezelCard>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">{label}</p>
      <p className={`mt-3 font-display text-3xl font-semibold tracking-tight ${accentClass}`}>
        {value}
        {unit && <span className="ml-1 text-base font-normal text-white/50">{unit}</span>}
      </p>
      {trend && <p className="mt-2 text-sm text-white/55">{trend}</p>}
    </BezelCard>
  )
}

export function PageHeader({ title, description, action }) {
  const reduce = useReducedMotion()
  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-white/60">{description}</p>}
      </div>
      {action}
    </motion.header>
  )
}

export function LoadingGrid({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-[1.75rem] bg-white/5" />
      ))}
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <BezelCard className="col-span-full">
      <div className="py-10 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/55">{description}</p>
        {action && <div className="mt-5">{action}</div>}
      </div>
    </BezelCard>
  )
}

export function PillButton({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const styles = {
    primary: 'bg-moon-400 text-night-950 hover:bg-moon-300',
    ghost: 'bg-white/5 text-white hover:bg-white/10 ring-1 ring-white/10',
    subtle: 'bg-dream-400/15 text-dream-400 hover:bg-dream-400/25',
  }
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function RiskBadge({ level }) {
  const colors = {
    high: 'bg-red-500/15 text-red-300 ring-red-400/20',
    moderate: 'bg-amber-500/15 text-amber-200 ring-amber-400/20',
    low: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/20',
  }
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${colors[level] || colors.low}`}>
      {level}
    </span>
  )
}

export function SectionGrid({ children, cols = 2 }) {
  const gridClass = cols === 3 ? 'xl:grid-cols-3' : cols === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-2'
  return <div className={`grid gap-4 ${gridClass}`}>{children}</div>
}

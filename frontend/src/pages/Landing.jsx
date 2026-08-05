import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MoonStars } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { BezelCard, PillButton } from '../components/ui'

const modules = [
  { title: 'AI Sleep Assessment', copy: '12 predictive metrics from one intake.' },
  { title: 'Personal Dashboard', copy: 'Scores, trends, debt, and recovery at a glance.' },
  { title: 'AI Sleep Coach', copy: 'Daily bedtime, caffeine, and recovery guidance.' },
  { title: 'Explainable AI', copy: 'Every risk score shows why it changed.' },
]

const integrations = ['Apple Watch', 'Fitbit', 'Garmin', 'WHOOP', 'Samsung Watch']

export default function Landing() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-[100dvh] bg-night-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(91,124,250,0.18),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(139,124,246,0.12),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-moon-400/15 text-moon-300 ring-1 ring-moon-400/25">
            <MoonStars size={22} weight="fill" />
          </div>
          <span className="font-display text-lg font-semibold">Sleep Oracle</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/65 lg:flex">
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#architecture" className="hover:text-white">Architecture</a>
          <Link to="/app/dashboard" className="hover:text-white">Open app</Link>
        </nav>
        <Link to="/app/assessment">
          <PillButton>Start assessment</PillButton>
        </Link>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <section className="grid min-h-[calc(100dvh-5rem)] items-center gap-10 pb-16 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-moon-300">Sleep Intelligence Platform</p>
            <h1 className="max-w-[12ch] font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
              The operating system for sleep health.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              End-to-end sleep assessment, coaching, recovery analytics, and explainable AI for individuals, clinicians, and organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app/dashboard">
                <PillButton>
                  Open dashboard
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-night-950/10">
                    <ArrowRight size={16} weight="bold" />
                  </span>
                </PillButton>
              </Link>
              <Link to="/app/roadmap">
                <PillButton variant="ghost">View roadmap</PillButton>
              </Link>
            </div>
          </motion.div>

          <BezelCard glow className="lg:justify-self-end">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">Tonight&apos;s sleep score</p>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-200">Live demo</span>
              </div>
              <p className="font-display text-6xl font-semibold tracking-tight text-moon-300">74</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-xs text-white/45">Sleep debt</p>
                  <p className="mt-1 font-mono text-lg text-white">2.4h</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-xs text-white/45">Recovery</p>
                  <p className="mt-1 font-mono text-lg text-white">68%</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/55">
                Going to bed before 10:45 PM for the next three nights can reduce sleep debt by up to 75%.
              </p>
            </div>
          </BezelCard>
        </section>

        <section id="platform" className="border-t border-white/10 py-20">
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            One niche. One platform. Complete sleep intelligence.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {modules.map((module, index) => (
              <BezelCard key={module.title}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                    <p className="mt-2 text-sm text-white/55">{module.copy}</p>
                  </div>
                  <span className="font-mono text-sm text-white/25">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </BezelCard>
            ))}
          </div>
        </section>

        <section id="architecture" className="border-t border-white/10 py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">Production-ready architecture</h2>
              <p className="mt-4 max-w-md text-white/60">
                React frontend, Flask API gateway, prediction services, PostgreSQL, Redis, MLflow, Docker, and GitHub Actions.
              </p>
            </div>
            <BezelCard>
              <pre className="overflow-x-auto font-mono text-xs leading-6 text-white/70">
{`React / Vite
  -> API Gateway
  -> Authentication
  -> Sleep Assessment Service
  -> Prediction Service
  -> Recommendation Engine
  -> LLM Sleep Coach
  -> Analytics Service
  -> PostgreSQL / Redis / MLflow`}
              </pre>
            </BezelCard>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {integrations.map((device) => (
              <span key={device} className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/65 ring-1 ring-white/10">
                {device}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 px-4 py-8 text-sm text-white/45 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>Sleep Oracle - AI Sleep Intelligence Platform</p>
          <p>Screening aid only. Not medical advice.</p>
        </div>
      </footer>
    </div>
  )
}

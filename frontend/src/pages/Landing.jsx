import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChartLineUp, ChatCircleDots, ShieldCheck } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { CtaArrow, PillButton } from '../components/ui'
import { BrandLockup } from '../components/Brand'
import DesirePin from '../components/DesirePin'

const listModules = [
  {
    n: '02',
    title: 'Personal dashboard',
    copy: 'A real-time view of your sleep health and key insights.',
    Icon: ChartLineUp,
  },
  {
    n: '03',
    title: 'AI sleep coach',
    copy: 'Personalized guidance that adapts to you, every night.',
    Icon: ChatCircleDots,
  },
  {
    n: '04',
    title: 'Explainable risk',
    copy: 'Clear, data-backed insights into your sleep health risks.',
    Icon: ShieldCheck,
  },
]

const integrations = [
  { name: 'Apple', slug: 'apple' },
  { name: 'Fitbit', slug: 'fitbit' },
  { name: 'Garmin', slug: 'garmin' },
  { name: 'WHOOP', slug: 'whoop' },
  { name: 'Samsung', slug: 'samsung' },
]

export default function Landing() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-night-950 text-white">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-nav flex justify-center px-4 pt-5">
        <div className="flex h-14 w-full max-w-shell items-center justify-between rounded-full bg-night-950/55 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 backdrop-blur-2xl lg:px-6">
          <Link to="/" className="opacity-95">
            <BrandLockup markSize={24} />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-white/70 lg:flex" aria-label="Primary">
            <a href="#platform" className="transition-colors hover:text-white">
              Platform
            </a>
            <a href="#architecture" className="transition-colors hover:text-white">
              Architecture
            </a>
            <Link to="/app/dashboard" className="transition-colors hover:text-white">
              Open app
            </Link>
          </nav>
          <Link to="/app/assessment">
            <PillButton className="!py-2 !px-4">Start assessment</PillButton>
          </Link>
        </div>
      </header>

      <main id="main">
        {/* Section 1: Hero matches section-01-hero.png — bottom-left / top-left over full-bleed */}
        <section className="relative isolate min-h-[100dvh] overflow-hidden">
          <img
            src="/brand/sleep-oracle-hero-night.png"
            alt="Quiet night bedroom overlooking a coastal skyline"
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/55 to-night-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-night-950/80 via-night-950/35 to-transparent" />

          <div className="relative mx-auto flex min-h-[100dvh] max-w-shell flex-col justify-end px-4 pb-16 pt-28 lg:justify-center lg:px-8 lg:pb-24 lg:pt-20">
            <motion.div
              className="max-w-xl"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <h1 className="max-w-5xl font-display text-[clamp(3rem,5vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-moon-300 text-balance">
                Sleep Oracle
              </h1>
              <p className="mt-5 max-w-[28ch] text-lg font-normal leading-relaxed text-white/85 text-pretty">
                Measure tonight. Improve tomorrow.
              </p>
              <div className="mt-8">
                <Link to="/app/dashboard">
                  <PillButton>
                    Open dashboard
                    <CtaArrow />
                  </PillButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Trust */}
        <section className="border-y border-white/10 bg-night-900/70" aria-label="Wearable integrations">
          <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-6 px-4 py-8 lg:px-8">
            <p className="text-sm text-white/45">Works with</p>
            <ul className="flex flex-wrap items-center gap-10">
              {integrations.map((item) => (
                <li key={item.slug}>
                  <img
                    src={`https://cdn.simpleicons.org/${item.slug}/a8cfbc`}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="opacity-90"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: Platform matches section-03 */}
        <section id="platform" className="mx-auto max-w-shell overflow-x-hidden px-4 py-32 md:py-48 lg:px-8">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            One niche. Complete sleep intelligence.
          </h2>
          <p className="mt-4 max-w-[48ch] text-white/60 text-pretty">
            From intake to recovery plans for individuals, clinicians, and organizations.
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <article className="relative min-h-[320px] overflow-hidden rounded-xl lg:col-span-5">
              <img
                src="/brand/sleep-oracle-platform-texture.png"
                alt="Dark teal fabric texture"
                className="absolute inset-0 h-full w-full object-cover"
                width={1200}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6 lg:p-8">
                <h3 className="font-display text-2xl font-semibold text-white">AI sleep assessment</h3>
                <div className="mt-3 h-px w-16 bg-moon-300/60" />
                <p className="mt-3 max-w-[28ch] text-xs font-medium uppercase tracking-wide text-white/70">
                  Understand your sleep. Unlock what matters.
                </p>
              </div>
            </article>

            <div className="divide-y divide-white/10 lg:col-span-7">
              {listModules.map(({ n, title, copy, Icon }) => (
                <article key={n} className="flex items-start gap-4 py-6 first:pt-0 last:pb-0">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-moon-300/10 text-moon-300 ring-1 ring-moon-300/20">
                    <Icon size={18} weight="bold" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                      <span className="font-mono text-xs text-white/30">{n}</span>
                    </div>
                    <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-white/55 text-pretty">{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <DesirePin />

        <section id="architecture" className="border-t border-white/10 bg-night-900/50">
          <div className="mx-auto max-w-shell px-4 py-32 md:py-48 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Built to ship</h2>
            <p className="mt-4 max-w-[48ch] text-white/60 text-pretty">
              React frontend, Flask gateway, prediction services, and a clear path to Postgres, Redis, and MLflow.
            </p>
            <pre className="mt-10 overflow-x-auto rounded-xl bg-night-950 p-6 font-mono text-xs leading-7 text-moon-200 ring-1 ring-white/10 md:p-8 md:text-sm">
{`React / Vite
  → API Gateway
  → Sleep Assessment
  → Prediction Service
  → Recommendation Engine
  → LLM Sleep Coach
  → Analytics
  → PostgreSQL / Redis / MLflow`}
            </pre>
          </div>
        </section>

        <section className="mx-auto max-w-shell px-4 py-32 md:py-48 lg:px-8">
          <div className="rounded-[1.75rem] bg-moon-300/[0.12] p-1.5 ring-1 ring-moon-300/30">
            <div className="rounded-[calc(1.75rem-0.375rem)] bg-night-900/40 px-8 py-14 md:px-14">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Start with tonight</h2>
              <p className="mt-4 max-w-[40ch] text-white/65 text-pretty">
                Run the assessment, open the dashboard, and see how your sleep profile reads.
              </p>
              <div className="mt-8">
                <Link to="/app/assessment">
                  <PillButton>
                    Start assessment
                    <CtaArrow />
                  </PillButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Section 6: Footer */}
      <footer className="border-t border-white/10 px-4 py-10 text-sm text-white/45 lg:px-8">
        <div className="mx-auto flex max-w-shell flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>Sleep Oracle. Screening aid only. Not medical advice.</p>
          <nav className="flex flex-wrap gap-5" aria-label="Legal">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link to="/app/dashboard" className="transition-colors hover:text-white">
              Open app
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

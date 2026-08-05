import { Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { PillButton } from '../components/ui'
import { BrandLockup } from '../components/Brand'

export default function NotFound() {
  return (
    <div className="grain flex min-h-[100dvh] flex-col items-start justify-center bg-night-950 px-6 text-white">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-8">
          <BrandLockup markSize={32} />
        </div>
        <p className="font-mono text-sm text-moon-300 tabular">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance">
          This page is asleep
        </h1>
        <p className="mt-4 max-w-[42ch] text-white/60 text-pretty">
          The route you requested does not exist. Head home or open the dashboard to continue.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/">
            <PillButton>
              <ArrowLeft size={16} weight="bold" />
              Home
            </PillButton>
          </Link>
          <Link to="/app/dashboard">
            <PillButton variant="ghost">Open dashboard</PillButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

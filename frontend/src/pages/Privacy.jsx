import { Link } from 'react-router-dom'
import { MoonStars } from '@phosphor-icons/react'

export default function Privacy() {
  return (
    <div className="grain min-h-[100dvh] bg-night-950 px-4 py-12 text-white lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
          <MoonStars size={16} weight="fill" className="text-moon-300" />
          Sleep Oracle
        </Link>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy</h1>
        <p className="mt-2 text-sm text-white/45">Last updated March 5, 2026</p>
        <div className="mt-8 space-y-5 text-white/70 leading-relaxed text-pretty">
          <p>
            Sleep Oracle processes the sleep and health inputs you provide to generate screening scores and coaching guidance. Demo mode stores profile data in your browser session only.
          </p>
          <p>
            We do not sell personal health information. When a production backend is connected, data is retained only as long as needed to deliver the service you requested.
          </p>
          <p>
            This product is a screening aid, not a medical device. Contact the operator of your deployment for jurisdiction-specific privacy requests.
          </p>
        </div>
        <Link to="/" className="mt-10 inline-block text-sm font-medium text-moon-300 underline-offset-4 hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  )
}

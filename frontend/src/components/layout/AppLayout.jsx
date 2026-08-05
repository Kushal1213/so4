import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Bell, List } from '@phosphor-icons/react'
import Sidebar from './Sidebar'
import { BrandMark } from '../Brand'

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="grain min-h-[100dvh] bg-night-950 text-white">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgba(122,158,143,0.1),transparent_50%)]"
        aria-hidden="true"
      />
      <a href="#app-main" className="skip-link">
        Skip to content
      </a>
      <div className="relative flex min-h-[100dvh]">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-nav flex items-center justify-between border-b border-white/10 bg-night-950/85 px-4 py-3 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-2 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/5 active:scale-[0.98] lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <List size={20} weight="bold" />
              </button>
              <Link
                to="/"
                className="hidden items-center gap-2 text-sm text-white/55 transition-colors hover:text-white lg:flex"
              >
                <BrandMark size={16} className="text-moon-300" />
                Back to home
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg p-2.5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/5 active:scale-[0.98]"
                aria-label="Notifications"
              >
                <Bell size={18} weight="bold" />
              </button>
              <div className="hidden rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/70 ring-1 ring-white/10 sm:block">
                Demo profile
              </div>
            </div>
          </header>
          <main id="app-main" className="mx-auto w-full max-w-shell flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Bell, List, MoonStars } from '@phosphor-icons/react'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-[100dvh] bg-night-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(91,124,250,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(139,124,246,0.08),transparent_30%)]" />
      <div className="relative flex min-h-[100dvh]">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-night-950/80 px-4 py-3 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-full p-2 text-white/70 ring-1 ring-white/10 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <List size={20} weight="bold" />
              </button>
              <Link to="/" className="hidden items-center gap-2 text-sm text-white/55 hover:text-white lg:flex">
                <MoonStars size={16} weight="fill" className="text-moon-300" />
                Back to home
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-full p-2.5 text-white/70 ring-1 ring-white/10 hover:bg-white/5" aria-label="Notifications">
                <Bell size={18} weight="bold" />
              </button>
              <div className="hidden rounded-full bg-white/5 px-3 py-2 text-xs font-medium text-white/70 ring-1 ring-white/10 sm:block">
                Demo profile active
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

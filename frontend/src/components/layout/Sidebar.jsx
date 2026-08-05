import { NavLink } from 'react-router-dom'
import {
  ChartLineUp,
  ChatCircleDots,
  ClipboardText,
  Clock,
  Crown,
  Flask,
  GearSix,
  Heartbeat,
  House,
  Notebook,
  Path,
  Pulse,
  ShieldCheck,
  Sparkle,
  Target,
  TrendUp,
  UsersThree,
  Watch,
} from '@phosphor-icons/react'
import { BrandLockup } from '../Brand'

const navGroups = [
  {
    label: 'Core',
    items: [
      { to: '/app/dashboard', label: 'Dashboard', icon: House },
      { to: '/app/assessment', label: 'Assessment', icon: ClipboardText },
      { to: '/app/coach', label: 'AI Coach', icon: Sparkle },
      { to: '/app/habits', label: 'Habits', icon: Target },
      { to: '/app/journal', label: 'Journal', icon: Notebook },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { to: '/app/analytics', label: 'Analytics', icon: ChartLineUp },
      { to: '/app/risks', label: 'Risk Prediction', icon: ShieldCheck },
      { to: '/app/recovery', label: 'Recovery', icon: Heartbeat },
      { to: '/app/chat', label: 'AI Assistant', icon: ChatCircleDots },
      { to: '/app/plans', label: 'Sleep Plans', icon: Path },
    ],
  },
  {
    label: 'Optimization',
    items: [
      { to: '/app/environment', label: 'Environment', icon: Pulse },
      { to: '/app/alarm', label: 'Smart Alarm', icon: Clock },
      { to: '/app/wearables', label: 'Wearables', icon: Watch },
      { to: '/app/timeline', label: 'Timeline', icon: TrendUp },
    ],
  },
  {
    label: 'Platform',
    items: [
      { to: '/app/challenges', label: 'Challenges', icon: Crown },
      { to: '/app/family', label: 'Family', icon: UsersThree },
      { to: '/app/enterprise', label: 'Enterprise', icon: ChartLineUp },
      { to: '/app/research', label: 'Research', icon: Flask },
      { to: '/app/api', label: 'Sleep API', icon: GearSix },
      { to: '/app/admin', label: 'Admin', icon: GearSix },
      { to: '/app/roadmap', label: 'Roadmap', icon: Path },
    ],
  },
]

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-overlay bg-night-950/70 backdrop-blur-sm lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-overlay flex w-72 flex-col border-r border-white/10 bg-night-900/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-white/10 px-4 py-5">
          <BrandLockup markSize={28} showTagline />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Platform navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-2 px-3 font-display text-[12px] italic text-white/40">{group.label}</p>
              <ul className="space-y-0.5">
                {group.items.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-moon-300/12 text-moon-200 ring-1 ring-moon-300/20'
                            : 'text-white/60 hover:bg-white/[0.04] hover:text-white'
                        }`
                      }
                    >
                      <Icon size={18} weight="bold" />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

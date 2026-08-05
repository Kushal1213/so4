import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { BezelCard, LoadingGrid, PageHeader, SectionGrid } from '../components/ui'

export default function ChallengesPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.challenges().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingGrid count={3} />
  if (!data) return null

  return (
    <div>
      <PageHeader title="Sleep Challenge System" description="Gamified streaks, achievements, XP, and leaderboard motivation." />
      <SectionGrid cols={3}>
        <BezelCard><p className="text-xs text-white/45">XP</p><p className="mt-2 text-3xl font-semibold text-moon-300">{data.xp}</p></BezelCard>
        <BezelCard><p className="text-xs text-white/45">Level</p><p className="mt-2 text-3xl font-semibold text-white">{data.level}</p></BezelCard>
        <BezelCard><p className="text-xs text-white/45">Streak</p><p className="mt-2 text-3xl font-semibold text-dream-400">{data.streak_days} days</p></BezelCard>
      </SectionGrid>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BezelCard>
          <h3 className="font-semibold text-white">Achievements</h3>
          <ul className="mt-4 space-y-2">
            {data.achievements.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <span className="text-sm text-white">{item.title}</span>
                <span className={`text-xs ${item.unlocked ? 'text-emerald-300' : 'text-white/35'}`}>{item.unlocked ? 'Unlocked' : 'Locked'}</span>
              </li>
            ))}
          </ul>
        </BezelCard>
        <BezelCard>
          <h3 className="font-semibold text-white">Leaderboard</h3>
          <ul className="mt-4 space-y-2">
            {data.leaderboard.map((item) => (
              <li key={item.rank} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <span className="text-sm text-white">#{item.rank} {item.name}</span>
                <span className="font-mono text-sm text-moon-300">{item.xp} XP</span>
              </li>
            ))}
          </ul>
        </BezelCard>
      </div>
    </div>
  )
}

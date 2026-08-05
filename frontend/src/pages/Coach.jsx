import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, LoadingGrid, PageHeader, SectionGrid } from '../components/ui'

export default function CoachPage() {
  const { encodedProfile } = useSleep()
  const [coach, setCoach] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.coach(encodedProfile).then(setCoach).finally(() => setLoading(false))
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={3} />
  if (!coach) return null

  const items = [
    ['Bedtime', coach.bedtime_recommendation],
    ['Wake-up', coach.wake_recommendation],
    ['Caffeine cutoff', coach.caffeine_cutoff],
    ['Exercise timing', coach.exercise_timing],
    ['Screen time', coach.screen_time_reminder],
    ['Relaxation', coach.relaxation_routine],
    ['Recovery', coach.recovery_suggestion],
    ['Nap', coach.nap_recommendation],
  ]

  return (
    <div>
      <PageHeader title="AI Sleep Coach" description="Daily personalized recommendations based on your sleep debt, stress, and recovery profile." />
      <BezelCard glow className="mb-6">
        <p className="text-sm text-white/50">{coach.date}</p>
        <p className="mt-3 text-lg leading-relaxed text-white">{coach.coach_message}</p>
      </BezelCard>
      <SectionGrid cols={2}>
        {items.map(([label, value]) => (
          <BezelCard key={label}>
            <p className="text-xs uppercase tracking-wide text-white/45">{label}</p>
            <p className="mt-2 text-base font-medium text-white">{value}</p>
          </BezelCard>
        ))}
      </SectionGrid>
      <BezelCard className="mt-4">
        <h3 className="font-semibold text-white">Priority actions</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/65">
          {coach.priority_actions.map((action) => <li key={action}>- {action}</li>)}
        </ul>
      </BezelCard>
    </div>
  )
}

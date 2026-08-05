import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, LoadingGrid, PageHeader } from '../components/ui'

export default function PlansPage() {
  const { encodedProfile } = useSleep()
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.plan(encodedProfile).then(setPlan).finally(() => setLoading(false))
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={2} />
  if (!plan) return null

  return (
    <div>
      <PageHeader title="Personalized Sleep Plans" description="AI-generated 30-day improvement plans tailored to your stress, duration, and consistency profile." />
      <BezelCard elevated className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-white">{plan.title}</h2>
        <p className="mt-2 text-sm text-white/55 text-pretty">{plan.personalization_note}</p>
      </BezelCard>
      <div className="grid gap-4 md:grid-cols-2">
        {plan.weeks.map((week) => (
          <BezelCard key={week.week}>
            <p className="font-display text-sm italic text-moon-300">Week {week.week}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{week.focus}</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {week.goals.map((goal) => <li key={goal}>- {goal}</li>)}
            </ul>
          </BezelCard>
        ))}
      </div>
    </div>
  )
}

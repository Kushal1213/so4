import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, LoadingGrid, PageHeader, SectionGrid } from '../components/ui'

export default function AlarmPage() {
  const { encodedProfile } = useSleep()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.alarm(encodedProfile).then(setData).finally(() => setLoading(false))
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={3} />
  if (!data) return null

  const items = [
    ['Best bedtime', data.best_bedtime],
    ['Best wake-up time', data.best_wake_time],
    ['Recovery window', data.recovery_window],
    ['Nap duration', data.nap_duration],
    ['Sleep cycle timing', data.sleep_cycle_timing],
  ]

  return (
    <div>
      <PageHeader title="Smart Alarm Optimizer" description="Predict optimal wake time, bedtime, recovery window, nap duration, and sleep cycle alignment." />
      <SectionGrid cols={2}>
        {items.map(([label, value]) => (
          <BezelCard key={label}>
            <p className="text-xs uppercase tracking-wide text-white/45">{label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          </BezelCard>
        ))}
      </SectionGrid>
    </div>
  )
}

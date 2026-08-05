import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { LoadingGrid, MetricTile, PageHeader, SectionGrid } from '../components/ui'

export default function RecoveryPage() {
  const { encodedProfile } = useSleep()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.recovery(encodedProfile).then(setData).finally(() => setLoading(false))
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={4} />
  if (!data) return null

  return (
    <div>
      <PageHeader title="Recovery Intelligence" description="Predict recovery, energy, fatigue, productivity, mental performance, and workout readiness." />
      <SectionGrid cols={3}>
        <MetricTile label="Recovery Score" value={data.recovery_score} unit="/100" accent="moon" />
        <MetricTile label="Energy Level" value={data.energy_level} unit="/100" />
        <MetricTile label="Fatigue Level" value={data.fatigue_level} unit="/100" accent="dream" />
        <MetricTile label="Productivity Index" value={data.productivity_index} unit="/100" />
        <MetricTile label="Mental Performance" value={data.mental_performance} unit="/100" />
        <MetricTile label="Workout Readiness" value={data.workout_readiness} unit="/100" />
      </SectionGrid>
    </div>
  )
}

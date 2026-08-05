import { useEffect, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, LoadingGrid, MetricTile, PageHeader, SectionGrid } from '../components/ui'

export default function DashboardPage() {
  const { encodedProfile } = useSleep()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    api.dashboard(encodedProfile)
      .then((result) => { if (active) setData(result) })
      .catch(() => { if (active) setData(null) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={6} />
  if (!data) {
    return (
      <PageHeader
        title="Personal Sleep Dashboard"
        description="Start the backend to load live dashboard metrics."
      />
    )
  }

  return (
    <div>
      <PageHeader
        title="Personal Sleep Dashboard"
        description="Your sleep score, trends, debt, recovery, and consistency in one view."
      />
      <SectionGrid cols={4}>
        <MetricTile label="Overall Sleep Score" value={data.overall_sleep_score} unit="/100" accent="moon" />
        <MetricTile label="Average Duration" value={data.average_sleep_duration} unit="h" />
        <MetricTile label="Sleep Debt" value={data.sleep_debt_hours} unit="h" accent="dream" />
        <MetricTile label="Recovery Score" value={data.recovery_score} unit="/100" />
        <MetricTile label="Stress Impact" value={data.stress_impact} unit="/100" />
        <MetricTile label="Lifestyle Score" value={data.lifestyle_score} unit="/100" />
        <MetricTile label="Goal Progress" value={data.goal_progress_percent} unit="%" />
        <MetricTile label="Bedtime Consistency" value={data.bedtime_consistency} unit="/100" />
      </SectionGrid>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BezelCard>
          <h3 className="text-lg font-semibold text-white">Weekly Sleep Trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weekly_trend}>
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="sleep_score" stroke="#5b7cfa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
        <BezelCard>
          <h3 className="text-lg font-semibold text-white">Monthly Sleep Trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly_trend}>
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="duration_hours" stroke="#8b7cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
      </div>
    </div>
  )
}

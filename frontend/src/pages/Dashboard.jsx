import { useEffect, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, EmptyState, LoadingGrid, PageHeader } from '../components/ui'

/** Skill 9 minimalist pass: flat metric strip + restrained charts */
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
      <div>
        <PageHeader
          title="Personal sleep dashboard"
          description="Your sleep score, trends, debt, recovery, and consistency in one view."
        />
        <EmptyState
          title="Connect the backend to see live metrics"
          description="Start the Flask API, then refresh. Until then, run an assessment to seed your demo profile."
          action={
            <Link to="/app/assessment" className="text-sm font-medium text-moon-300 underline-offset-4 hover:underline">
              Go to assessment
            </Link>
          }
        />
      </div>
    )
  }

  const metrics = [
    ['Overall sleep score', data.overall_sleep_score, '/100'],
    ['Average duration', data.average_sleep_duration, 'h'],
    ['Sleep debt', data.sleep_debt_hours, 'h'],
    ['Recovery score', data.recovery_score, '/100'],
    ['Stress impact', data.stress_impact, '/100'],
    ['Lifestyle score', data.lifestyle_score, '/100'],
    ['Goal progress', data.goal_progress_percent, '%'],
    ['Bedtime consistency', data.bedtime_consistency, '/100'],
  ]

  return (
    <div>
      <PageHeader
        title="Personal sleep dashboard"
        description="Your sleep score, trends, debt, recovery, and consistency in one view."
      />

      <div className="grid grid-cols-2 border border-white/10 sm:grid-cols-4">
        {metrics.map(([label, value, unit], i) => (
          <div
            key={label}
            className={`border-white/10 p-5 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t sm:border-t-0' : ''} ${i >= 4 ? 'border-t' : ''} sm:border-l sm:[&:nth-child(4n+1)]:border-l-0`}
          >
            <p className="text-[12px] font-medium text-white/45">{label}</p>
            <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-moon-300 tabular">
              {value}
              <span className="ml-1 font-sans text-base font-normal text-white/50">{unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <BezelCard>
          <h3 className="font-display text-lg font-semibold text-white">Weekly sleep trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weekly_trend}>
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#181c27', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="sleep_score" stroke="#7a9e8f" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
        <BezelCard>
          <h3 className="font-display text-lg font-semibold text-white">Monthly sleep trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly_trend}>
                <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#181c27', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="duration_hours" stroke="#a8cfbc" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
      </div>
    </div>
  )
}

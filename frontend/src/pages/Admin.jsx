import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { BezelCard, LoadingGrid, MetricTile, PageHeader, SectionGrid } from '../components/ui'

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.admin().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingGrid count={4} />
  if (!data) return null

  return (
    <div>
      <PageHeader title="Admin Dashboard" description="Platform metrics, model performance, disorder prevalence, and feedback analytics." />
      <SectionGrid cols={4}>
        <MetricTile label="Total Users" value={data.total_users.toLocaleString()} />
        <MetricTile label="Daily Predictions" value={data.daily_predictions.toLocaleString()} />
        <MetricTile label="Avg Sleep Score" value={data.average_sleep_score} unit="/100" accent="moon" />
        <MetricTile label="Active Users (24h)" value={data.active_users_24h.toLocaleString()} />
      </SectionGrid>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BezelCard>
          <h3 className="font-semibold text-white">Disorder Prevalence</h3>
          <div className="mt-4 space-y-3">
            {Object.entries(data.disorder_prevalence).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <span className="capitalize text-white">{key.replace('_', ' ')}</span>
                <span className="font-mono text-moon-300">{value}%</span>
              </div>
            ))}
          </div>
        </BezelCard>
        <BezelCard>
          <h3 className="font-semibold text-white">Model Performance</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
              <span className="text-white">Accuracy</span>
              <span className="font-mono text-emerald-300">{Math.round(data.model_performance.accuracy * 100)}%</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
              <span className="text-white">F1 Macro</span>
              <span className="font-mono text-emerald-300">{Math.round(data.model_performance.f1_macro * 100)}%</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
              <span className="text-white">Positive Feedback</span>
              <span className="font-mono text-moon-300">{data.feedback_positive_rate}%</span>
            </div>
          </div>
        </BezelCard>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../lib/api'
import { BezelCard, LoadingGrid, MetricTile, PageHeader, SectionGrid } from '../components/ui'

export default function EnterprisePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.enterprise().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingGrid count={3} />
  if (!data) return null

  return (
    <div>
      <PageHeader title="Enterprise Sleep Analytics" description="Anonymous workforce sleep metrics, burnout risk, department trends, and shift-work impact." />
      <SectionGrid cols={3}>
        <MetricTile label="Average Sleep Score" value={data.average_sleep_score} unit="/100" />
        <MetricTile label="Burnout Risk" value={data.burnout_risk_percent} unit="%" accent="dream" />
        <MetricTile label="Sample Size" value={data.anonymous_sample_size} />
      </SectionGrid>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BezelCard>
          <h3 className="font-semibold text-white">Department Trends</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.departments}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="avg_sleep" fill="#5b7cfa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
        <BezelCard>
          <h3 className="font-semibold text-white">Shift Work Impact</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-sm text-white/55">Night shift impact</p>
              <p className="mt-1 font-mono text-2xl text-red-300">{data.shift_work_impact.night_shift}%</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-sm text-white/55">Day shift impact</p>
              <p className="mt-1 font-mono text-2xl text-emerald-300">+{data.shift_work_impact.day_shift}%</p>
            </div>
          </div>
        </BezelCard>
      </div>
    </div>
  )
}

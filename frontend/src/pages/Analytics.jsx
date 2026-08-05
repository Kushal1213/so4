import { useEffect, useState } from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, LoadingGrid, MetricTile, PageHeader, SectionGrid } from '../components/ui'

const qualityColors = ['#7a9e8f', '#a8cfbc', '#c4a574', '#c97b7b']

export default function AnalyticsPage() {
  const { encodedProfile } = useSleep()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.analytics(encodedProfile).then(setData).finally(() => setLoading(false))
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={4} />
  if (!data) return null

  const qualityData = [
    { name: 'Excellent', value: data.quality_distribution.excellent },
    { name: 'Good', value: data.quality_distribution.good },
    { name: 'Fair', value: data.quality_distribution.fair },
    { name: 'Poor', value: data.quality_distribution.poor },
  ]
  const weekdayData = Object.entries(data.by_weekday).map(([day, hours]) => ({ day, hours }))

  return (
    <div>
      <PageHeader title="Smart Sleep Analytics" description="Sleep trends, consistency, debt, recovery, quality distribution, and bedtime heatmaps." />
      <SectionGrid cols={4}>
        <MetricTile label="Weekly Average" value={data.weekly_average_hours} unit="h" />
        <MetricTile label="Monthly Average" value={data.monthly_average_hours} unit="h" />
        <MetricTile label="Sleep Debt" value={data.sleep_debt_hours} unit="h" />
        <MetricTile label="Consistency" value={data.consistency_score} unit="/100" />
      </SectionGrid>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BezelCard>
          <h3 className="font-display font-semibold text-white">Sleep quality distribution</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qualityData}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#181c27', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {qualityData.map((_, index) => <Cell key={index} fill={qualityColors[index]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
        <BezelCard>
          <h3 className="font-display font-semibold text-white">Sleep by weekday</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdayData}>
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#181c27', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="hours" fill="#7a9e8f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BezelCard>
        <BezelCard className="lg:col-span-2">
          <h3 className="font-semibold text-white">Bedtime Heatmap</h3>
          <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-12">
            {data.bedtime_heatmap.map((cell) => (
              <div key={cell.hour} className="rounded-xl p-2 text-center ring-1 ring-white/10" style={{ background: `rgba(91,124,250,${cell.density / 140})` }}>
                <p className="font-mono text-[10px] text-white/70">{cell.hour % 24}:00</p>
              </div>
            ))}
          </div>
        </BezelCard>
      </div>
    </div>
  )
}

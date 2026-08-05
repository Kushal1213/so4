import { useEffect, useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, PageHeader, PillButton } from '../components/ui'

const periods = ['weekly', 'monthly', 'yearly']

export default function TimelinePage() {
  const { encodedProfile } = useSleep()
  const [period, setPeriod] = useState('monthly')
  const [data, setData] = useState([])

  useEffect(() => {
    api.timeline(encodedProfile, period).then((res) => setData(res.data || []))
  }, [encodedProfile, period])

  return (
    <div>
      <PageHeader title="Sleep Timeline" description="Track weekly, monthly, and yearly sleep improvements over time." />
      <div className="mb-4 flex flex-wrap gap-2">
        {periods.map((item) => (
          <PillButton key={item} variant={period === item ? 'primary' : 'ghost'} onClick={() => setPeriod(item)}>
            {item}
          </PillButton>
        ))}
      </div>
      <BezelCard>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey={period === 'yearly' ? 'label' : 'date'} tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Line type="monotone" dataKey="sleep_score" stroke="#5b7cfa" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="duration_hours" stroke="#8b7cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </BezelCard>
    </div>
  )
}

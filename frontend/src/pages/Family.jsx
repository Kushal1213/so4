import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { BezelCard, LoadingGrid, PageHeader } from '../components/ui'

export default function FamilyPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.family().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingGrid count={3} />
  if (!data) return null

  return (
    <div>
      <PageHeader title="Family Sleep Dashboard" description="Monitor household sleep, compare schedules, and run shared sleep challenges." />
      <BezelCard className="mb-6">
        <p className="text-sm text-white/55">Shared challenge: {data.shared_challenge}</p>
        <p className="mt-2 text-white">{data.report_summary}</p>
      </BezelCard>
      <div className="grid gap-4 md:grid-cols-3">
        {data.members.map((member) => (
          <BezelCard key={member.name}>
            <p className="text-xs uppercase tracking-wide text-white/45">{member.role}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{member.name}</h3>
            <p className="mt-3 font-mono text-2xl text-moon-300">{member.sleep_score}</p>
            <p className="mt-2 text-sm text-white/55">{member.bedtime} to {member.wake}</p>
          </BezelCard>
        ))}
      </div>
    </div>
  )
}

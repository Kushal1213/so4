import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { BezelCard, LoadingGrid, PageHeader, PillButton } from '../components/ui'

export default function ResearchPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.research().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingGrid count={3} />
  if (!data) return null

  return (
    <div>
      <PageHeader title="Research Platform" description="Analyze anonymized sleep trends, compare occupations, study shift workers, and export datasets." />
      <BezelCard className="mb-6">
        <p className="text-sm text-white/55">{data.anonymized_records} anonymized records available</p>
        <p className="mt-2 text-sm text-white/65">Export formats: {data.export_formats.join(', ')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.export_formats.map((format) => <PillButton key={format} variant="ghost">Export {format}</PillButton>)}
        </div>
      </BezelCard>
      <div className="grid gap-4 md:grid-cols-3">
        {data.cohorts.map((cohort) => (
          <BezelCard key={cohort.name}>
            <h3 className="font-semibold text-white">{cohort.name}</h3>
            <p className="mt-2 text-sm text-white/55">{cohort.size} participants</p>
            <p className="mt-3 font-mono text-2xl text-moon-300">{cohort.insomnia_rate}% insomnia rate</p>
          </BezelCard>
        ))}
      </div>
    </div>
  )
}

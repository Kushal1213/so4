import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, LoadingGrid, PageHeader, RiskBadge } from '../components/ui'

export default function RisksPage() {
  const { encodedProfile } = useSleep()
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.risks(encodedProfile).then((res) => setPredictions(res.predictions || [])).finally(() => setLoading(false))
  }, [encodedProfile])

  if (loading) return <LoadingGrid count={3} />

  return (
    <div>
      <PageHeader title="Sleep Risk Prediction" description="Multiple ML-backed risk models with individual confidence scores and explainable contributing factors." />
      <div className="space-y-4">
        {predictions.map((item) => (
          <BezelCard key={item.risk} glow={item.level === 'high'}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.risk}</h3>
                <p className="mt-1 text-sm text-white/55">{item.explanation.explanation}</p>
              </div>
              <div className="flex items-center gap-3">
                <RiskBadge level={item.level} />
                <span className="font-mono text-2xl text-moon-300">{item.confidence}%</span>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {item.explanation.contributing_factors.map((factor) => (
                <div key={factor.factor} className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  <p className="text-sm text-white">{factor.factor}</p>
                  <p className="text-xs text-white/45">{factor.impact} impact · weight {factor.weight}</p>
                </div>
              ))}
            </div>
          </BezelCard>
        ))}
      </div>
    </div>
  )
}

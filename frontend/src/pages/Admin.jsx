import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { LoadingGrid } from '../components/ui'

/** Skill 10: Tactical Telemetry remapping for admin / data surfaces */
export default function AdminPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.admin().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingGrid count={4} />
  if (!data) return null

  const metrics = [
    ['TOTAL_USERS', data.total_users.toLocaleString()],
    ['DAILY_PRED', data.daily_predictions.toLocaleString()],
    ['AVG_SCORE', `${data.average_sleep_score}/100`],
    ['ACTIVE_24H', data.active_users_24h.toLocaleString()],
  ]

  return (
    <div className="scanlines font-mono text-[13px] uppercase tracking-[0.06em] text-[#eaeaea]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#eaeaea] pb-4">
        <div>
          <p className="text-[10px] text-[#e61919]">[ ADMIN / TELEMETRY ]</p>
          <h1 className="mt-2 font-display text-4xl font-bold normal-case tracking-[-0.04em] text-[#eaeaea] md:text-5xl">
            PLATFORM LINK
          </h1>
        </div>
        <p className="text-[10px] text-white/45">REV 2.6 · UNIT / SO-01 · © SLEEP ORACLE</p>
      </div>

      <div className="grid grid-cols-2 border-2 border-[#eaeaea] lg:grid-cols-4">
        {metrics.map(([label, value], i) => (
          <div
            key={label}
            className={`border-[#eaeaea] p-4 ${i % 2 === 1 ? 'border-l-2' : ''} ${i >= 2 ? 'border-t-2' : ''} lg:border-t-0 lg:border-l-2 lg:first:border-l-0`}
          >
            <p className="text-[10px] text-white/45">{label}</p>
            <p className="mt-3 text-2xl tabular tracking-tight text-[#eaeaea]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-0 grid border-2 border-t-0 border-[#eaeaea] lg:grid-cols-2">
        <div className="border-[#eaeaea] p-4 lg:border-r-2">
          <p className="mb-4 text-[10px] text-[#e61919]">&lt; DISORDER_PREVALENCE &gt;</p>
          <ul className="space-y-2">
            {Object.entries(data.disorder_prevalence).map(([key, value]) => (
              <li key={key} className="flex items-center justify-between border-b border-white/15 pb-2">
                <span>{key.replace('_', ' ')}</span>
                <span className="text-[#e61919]">{value}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t-2 border-[#eaeaea] p-4 lg:border-t-0">
          <p className="mb-4 text-[10px] text-[#e61919]">&lt; MODEL_PERFORMANCE &gt;</p>
          <ul className="space-y-2">
            <li className="flex justify-between border-b border-white/15 pb-2">
              <span>ACCURACY</span>
              <span className="text-[#4af626]">{Math.round(data.model_performance.accuracy * 100)}%</span>
            </li>
            <li className="flex justify-between border-b border-white/15 pb-2">
              <span>F1_MACRO</span>
              <span className="text-[#4af626]">{Math.round(data.model_performance.f1_macro * 100)}%</span>
            </li>
            <li className="flex justify-between border-b border-white/15 pb-2">
              <span>FEEDBACK_POS</span>
              <span>{data.feedback_positive_rate}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

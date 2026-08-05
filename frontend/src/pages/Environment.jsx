import { useState } from 'react'
import { api } from '../lib/api'
import { BezelCard, MetricTile, PageHeader, PillButton, SectionGrid } from '../components/ui'

export default function EnvironmentPage() {
  const [env, setEnv] = useState({ room_temperature: 21, light_exposure: 6, noise_level: 5, humidity: 45, mattress_type: 'Medium-firm', pillow_type: 'Contoured' })
  const [result, setResult] = useState(null)

  const analyze = async () => {
    const data = await api.environment(env)
    setResult(data)
  }

  return (
    <div>
      <PageHeader title="Sleep Environment Analyzer" description="Model how room temperature, light, noise, humidity, and bedding affect your sleep quality." />
      <BezelCard className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['room_temperature', 'Room temperature (C)', 16, 28],
            ['light_exposure', 'Light exposure (1-10)', 1, 10],
            ['noise_level', 'Noise level (1-10)', 1, 10],
            ['humidity', 'Humidity (%)', 20, 70],
          ].map(([key, label, min, max]) => (
            <label key={key} className="block space-y-2">
              <span className="text-sm text-white/70">{label}</span>
              <input type="number" min={min} max={max} value={env[key]} onChange={(e) => setEnv({ ...env, [key]: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2.5 text-white" />
            </label>
          ))}
        </div>
        <div className="mt-4"><PillButton onClick={analyze}>Analyze environment</PillButton></div>
      </BezelCard>
      {result && (
        <>
          <SectionGrid cols={4}>
            <MetricTile label="Environment Score" value={result.environment_score} unit="/100" />
          </SectionGrid>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {result.factors.map((factor) => (
              <BezelCard key={factor.factor}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{factor.factor}</h3>
                  <span className="font-mono text-moon-300">{factor.impact_score}</span>
                </div>
                <p className="mt-2 text-sm text-white/55">Current: {factor.value} · Ideal: {factor.ideal}</p>
              </BezelCard>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

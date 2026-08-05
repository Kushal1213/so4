import { useState } from 'react'
import { api, WEARABLE_DEVICES } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, PageHeader, PillButton, SectionGrid } from '../components/ui'

export default function WearablesPage() {
  const { encodedProfile } = useSleep()
  const [device, setDevice] = useState('Apple Watch')
  const [data, setData] = useState(null)

  const sync = async () => {
    const result = await api.wearable(encodedProfile, device)
    setData(result)
  }

  return (
    <div>
      <PageHeader title="Wearable Integration" description="Simulated Apple Watch, Fitbit, Garmin, WHOOP, and Samsung Watch data with production-ready architecture." />
      <BezelCard className="mb-6">
        <label className="block space-y-2">
          <span className="text-sm text-white/70">Select device</span>
          <select value={device} onChange={(e) => setDevice(e.target.value)} className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2.5 text-white">
            {WEARABLE_DEVICES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <div className="mt-4"><PillButton onClick={sync}>Simulate sync</PillButton></div>
      </BezelCard>
      {data && (
        <>
          <BezelCard className="mb-4">
            <p className="text-sm text-white/55">{data.device} · synced {new Date(data.synced_at).toLocaleString()}</p>
          </BezelCard>
          <SectionGrid cols={3}>
            {Object.entries(data.metrics).filter(([key]) => key !== 'sleep_stages').map(([key, value]) => (
              <BezelCard key={key}>
                <p className="text-xs uppercase tracking-wide text-white/45">{key.replace(/_/g, ' ')}</p>
                <p className="mt-2 font-mono text-xl text-moon-300">{typeof value === 'object' ? JSON.stringify(value) : value}</p>
              </BezelCard>
            ))}
          </SectionGrid>
          <BezelCard className="mt-4">
            <h3 className="font-semibold text-white">Sleep stages</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-4">
              {Object.entries(data.metrics.sleep_stages).map(([stage, minutes]) => (
                <div key={stage} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <p className="text-xs text-white/45">{stage.replace('_', ' ')}</p>
                  <p className="mt-1 font-mono text-lg text-white">{minutes}m</p>
                </div>
              ))}
            </div>
          </BezelCard>
        </>
      )}
    </div>
  )
}

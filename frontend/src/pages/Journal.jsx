import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, PageHeader, PillButton } from '../components/ui'

export default function JournalPage() {
  const { journalEntries, setJournalEntries } = useSleep()
  const [insights, setInsights] = useState([])
  const [draft, setDraft] = useState({ mood: 6, energy: 6, focus: 6, anxiety: 5, productivity: 6, sleep_hours: 7, symptoms: '' })

  useEffect(() => {
    api.journalInsights(journalEntries).then((res) => setInsights(res.insights || []))
  }, [journalEntries])

  const addEntry = () => {
    const entry = { ...draft, date: new Date().toISOString().slice(0, 10) }
    setJournalEntries([entry, ...journalEntries])
  }

  return (
    <div>
      <PageHeader title="Sleep Journal" description="Log dreams, mood, energy, focus, and symptoms. AI correlates journal data with your sleep patterns." />
      <div className="grid gap-6 lg:grid-cols-2">
        <BezelCard>
          <h3 className="font-semibold text-white">New entry</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {['mood', 'energy', 'focus', 'anxiety', 'productivity', 'sleep_hours'].map((key) => (
              <label key={key} className="block space-y-1">
                <span className="text-xs uppercase tracking-wide text-white/45">{key.replace('_', ' ')}</span>
                <input type="number" min="1" max="10" value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: Number(e.target.value) })} className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2 text-white" />
              </label>
            ))}
          </div>
          <label className="mt-3 block space-y-1">
            <span className="text-xs uppercase tracking-wide text-white/45">Symptoms</span>
            <input value={draft.symptoms} onChange={(e) => setDraft({ ...draft, symptoms: e.target.value })} className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2 text-white" />
          </label>
          <div className="mt-4"><PillButton onClick={addEntry}>Save journal entry</PillButton></div>
        </BezelCard>
        <BezelCard>
          <h3 className="font-semibold text-white">AI correlations</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
            {insights.map((item) => <li key={item}>- {item}</li>)}
          </ul>
        </BezelCard>
      </div>
      <div className="mt-6 space-y-3">
        {journalEntries.map((entry) => (
          <BezelCard key={entry.date + entry.mood}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-white">{entry.date}</p>
              <p className="text-sm text-white/50">{entry.sleep_hours}h sleep</p>
            </div>
            <p className="mt-2 text-sm text-white/60">Mood {entry.mood} · Focus {entry.focus} · Anxiety {entry.anxiety} · {entry.symptoms || 'No symptoms logged'}</p>
          </BezelCard>
        ))}
      </div>
    </div>
  )
}

import { HABIT_FIELDS } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, PageHeader, PillButton, SectionGrid } from '../components/ui'

export default function HabitsPage() {
  const { habits, setHabits } = useSleep()

  return (
    <div>
      <PageHeader
        title="Sleep Habit Tracking"
        description="Track bedtime, wake time, caffeine, exercise, stress, and more. Every input feeds your predictions."
      />
      <SectionGrid cols={2}>
        {HABIT_FIELDS.map((field) => (
          <BezelCard key={field.key}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/70">{field.label}</span>
              <input
                value={habits[field.key]}
                onChange={(e) => setHabits({ ...habits, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2.5 text-white outline-none focus:border-moon-400/50"
              />
            </label>
          </BezelCard>
        ))}
      </SectionGrid>
      <div className="mt-6">
        <PillButton onClick={() => setHabits({ ...habits })}>Save today&apos;s habits</PillButton>
      </div>
    </div>
  )
}

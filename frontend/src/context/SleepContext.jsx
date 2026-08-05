import { createContext, useContext, useMemo, useState } from 'react'
import { DEFAULT_PROFILE } from '../lib/api'

const SleepContext = createContext(null)

export function SleepProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [habits, setHabits] = useState({
    bedtime: '10:45 PM',
    wake_time: '6:30 AM',
    caffeine: '2',
    alcohol: '0',
    water: '7',
    exercise: '35',
    stress: '6',
    screen_time: '3.5',
    meals: '7:30 PM',
  })
  const [journalEntries, setJournalEntries] = useState([
    { date: '2026-08-03', mood: 6, energy: 5, focus: 4, anxiety: 7, productivity: 5, sleep_hours: 5.5, symptoms: 'Restless' },
    { date: '2026-08-04', mood: 7, energy: 6, focus: 6, anxiety: 5, productivity: 6, sleep_hours: 7.2, symptoms: 'None' },
  ])
  const [assessmentResult, setAssessmentResult] = useState(null)

  const encodedProfile = useMemo(() => profile, [profile])

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      encodedProfile,
      habits,
      setHabits,
      journalEntries,
      setJournalEntries,
      assessmentResult,
      setAssessmentResult,
    }),
    [profile, encodedProfile, habits, journalEntries, assessmentResult],
  )

  return <SleepContext.Provider value={value}>{children}</SleepContext.Provider>
}

export function useSleep() {
  const context = useContext(SleepContext)
  if (!context) throw new Error('useSleep must be used within SleepProvider')
  return context
}

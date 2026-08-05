import { useState } from 'react'
import { ArrowRight, Sparkle } from '@phosphor-icons/react'
import { api, OCCUPATIONS } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, PageHeader, PillButton, SectionGrid } from '../components/ui'
import PredictionResult from '../components/PredictionResult'

const formSections = [
  {
    title: 'About you',
    fields: [
      { name: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male'] },
      { name: 'age', label: 'Age', type: 'number', min: 18, max: 100 },
      { name: 'occupation', label: 'Occupation', type: 'select', options: OCCUPATIONS },
    ],
  },
  {
    title: 'Sleep profile',
    fields: [
      { name: 'sleepDuration', label: 'Sleep duration (hours)', type: 'number', min: 4, max: 12, step: '0.1' },
      { name: 'qualityOfSleep', label: 'Sleep quality (1-10)', type: 'number', min: 1, max: 10 },
    ],
  },
  {
    title: 'Health markers',
    fields: [
      { name: 'physicalActivity', label: 'Physical activity (min/day)', type: 'number', min: 0, max: 180 },
      { name: 'stressLevel', label: 'Stress level (1-10)', type: 'number', min: 1, max: 10 },
      { name: 'bmiCategory', label: 'BMI category', type: 'select', options: ['Normal', 'Overweight'] },
      { name: 'bloodPressure', label: 'Blood pressure (systolic)', type: 'number', min: 90, max: 180 },
      { name: 'heartRate', label: 'Resting heart rate', type: 'number', min: 50, max: 120 },
      { name: 'dailySteps', label: 'Daily steps', type: 'number', min: 1000, max: 20000 },
    ],
  },
]

const demoForm = {
  gender: 'Male', age: '32', occupation: 'Software Engineer', sleepDuration: '6.8',
  qualityOfSleep: '6', physicalActivity: '40', stressLevel: '6', bmiCategory: 'Normal',
  bloodPressure: '120', heartRate: '74', dailySteps: '6500',
}

function toPayload(form) {
  return {
    gender: form.gender === 'Male' ? 1 : 0,
    age: Number(form.age),
    occupation: OCCUPATIONS.indexOf(form.occupation),
    sleep_duration: Number(form.sleepDuration),
    quality_of_sleep: Number(form.qualityOfSleep),
    physical_activity: Number(form.physicalActivity),
    stress_level: Number(form.stressLevel),
    bmi_category: form.bmiCategory === 'Overweight' ? 1 : 0,
    blood_pressure: Number(form.bloodPressure),
    heart_rate: Number(form.heartRate),
    daily_steps: Number(form.dailySteps),
  }
}

export default function AssessmentPage() {
  const { setProfile, setAssessmentResult, assessmentResult } = useSleep()
  const [form, setForm] = useState(demoForm)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = toPayload(form)
      setProfile(payload)
      const [predictResult, assessmentResultData] = await Promise.all([
        api.predict(payload),
        api.assessment(payload),
      ])
      setAssessmentResult(predictResult)
      setMetrics(assessmentResultData.metrics)
    } catch {
      setError('Could not run assessment. Ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="AI Sleep Assessment"
        description="Predict sleep disorder screening signals, quality scores, debt, recovery, fatigue, burnout, circadian rhythm, and risk markers."
        action={<PillButton variant="ghost" onClick={() => setForm(demoForm)}><Sparkle size={16} weight="bold" /> Load demo</PillButton>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <BezelCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formSections.map((section) => (
              <fieldset key={section.title} className="space-y-4">
                <legend className="text-lg font-semibold text-white">{section.title}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <label key={field.name} className="block space-y-2">
                      <span className="text-sm font-medium text-white/70">{field.label}</span>
                      {field.type === 'select' ? (
                        <select
                          value={form[field.name]}
                          onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2.5 text-white outline-none focus:border-moon-400/50"
                          required
                        >
                          <option value="">Select</option>
                          {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          type="number"
                          value={form[field.name]}
                          min={field.min}
                          max={field.max}
                          step={field.step || 1}
                          onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-night-900 px-3 py-2.5 text-white outline-none focus:border-moon-400/50"
                          required
                        />
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <PillButton type="submit" className="w-full sm:w-auto" disabled={loading}>
              {loading ? 'Running assessment...' : 'Run full assessment'}
              {!loading && <ArrowRight size={16} weight="bold" />}
            </PillButton>
            {error && <p className="text-sm text-red-300">{error}</p>}
          </form>
        </BezelCard>

        <div className="space-y-4">
          {metrics && (
            <SectionGrid cols={2}>
              {Object.entries(metrics).map(([key, value]) => (
                <BezelCard key={key}>
                  <p className="text-xs uppercase tracking-wide text-white/45">{key.replace(/_/g, ' ')}</p>
                  <p className="mt-2 font-mono text-2xl text-moon-300">{value}</p>
                </BezelCard>
              ))}
            </SectionGrid>
          )}
          {assessmentResult && <PredictionResult prediction={assessmentResult} onStartOver={() => setAssessmentResult(null)} />}
        </div>
      </div>
    </div>
  )
}

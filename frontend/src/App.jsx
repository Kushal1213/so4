<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom'
import { SleepProvider } from './context/SleepContext'
import AppLayout from './components/layout/AppLayout'
import Landing from './pages/Landing'
import DashboardPage from './pages/Dashboard'
import AssessmentPage from './pages/Assessment'
import CoachPage from './pages/Coach'
import HabitsPage from './pages/Habits'
import JournalPage from './pages/Journal'
import AnalyticsPage from './pages/Analytics'
import RisksPage from './pages/Risks'
import ChatPage from './pages/Chat'
import PlansPage from './pages/Plans'
import EnvironmentPage from './pages/Environment'
import AlarmPage from './pages/Alarm'
import WearablesPage from './pages/Wearables'
import TimelinePage from './pages/Timeline'
import RecoveryPage from './pages/Recovery'
import ChallengesPage from './pages/Challenges'
import FamilyPage from './pages/Family'
import EnterprisePage from './pages/Enterprise'
import ResearchPage from './pages/Research'
import ApiDocsPage from './pages/ApiDocs'
import AdminPage from './pages/Admin'
import RoadmapPage from './pages/Roadmap'

export default function App() {
  return (
    <SleepProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="assessment" element={<AssessmentPage />} />
          <Route path="coach" element={<CoachPage />} />
          <Route path="habits" element={<HabitsPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="risks" element={<RisksPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="environment" element={<EnvironmentPage />} />
          <Route path="alarm" element={<AlarmPage />} />
          <Route path="wearables" element={<WearablesPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="recovery" element={<RecoveryPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="family" element={<FamilyPage />} />
          <Route path="enterprise" element={<EnterprisePage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="api" element={<ApiDocsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
        </Route>
      </Routes>
    </SleepProvider>
  )
}
=======
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
  ArrowRight,
  Briefcase,
  CaretDown,
  Clock,
  Drop,
  Footprints,
  Gauge,
  Heartbeat,
  LockKey,
  MoonStars,
  PersonSimple,
  Scales,
  Sparkle,
} from '@phosphor-icons/react'
import PredictionResult from './components/PredictionResult'

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_BASE = rawApiUrl.startsWith('http') ? rawApiUrl : `https://${rawApiUrl}`

const OCCUPATIONS = [
  'Accountant', 'Doctor', 'Engineer', 'Lawyer', 'Manager',
  'Nurse', 'Sales Representative', 'Salesperson', 'Scientist',
  'Software Engineer', 'Teacher',
]

const EMPTY_FORM = {
  gender: '',
  age: '',
  occupation: '',
  sleepDuration: '',
  qualityOfSleep: '',
  physicalActivity: '',
  stressLevel: '',
  bmiCategory: '',
  bloodPressure: '',
  heartRate: '',
  dailySteps: '',
}

const formSections = [
  {
    title: 'About you',
    description: 'These details let the model compare your answers with patterns in its training data.',
    fields: [
      { name: 'gender', label: 'Gender', icon: PersonSimple, type: 'select', placeholder: 'Select gender', options: ['Female', 'Male'] },
      { name: 'age', label: 'Age', icon: Clock, type: 'number', placeholder: 'e.g. 34', min: 18, max: 100, unit: 'years' },
      { name: 'occupation', label: 'Occupation', icon: Briefcase, type: 'select', placeholder: 'Select occupation', options: OCCUPATIONS },
    ],
  },
  {
    title: 'Sleep profile',
    description: 'Use your usual routine over the last few weeks, rather than an unusual single night.',
    fields: [
      { name: 'sleepDuration', label: 'Sleep duration', icon: MoonStars, type: 'number', placeholder: 'e.g. 7.5', min: 4, max: 12, step: '0.1', unit: 'hours per night' },
      { name: 'qualityOfSleep', label: 'Sleep quality', icon: Sparkle, type: 'number', placeholder: '1 to 10', min: 1, max: 10, unit: '1 is very poor, 10 is excellent' },
    ],
  },
  {
    title: 'Daily health markers',
    description: 'A few broader habits and measurements give the screening a more complete context.',
    fields: [
      { name: 'physicalActivity', label: 'Physical activity', icon: Gauge, type: 'number', placeholder: 'e.g. 45', min: 0, max: 180, unit: 'minutes per day' },
      { name: 'stressLevel', label: 'Stress level', icon: Sparkle, type: 'number', placeholder: '1 to 10', min: 1, max: 10, unit: '1 is low, 10 is high' },
      { name: 'bmiCategory', label: 'BMI category', icon: Scales, type: 'select', placeholder: 'Select category', options: ['Normal', 'Overweight'] },
      { name: 'bloodPressure', label: 'Blood pressure', icon: Drop, type: 'number', placeholder: 'e.g. 120', min: 90, max: 180, unit: 'systolic mmHg' },
      { name: 'heartRate', label: 'Resting heart rate', icon: Heartbeat, type: 'number', placeholder: 'e.g. 72', min: 50, max: 120, unit: 'beats per minute' },
      { name: 'dailySteps', label: 'Daily steps', icon: Footprints, type: 'number', placeholder: 'e.g. 7,500', min: 1000, max: 20000, unit: 'your typical day' },
    ],
  },
]

function Field({ field, value, onChange }) {
  const Icon = field.icon

  return (
    <div className="field">
      <label htmlFor={field.name} className="field-label">
        <Icon size={18} weight="bold" aria-hidden="true" />
        {field.label}
      </label>
      {field.type === 'select' ? (
        <div className="select-wrap">
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            required
            className="field-control field-select"
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <CaretDown size={16} weight="bold" className="select-caret" aria-hidden="true" />
        </div>
      ) : (
        <input
          id={field.name}
          name={field.name}
          type="number"
          value={value}
          onChange={onChange}
          min={field.min}
          max={field.max}
          step={field.step || '1'}
          inputMode="decimal"
          required
          className="field-control"
          placeholder={field.placeholder}
        />
      )}
      <span className="field-hint">{field.unit}</span>
    </div>
  )
}

function LoadingState() {
  return (
    <section className="analysis-state" aria-live="polite" aria-label="Analysing your inputs">
      <div className="analysis-state__header">
        <div className="skeleton skeleton-icon" />
        <div>
          <div className="skeleton skeleton-line skeleton-line--title" />
          <div className="skeleton skeleton-line skeleton-line--body" />
        </div>
      </div>
      <div className="analysis-state__bars">
        <div className="skeleton skeleton-bar" />
        <div className="skeleton skeleton-bar skeleton-bar--short" />
        <div className="skeleton skeleton-bar skeleton-bar--medium" />
      </div>
      <p>Reviewing the patterns in your inputs.</p>
    </section>
  )
}

function App() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const resultRef = useRef(null)

  useEffect(() => {
    if (prediction && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [prediction])

  const fillDemoData = () => {
    setFormData({
      gender: 'Male',
      age: '35',
      occupation: 'Software Engineer',
      sleepDuration: '5.5',
      qualityOfSleep: '4',
      physicalActivity: '30',
      stressLevel: '8',
      bmiCategory: 'Normal',
      bloodPressure: '130',
      heartRate: '85',
      dailySteps: '5000',
    })
    setError('')
    setPrediction(null)
  }

  const startOver = () => {
    setPrediction(null)
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setPrediction(null)

    try {
      const occupationIndex = OCCUPATIONS.indexOf(formData.occupation)
      const response = await axios.post(`${API_BASE}/predict`, {
        gender: formData.gender === 'Male' ? 1 : 0,
        age: Number(formData.age),
        occupation: occupationIndex >= 0 ? occupationIndex : 0,
        sleep_duration: Number(formData.sleepDuration),
        quality_of_sleep: Number(formData.qualityOfSleep),
        physical_activity: Number(formData.physicalActivity),
        stress_level: Number(formData.stressLevel),
        bmi_category: formData.bmiCategory === 'Overweight' ? 1 : 0,
        blood_pressure: Number(formData.bloodPressure),
        heart_rate: Number(formData.heartRate),
        daily_steps: Number(formData.dailySteps),
      })
      setPrediction(response.data)
    } catch (requestError) {
      setError('We could not reach the screening service. Check your connection and try again.')
      console.error(requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#assessment">Skip to assessment</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sleep Oracle home">
          <span className="brand-mark"><MoonStars size={22} weight="fill" aria-hidden="true" /></span>
          <span>Sleep Oracle</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#assessment">Assessment</a>
          <a href="#how-it-works">How it works</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-container">
          <div className="hero-copy reveal">
            <p className="eyebrow">Sleep health screening</p>
            <h1>Make sense of the patterns behind your sleep.</h1>
            <p className="hero-lede">Answer a few questions about your routine and get a clear, model-based signal to help decide what deserves attention next.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#assessment">
                Start the check <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <button className="button button-text" type="button" onClick={fillDemoData}>Load an example</button>
            </div>
          </div>

          <aside className="hero-brief reveal reveal--late" aria-label="What the assessment includes">
            <p className="eyebrow">Before you begin</p>
            <dl>
              <div>
                <dt>One short form</dt>
                <dd>Eleven everyday health and routine inputs.</dd>
              </div>
              <div>
                <dt>Clear context</dt>
                <dd>Your result explains what a screening signal can and cannot tell you.</dd>
              </div>
              <div>
                <dt>Private by design</dt>
                <dd>Your answers are used to generate this result and are not saved in the app.</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="process-section page-container" id="how-it-works" aria-labelledby="process-title">
          <div className="section-intro">
            <p className="eyebrow">A measured starting point</p>
            <h2 id="process-title">A screening signal, not a diagnosis.</h2>
          </div>
          <ol className="process-list">
            <li><span>Share your usual sleep routine</span><ArrowRight size={18} weight="bold" aria-hidden="true" /></li>
            <li><span>The model compares related patterns</span><ArrowRight size={18} weight="bold" aria-hidden="true" /></li>
            <li><span>Use the result to guide your next step</span></li>
          </ol>
        </section>

        <section className="assessment-section page-container" id="assessment" aria-labelledby="assessment-title">
          <div className="assessment-layout">
            <div className="assessment-intro">
              <p className="eyebrow">Your assessment</p>
              <h2 id="assessment-title">Tell us about a typical week.</h2>
              <p>Accuracy starts with a realistic average. If a number varies, use the value that best represents most days.</p>
              <button className="demo-link" type="button" onClick={fillDemoData}>
                <Sparkle size={17} weight="bold" aria-hidden="true" />
                Load a sample profile
              </button>
            </div>

            <form className="assessment-form" onSubmit={handleSubmit}>
              {formSections.map((section) => (
                <fieldset className="form-section" key={section.title}>
                  <legend>{section.title}</legend>
                  <p className="form-section__description">{section.description}</p>
                  <div className={`field-grid field-grid--${section.fields.length}`}>
                    {section.fields.map((field) => (
                      <Field key={field.name} field={field} value={formData[field.name]} onChange={handleChange} />
                    ))}
                  </div>
                </fieldset>
              ))}

              <div className="form-footer">
                <p><LockKey size={17} weight="bold" aria-hidden="true" /> This check is a screening aid and is not medical advice.</p>
                <button className="button button-primary button-submit" type="submit" disabled={loading}>
                  {loading ? 'Reviewing your inputs' : 'Review my sleep patterns'}
                  {!loading && <ArrowRight size={18} weight="bold" aria-hidden="true" />}
                </button>
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
            </form>
          </div>

          {loading && <LoadingState />}
          {prediction && (
            <div className="result-anchor" ref={resultRef} tabIndex="-1">
              <PredictionResult prediction={prediction} onStartOver={startOver} />
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer page-container" id="privacy">
        <div className="footer-brand"><MoonStars size={18} weight="fill" aria-hidden="true" /> Sleep Oracle</div>
        <p>Sleep health screening for informed conversations, not clinical decisions.</p>
        <p className="footer-meta">Your answers are not retained by this interface.</p>
      </footer>
    </div>
  )
}

export default App
>>>>>>> d01f353f9618da27ee51f94535596529dcc7629f

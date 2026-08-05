const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export const API_BASE = rawApiUrl.startsWith('http') ? rawApiUrl : `https://${rawApiUrl}`

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}

export const api = {
  predict: (profile) => request('/predict', { method: 'POST', body: JSON.stringify(profile) }),
  assessment: (profile) => request('/api/assessment', { method: 'POST', body: JSON.stringify(profile) }),
  dashboard: (profile) => request('/api/dashboard', { method: 'POST', body: JSON.stringify(profile) }),
  coach: (profile) => request('/api/coach/daily', { method: 'POST', body: JSON.stringify(profile) }),
  analytics: (profile) => request('/api/analytics', { method: 'POST', body: JSON.stringify(profile) }),
  risks: (profile) => request('/api/risks', { method: 'POST', body: JSON.stringify(profile) }),
  explain: (profile, riskKey) => request('/api/explain', { method: 'POST', body: JSON.stringify({ ...profile, risk_key: riskKey }) }),
  chat: (message, profile) => request('/api/chat', { method: 'POST', body: JSON.stringify({ message, profile }) }),
  plan: (profile) => request('/api/plan', { method: 'POST', body: JSON.stringify(profile) }),
  environment: (env) => request('/api/environment', { method: 'POST', body: JSON.stringify(env) }),
  alarm: (profile) => request('/api/alarm', { method: 'POST', body: JSON.stringify(profile) }),
  wearable: (profile, device) => request('/api/wearable', { method: 'POST', body: JSON.stringify({ ...profile, device }) }),
  timeline: (profile, period) => request('/api/timeline', { method: 'POST', body: JSON.stringify({ ...profile, period }) }),
  recovery: (profile) => request('/api/recovery', { method: 'POST', body: JSON.stringify(profile) }),
  challenges: () => request('/api/challenges'),
  family: () => request('/api/family'),
  enterprise: () => request('/api/enterprise'),
  research: () => request('/api/research'),
  admin: () => request('/api/admin/metrics'),
  notifications: (profile) => request('/api/notifications', { method: 'POST', body: JSON.stringify(profile) }),
  journalInsights: (entries) => request('/api/journal/insights', { method: 'POST', body: JSON.stringify({ entries }) }),
}

export const OCCUPATIONS = [
  'Accountant', 'Doctor', 'Engineer', 'Lawyer', 'Manager',
  'Nurse', 'Sales Representative', 'Salesperson', 'Scientist',
  'Software Engineer', 'Teacher',
]

export const DEFAULT_PROFILE = {
  gender: 1,
  age: 32,
  occupation: 9,
  sleep_duration: 6.8,
  quality_of_sleep: 6,
  physical_activity: 40,
  stress_level: 6,
  bmi_category: 0,
  blood_pressure: 120,
  heart_rate: 74,
  daily_steps: 6500,
}

export const WEARABLE_DEVICES = ['Apple Watch', 'Fitbit', 'Garmin', 'WHOOP', 'Samsung Watch']

export const HABIT_FIELDS = [
  { key: 'bedtime', label: 'Bedtime', placeholder: '10:45 PM' },
  { key: 'wake_time', label: 'Wake time', placeholder: '6:30 AM' },
  { key: 'caffeine', label: 'Caffeine (cups)', placeholder: '2' },
  { key: 'alcohol', label: 'Alcohol (units)', placeholder: '0' },
  { key: 'water', label: 'Water (glasses)', placeholder: '8' },
  { key: 'exercise', label: 'Exercise (min)', placeholder: '30' },
  { key: 'stress', label: 'Stress (1-10)', placeholder: '5' },
  { key: 'screen_time', label: 'Screen time (hrs)', placeholder: '3' },
  { key: 'meals', label: 'Last meal time', placeholder: '7:30 PM' },
]

export const ROADMAP_ITEMS = [
  'Live wearable integrations (Apple Health, Google Fit, Fitbit)',
  'Smart home integration (lights, thermostats)',
  'Snoring detection from audio',
  'Sleep stage estimation from sensor data',
  'Computer vision posture analysis',
  'Sleep lab dashboard',
  'Clinical decision support',
  'Multi-language AI coach',
]

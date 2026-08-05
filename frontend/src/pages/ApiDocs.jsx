import { BezelCard, PageHeader } from '../components/ui'

const endpoints = [
  { method: 'POST', path: '/predict', description: 'Sleep disorder screening + score bundle' },
  { method: 'POST', path: '/api/assessment', description: 'Full assessment metrics' },
  { method: 'POST', path: '/api/dashboard', description: 'Personal dashboard payload' },
  { method: 'POST', path: '/api/coach/daily', description: 'Daily coaching recommendations' },
  { method: 'POST', path: '/api/analytics', description: 'Trends, heatmaps, distributions' },
  { method: 'POST', path: '/api/risks', description: 'Multi-model risk predictions' },
  { method: 'POST', path: '/api/explain', description: 'Explainable AI factor breakdown' },
  { method: 'POST', path: '/api/chat', description: 'Sleep assistant Q&A' },
  { method: 'POST', path: '/api/plan', description: '30-day sleep plan' },
  { method: 'POST', path: '/api/environment', description: 'Environment impact analysis' },
  { method: 'POST', path: '/api/alarm', description: 'Smart alarm optimization' },
  { method: 'POST', path: '/api/wearable', description: 'Simulated wearable sync' },
  { method: 'POST', path: '/api/timeline', description: 'Longitudinal timeline data' },
  { method: 'POST', path: '/api/recovery', description: 'Recovery intelligence metrics' },
  { method: 'GET', path: '/api/challenges', description: 'Gamification state' },
  { method: 'GET', path: '/api/enterprise', description: 'Enterprise analytics' },
  { method: 'GET', path: '/api/admin/metrics', description: 'Admin platform metrics' },
]

export default function ApiDocsPage() {
  return (
    <div>
      <PageHeader
        title="Sleep API Platform"
        description="Production-style SaaS endpoints for sleep prediction, scoring, recovery, fatigue, and recommendations."
      />
      <BezelCard>
        <pre className="overflow-x-auto font-mono text-xs leading-6 text-white/70">
{`curl -X POST http://localhost:5000/api/dashboard \\
  -H "Content-Type: application/json" \\
  -d '{"sleep_duration": 6.8, "quality_of_sleep": 6, "stress_level": 6}'`}
        </pre>
      </BezelCard>
      <div className="mt-4 space-y-3">
        {endpoints.map((endpoint) => (
          <BezelCard key={endpoint.path}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-moon-400/15 px-2.5 py-1 font-mono text-xs text-moon-300">{endpoint.method}</span>
              <code className="font-mono text-sm text-white">{endpoint.path}</code>
            </div>
            <p className="mt-2 text-sm text-white/55">{endpoint.description}</p>
          </BezelCard>
        ))}
      </div>
    </div>
  )
}

import { ROADMAP_ITEMS } from '../lib/api'
import { BezelCard, PageHeader } from '../components/ui'

export default function RoadmapPage() {
  return (
    <div>
      <PageHeader
        title="Future Roadmap"
        description="Advanced capabilities planned for production rollout beyond this portfolio showcase."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {ROADMAP_ITEMS.map((item, index) => (
          <BezelCard key={item}>
            <div className="flex items-start gap-4">
              <span className="font-mono text-sm text-white/30">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-semibold text-white">{item}</h3>
                <p className="mt-2 text-sm text-white/50">Planned production integration</p>
              </div>
            </div>
          </BezelCard>
        ))}
      </div>
      <BezelCard className="mt-6">
        <h3 className="font-semibold text-white">Production architecture target</h3>
        <pre className="mt-4 overflow-x-auto font-mono text-xs leading-6 text-white/65">
{`React / Next.js -> API Gateway -> Auth -> Assessment Service
-> Prediction Service -> Recommendation Engine -> LLM Sleep Coach
-> Notification Service -> Analytics Service -> PostgreSQL -> Redis
-> MLflow -> Docker -> GitHub Actions -> Cloud Deployment`}
        </pre>
      </BezelCard>
    </div>
  )
}

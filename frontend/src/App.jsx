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

import { useState } from 'react'
import { PaperPlaneTilt } from '@phosphor-icons/react'
import { api } from '../lib/api'
import { useSleep } from '../context/SleepContext'
import { BezelCard, PageHeader, PillButton } from '../components/ui'

const suggestions = [
  'Why is my sleep score low?',
  'What caused my insomnia risk?',
  'Can I drink coffee today?',
  'Should I take a nap?',
  'How much sleep debt do I have?',
]

export default function ChatPage() {
  const { encodedProfile } = useSleep()
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Ask me about your sleep score, risks, caffeine, naps, or sleep debt.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (text) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)
    try {
      const res = await api.chat(text, encodedProfile)
      setMessages((prev) => [...prev, { role: 'assistant', text: res.answer }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'I could not reach the coach service. Start the backend and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader title="AI Sleep Chat Assistant" description="Ask natural-language questions grounded in your profile, history, and predictions." />
      <BezelCard className="mb-4">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button key={item} type="button" onClick={() => send(item)} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10">
              {item}
            </button>
          ))}
        </div>
      </BezelCard>
      <BezelCard>
        <div className="max-h-[420px] space-y-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'ml-auto bg-moon-400/20 text-moon-100' : 'bg-white/5 text-white/75'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); send(input) }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your sleep..." className="flex-1 rounded-full border border-white/10 bg-night-900 px-4 py-3 text-white outline-none focus:border-moon-400/50" />
          <PillButton disabled={loading}><PaperPlaneTilt size={16} weight="bold" /> Send</PillButton>
        </form>
      </BezelCard>
    </div>
  )
}

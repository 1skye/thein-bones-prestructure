'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Palette, Brain, ShieldCheck, Cpu, Code2, Info, ChevronRight, Check } from 'lucide-react'
import { models } from '@/components/thien/mock-data'

const sections = [
  { key: 'general',     label: 'General',     icon: Settings },
  { key: 'appearance',  label: 'Appearance',  icon: Palette },
  { key: 'memory',      label: 'Memory',      icon: Brain },
  { key: 'privacy',     label: 'Privacy',     icon: ShieldCheck },
  { key: 'models',      label: 'Models',      icon: Cpu },
  { key: 'developer',   label: 'Developer',   icon: Code2 },
  { key: 'about',       label: 'About',       icon: Info },
]

function Row({ label, hint, children }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-border/50 last:border-0">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="mt-0.5 text-xs text-muted-foreground max-w-md">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}

function Toggle({ initial = false }) {
  const [on, setOn] = useState(initial)
  return (
    <button onClick={() => setOn((v) => !v)} className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-blue-500' : 'bg-white/10'}`}>
      <motion.span layout className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow" animate={{ x: on ? 20 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
    </button>
  )
}

export default function SettingsPage() {
  const [section, setSection] = useState('general')
  const [model, setModel] = useState('thien-1-pro')

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">Configure how Thien remembers, reasons, and acts.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        {/* Nav */}
        <div className="md:sticky md:top-20 self-start">
          <nav className="space-y-0.5">
            {sections.map((s) => {
              const Icon = s.icon
              const active = section === s.key
              return (
                <button
                  key={s.key}
                  onClick={() => setSection(s.key)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${active ? 'bg-white/5 text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{s.label}</span>
                  <ChevronRight className={`ml-auto h-3.5 w-3.5 transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <motion.div key={section} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="rounded-2xl border border-border/60 bg-card/40">
          <div className="p-6">
            {section === 'general' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">General</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Your identity and defaults.</p>
                <div className="mt-5">
                  <Row label="Display name" hint="How Thien addresses you.">
                    <input defaultValue="Thien Nguyen" className="h-9 px-3 text-sm rounded-lg bg-white/[0.03] border border-border/60 outline-none w-64" />
                  </Row>
                  <Row label="Timezone" hint="Used for scheduling and briefings.">
                    <select className="h-9 px-3 text-sm rounded-lg bg-white/[0.03] border border-border/60 outline-none w-64">
                      <option>Asia/Ho_Chi_Minh (GMT+7)</option><option>America/Los_Angeles</option><option>Europe/London</option>
                    </select>
                  </Row>
                  <Row label="Language" hint="Interface language.">
                    <select className="h-9 px-3 text-sm rounded-lg bg-white/[0.03] border border-border/60 outline-none w-64">
                      <option>English</option><option>Tiếng Việt</option><option>日本語</option>
                    </select>
                  </Row>
                  <Row label="Voice" hint="Preferred voice for spoken replies.">
                    <select className="h-9 px-3 text-sm rounded-lg bg-white/[0.03] border border-border/60 outline-none w-64">
                      <option>Ash — warm, calm</option><option>Ember — crisp, professional</option>
                    </select>
                  </Row>
                </div>
              </>
            )}

            {section === 'appearance' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">Appearance</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Make Thien feel like yours.</p>
                <div className="mt-5">
                  <Row label="Theme" hint="Interface color scheme.">
                    <div className="flex items-center gap-2">
                      {['Dark', 'Light', 'System'].map((t, i) => (
                        <button key={t} className={`h-8 px-3 rounded-md text-xs border ${i === 0 ? 'bg-white text-black border-white' : 'border-border/60 text-muted-foreground'}`}>{t}</button>
                      ))}
                    </div>
                  </Row>
                  <Row label="Accent color" hint="Used across highlights and CTAs.">
                    <div className="flex items-center gap-2">
                      {['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500'].map((c, i) => (
                        <button key={c} className={`h-6 w-6 rounded-full ${c} ring-2 ring-offset-2 ring-offset-background ${i === 0 ? 'ring-white' : 'ring-transparent'}`} />
                      ))}
                    </div>
                  </Row>
                  <Row label="Reduce motion" hint="Minimize animations across the app."><Toggle /></Row>
                  <Row label="Compact mode" hint="Denser layouts and smaller typography."><Toggle /></Row>
                </div>
              </>
            )}

            {section === 'memory' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">Memory</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Control what Thien learns about you.</p>
                <div className="mt-5">
                  <Row label="Long-term memory" hint="Persist facts across conversations."><Toggle initial={true} /></Row>
                  <Row label="Auto-summarize documents" hint="When a new file is added, summarize into memory."><Toggle initial={true} /></Row>
                  <Row label="Learn from chats" hint="Extract preferences, goals, and people mentioned."><Toggle initial={true} /></Row>
                  <Row label="Retention window" hint="How long to keep low-importance memories.">
                    <select className="h-9 px-3 text-sm rounded-lg bg-white/[0.03] border border-border/60 outline-none w-40"><option>Forever</option><option>1 year</option><option>90 days</option></select>
                  </Row>
                  <div className="pt-4">
                    <button className="h-9 px-3 rounded-lg border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 text-sm">Clear all memory…</button>
                  </div>
                </div>
              </>
            )}

            {section === 'privacy' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">Privacy</h2>
                <p className="text-sm text-muted-foreground mt-0.5">You own your data. Always.</p>
                <div className="mt-5">
                  <Row label="Local-first mode" hint="Process on-device where possible."><Toggle initial={true} /></Row>
                  <Row label="Improve Thien" hint="Share anonymized usage to help us improve."><Toggle /></Row>
                  <Row label="End-to-end encryption" hint="Encrypt memory and files with your key."><Toggle initial={true} /></Row>
                  <Row label="Export data" hint="Download everything Thien knows about you.">
                    <button className="h-9 px-3 rounded-lg border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-sm">Export…</button>
                  </Row>
                </div>
              </>
            )}

            {section === 'models' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">Models</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Pick your default. Switch anytime in chat.</p>
                <div className="mt-5 space-y-2">
                  {models.map((m) => {
                    const active = model === m.id
                    return (
                      <button key={m.id} onClick={() => setModel(m.id)} className={`w-full text-left rounded-xl border p-4 transition-all flex items-center gap-4 ${active ? 'border-blue-500/40 bg-blue-500/[0.06]' : 'border-border/60 bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${active ? 'bg-blue-500/20' : 'bg-white/[0.05]'}`}>
                          <Cpu className={`h-4 w-4 ${active ? 'text-blue-300' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{m.name}</div>
                          <div className="text-xs text-muted-foreground">{m.desc}</div>
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">{m.context}</div>
                        {active && <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center"><Check className="h-3.5 w-3.5 text-white" /></div>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {section === 'developer' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">Developer</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Build on Thien.</p>
                <div className="mt-5">
                  <Row label="API key" hint="Use to access the Thien API from your apps.">
                    <div className="flex items-center gap-2">
                      <code className="h-9 px-3 text-xs rounded-lg bg-[hsl(0_0%_2%)] border border-border/60 flex items-center font-mono text-muted-foreground">thn_••••••••••••••••4b2a</code>
                      <button className="h-9 px-3 rounded-lg border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-sm">Rotate</button>
                    </div>
                  </Row>
                  <Row label="Webhooks" hint="Receive events for memory and automation updates."><Toggle /></Row>
                  <Row label="Beta features" hint="Opt into experimental capabilities."><Toggle initial={true} /></Row>
                </div>
              </>
            )}

            {section === 'about' && (
              <>
                <h2 className="text-lg font-semibold tracking-tight">About</h2>
                <div className="mt-5 rounded-xl border border-border/60 bg-white/[0.02] p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">✨</div>
                    <div>
                      <div className="text-sm font-medium">Thien AI Operating System</div>
                      <div className="text-xs text-muted-foreground">Version 1.0.0 — built with care in Ho Chi Minh City</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Thien is a personal AI that remembers, understands, and acts. Our mission is to give every person a mind that grows with them.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {['Changelog', 'Documentation', 'Terms', 'Privacy'].map((l) => (
                      <a key={l} className="px-3 h-8 rounded-md border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] inline-flex items-center" href="#">{l}</a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

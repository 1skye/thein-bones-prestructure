'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Plus, MoreHorizontal, Zap, Clock, Activity, CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { automations } from '@/components/thien/mock-data'

const historyItems = [
  { time: '9:04 AM', name: 'Morning briefing',    status: 'success', duration: '1.2s' },
  { time: '8:45 AM', name: 'Inbox triage',        status: 'success', duration: '0.8s' },
  { time: '8:30 AM', name: 'Meeting notes → CRM', status: 'success', duration: '2.1s' },
  { time: '8:15 AM', name: 'Deep-work protector', status: 'success', duration: '0.4s' },
  { time: '7:00 AM', name: 'Morning briefing',    status: 'success', duration: '1.4s' },
  { time: '6:44 AM', name: 'Doc summarizer',      status: 'failed',  duration: '3.2s' },
  { time: '6:00 AM', name: 'Inbox triage',        status: 'success', duration: '0.9s' },
]

const statusMeta = {
  success: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/20', Icon: CheckCircle2 },
  failed:  { color: 'text-rose-400',    bg: 'bg-rose-500/10',    ring: 'ring-rose-500/20',    Icon: XCircle },
  warn:    { color: 'text-amber-400',   bg: 'bg-amber-500/10',   ring: 'ring-amber-500/20',   Icon: AlertCircle },
}

export default function AutomationsPage() {
  const [running, setRunning] = useState(null)

  const run = (id) => {
    setRunning(id)
    setTimeout(() => setRunning(null), 1800)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground"><Zap className="h-3.5 w-3.5" /> Automations</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Thien acts, not just answers.</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Workflows that run on schedule, on trigger, or on command — with full audit trail.</p>
        </div>
        <button className="h-9 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New automation
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active',       value: '5',    tint: 'text-emerald-400' },
          { label: 'Runs today',   value: '38',   tint: 'text-blue-400' },
          { label: 'Success rate', value: '99.2%',tint: 'text-emerald-400' },
          { label: 'Avg. duration',value: '1.4s', tint: 'text-foreground' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-2xl font-semibold tracking-tight ${s.tint}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold tracking-tight">Your workflows</h2>
            <span className="text-xs text-muted-foreground">{automations.length} total</span>
          </div>
          {automations.map((a, i) => {
            const isRunning = running === a.id
            const active = a.status === 'active'
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-border/60 bg-card/40 overflow-hidden"
              >
                <div className="p-4 flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] flex items-center justify-center shrink-0">
                    <Zap className={`h-4 w-4 ${active ? 'text-blue-400' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-medium text-sm">{a.name}</div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${active ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20' : 'bg-white/5 text-muted-foreground ring-white/10'}`}>{active ? 'Active' : 'Paused'}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.desc}</p>
                    <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Activity className="h-3 w-3" /> {a.runs} runs</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.lastRun}</span>
                      <span>{a.duration} avg</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => run(a.id)} disabled={isRunning} className="h-8 px-2.5 rounded-md border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-xs inline-flex items-center gap-1.5 disabled:opacity-60">
                      {isRunning ? (
                        <><span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /> Running</>
                      ) : (
                        <><Play className="h-3.5 w-3.5" /> Run</>
                      )}
                    </button>
                    <button className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground">
                      {active ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                    <button className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                  </div>
                </div>
                <AnimatePresence>
                  {isRunning && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-border/60 bg-white/[0.02] px-4 py-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                        <span>Executing steps</span><span>step 2 of 4</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.6, ease: 'easeInOut' }} className="h-full bg-blue-500" />
                      </div>
                      <div className="mt-2 text-[11px] text-muted-foreground font-mono">❯ Fetching context → running LLM → posting result</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold tracking-tight">Recent runs</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">All logs <ChevronRight className="h-3 w-3" /></button>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden">
            {historyItems.map((h, i) => {
              const meta = statusMeta[h.status]
              const Icon = meta.Icon
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border/40 last:border-0">
                  <div className={`h-7 w-7 rounded-md flex items-center justify-center ${meta.bg} ring-1 ${meta.ring}`}>
                    <Icon className={`h-3.5 w-3.5 ${meta.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{h.name}</div>
                    <div className="text-[11px] text-muted-foreground">{h.time} • {h.duration}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Log viewer */}
          <div className="mt-4 rounded-xl border border-border/60 bg-[hsl(0_0%_2%)] overflow-hidden">
            <div className="px-3 py-2 border-b border-border/60 text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Log — morning briefing</span>
              <span className="font-mono">9:04 AM</span>
            </div>
            <pre className="p-3 text-[11.5px] font-mono text-muted-foreground leading-relaxed overflow-x-auto">
{`[09:04:01] ❯ trigger: schedule@07:00
[09:04:01] ❯ fetch calendar (3 events)
[09:04:02] ❯ fetch inbox (12 new)
[09:04:02] ❯ rank priority senders
[09:04:03] ❯ draft briefing
[09:04:03] ✓ deliver to home screen
[09:04:03] done in 1.24s`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

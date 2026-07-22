'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Sparkles, Brain, Zap, FileText, MessageSquare, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react'
import { conversations, suggestedPrompts } from '@/components/thien/mock-data'

const hour = new Date().getHours()
const greeting = hour < 5 ? 'Still up' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

const stats = [
  { label: 'Conversations',   value: '128', delta: '+12 this week', icon: MessageSquare },
  { label: 'Memories stored', value: '2,341', delta: '+48 today',     icon: Brain },
  { label: 'Automations run', value: '412', delta: '+38 today',     icon: Zap },
]

export default function HomePage() {
  return (
    <div className="relative">
      <div className="hero-glow absolute inset-x-0 top-0 h-[520px] pointer-events-none" />
      <div className="grid-pattern absolute inset-x-0 top-0 h-[520px] pointer-events-none opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Thien 1 Pro — all systems nominal
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-balance">
            {greeting}, <span className="text-muted-foreground">Thien.</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Here’s what I remembered, learned, and did while you were away.
          </p>
        </motion.div>

        {/* Ask bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 rounded-2xl border border-border/70 bg-card/60 p-2 shadow-xl shadow-black/40"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <input
              placeholder="Ask Thien anything, or start with a task…"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            <kbd className="text-[10px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
            <button className="h-8 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90">Ask</button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 px-3 pb-2">
            {['Summarize inbox', 'What\'s on my calendar?', 'Draft investor update', 'Find last week\'s decisions'].map((t) => (
              <button key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-foreground/80">
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                className="rounded-xl border border-border/60 bg-card/40 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <Icon className="h-4 w-4 text-muted-foreground/70" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                  <div className="text-[11px] text-emerald-400">{s.delta}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Suggestions */}
        <div className="mt-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Suggested for you</h2>
              <p className="text-sm text-muted-foreground">Based on your recent activity and memory</p>
            </div>
            <Link href="/chat" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              See all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {suggestedPrompts.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.button
                  key={s.title}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="group text-left rounded-xl border border-border/60 bg-card/40 hover:bg-card/70 hover:border-border transition-all p-4"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.desc}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-muted-foreground group-hover:text-foreground">
                    Run <ArrowUpRight className="h-3 w-3" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Continue working + Recent conversations */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Continue working</h2>
                <p className="text-sm text-muted-foreground">Pick up where you left off</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 divide-y divide-border/60">
              {conversations.slice(0, 5).map((c, i) => (
                <Link key={c.id} href="/chat" className="block">
                  <motion.div
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white/[0.04] ring-1 ring-white/[0.06] flex items-center justify-center shrink-0">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium truncate">{c.title}</div>
                        {c.pinned && <span className="text-[10px] text-muted-foreground">• pinned</span>}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{c.preview}</div>
                    </div>
                    <div className="text-[11px] text-muted-foreground shrink-0 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {c.time}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Today’s brief</h2>
                <p className="text-sm text-muted-foreground">What I learned about you</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 p-4 space-y-4">
              {[
                { icon: TrendingUp, text: 'ARR crossed $2.4M — up 28% MoM.', tone: 'text-emerald-400' },
                { icon: CheckCircle2, text: 'You committed to sub-3h marathon.', tone: 'text-blue-400' },
                { icon: FileText,   text: '3 documents summarized to Memory.', tone: 'text-violet-400' },
              ].map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.text} className="flex items-start gap-3">
                    <div className={`h-6 w-6 rounded-md bg-white/[0.04] ring-1 ring-white/[0.06] flex items-center justify-center shrink-0 ${b.tone}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="text-sm text-foreground/90 leading-relaxed">{b.text}</div>
                  </div>
                )
              })}
              <button className="w-full mt-2 h-9 rounded-lg border border-border/70 bg-white/[0.02] hover:bg-white/[0.06] text-sm font-medium text-foreground/90">
                Read full briefing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Check, Download } from 'lucide-react'
import { plugins } from '@/components/thien/mock-data'

const tabs = ['All', 'Installed', 'Popular', 'New', 'Developer tools', 'Productivity']

export default function PluginsPage() {
  const [tab, setTab] = useState('All')
  const [q, setQ] = useState('')

  const list = plugins.filter((p) => {
    const okTab = tab === 'All' ? true : tab === 'Installed' ? p.installed : true
    const okQ = q ? p.name.toLowerCase().includes(q.toLowerCase()) : true
    return okTab && okQ
  })

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">Plugin marketplace</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Extend Thien everywhere.</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Connect the tools you already use. Thien reads context from them and can act on your behalf.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search plugins" className="h-9 pl-9 pr-3 text-sm rounded-lg bg-card/60 border border-border/60 outline-none placeholder:text-muted-foreground w-72" />
        </div>
      </div>

      {/* Featured */}
      <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-6 md:p-8 md:col-span-2">
            <span className="text-[10px] uppercase tracking-wider text-blue-400">Featured</span>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Thien x VS Code</h3>
            <p className="mt-2 text-muted-foreground max-w-xl">A two-way bridge between your editor and your AI OS. Refactor, search, and reason about entire repos — without leaving your workflow.</p>
            <div className="mt-4 flex items-center gap-2">
              <button className="h-9 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> Install</button>
              <button className="h-9 px-3 rounded-lg border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-sm">Learn more</button>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-blue-500/15 to-transparent border-l border-border/60 hidden md:block">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="rounded-xl border border-border/60 bg-[hsl(0_0%_2%)] p-4 shadow-2xl w-full font-mono text-[12px] text-muted-foreground">
                <div className="text-emerald-400">$ thien refactor ./src/api</div>
                <div className="mt-1">❯ extracting types …</div>
                <div>❯ rewriting handlers …</div>
                <div className="text-blue-400">✓ 8 files updated, tests passing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-1 overflow-x-auto hide-scrollbar rounded-lg border border-border/60 bg-card/40 p-1 w-fit">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 h-8 rounded-md text-xs whitespace-nowrap transition-colors ${tab === t ? 'bg-white text-black' : 'text-muted-foreground hover:text-foreground'}`}>{t}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {list.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-border/60 bg-card/40 hover:bg-card/70 hover:border-border transition-all p-5"
            >
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-foreground/90" strokeWidth={1.75} />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">v{p.version}</span>
              </div>
              <div className="mt-4 font-medium text-sm">{p.name}</div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[32px]">{p.desc}</p>
              <button className={`mt-4 w-full h-8 rounded-md text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${p.installed ? 'bg-white/[0.05] text-foreground/90 hover:bg-white/[0.08]' : 'bg-white text-black hover:bg-white/90'}`}>
                {p.installed ? <><Check className="h-3.5 w-3.5" /> Installed</> : <><Download className="h-3.5 w-3.5" /> Install</>}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

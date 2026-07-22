'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Pin, Search, Filter, Star, Users, FolderKanban, Target, Sparkles, Plus, MapPin, ArrowUpRight } from 'lucide-react'
import { memories, timelineEvents, categoryColors } from '@/components/thien/mock-data'

const categories = [
  { key: 'All',       icon: Sparkles },
  { key: 'People',    icon: Users },
  { key: 'Projects',  icon: FolderKanban },
  { key: 'Goals',     icon: Target },
  { key: 'Interests', icon: Star },
]

function Dot({ importance }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < importance ? 'bg-blue-500' : 'bg-white/10'}`} />
      ))}
    </div>
  )
}

function MemoryCard({ m, i }) {
  const cls = categoryColors[m.category] || 'bg-white/5 text-foreground/80 ring-white/10'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-xl border border-border/60 bg-card/40 p-4 hover:bg-card/70 hover:border-border transition-all"
    >
      <div className="flex items-center justify-between">
        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${cls}`}>{m.category}</span>
        <div className="flex items-center gap-2">
          {m.pinned && <Pin className="h-3.5 w-3.5 text-blue-400" />}
          <Dot importance={m.importance} />
        </div>
      </div>
      <div className="mt-3 text-[15px] font-medium leading-snug text-balance">{m.title}</div>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">{m.detail}</p>
      <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{m.time}</span>
        <span className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 transition-opacity">Open <ArrowUpRight className="h-3 w-3" /></span>
      </div>
    </motion.div>
  )
}

function GraphPlaceholder() {
  const nodes = [
    { x: 50, y: 50, r: 14, label: 'You', big: true },
    { x: 18, y: 30, r: 9, label: 'Alex' },
    { x: 80, y: 28, r: 8, label: 'Priya' },
    { x: 20, y: 78, r: 8, label: 'Kyoto' },
    { x: 82, y: 72, r: 10, label: 'Thien launch' },
    { x: 50, y: 15, r: 7, label: 'Marathon' },
    { x: 50, y: 88, r: 7, label: 'MUJI' },
    { x: 32, y: 55, r: 6, label: 'Design' },
    { x: 70, y: 50, r: 6, label: 'Rust' },
  ]
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,7],[2,4],[3,6]]
  return (
    <div className="relative aspect-[16/10] rounded-xl border border-border/60 bg-card/40 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 hero-glow" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([a,b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="hsl(0 0% 100% / 0.08)" strokeWidth="0.2" />
        ))}
      </svg>
      <div className="absolute inset-0">
        {nodes.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i, type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div className={`rounded-full ${n.big ? 'bg-blue-500 shadow-lg shadow-blue-500/40' : 'bg-white/[0.06] ring-1 ring-white/10'}`} style={{ width: n.r * 2, height: n.r * 2 }} />
            <div className={`mt-1.5 text-[10px] text-center whitespace-nowrap ${n.big ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{n.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-3 left-4 text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
        <MapPin className="h-3 w-3" /> Relationship graph — preview
      </div>
    </div>
  )
}

export default function MemoryPage() {
  const [cat, setCat] = useState('All')
  const visible = cat === 'All' ? memories : memories.filter((m) => m.category === cat)
  const pinned = memories.filter((m) => m.pinned)

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Brain className="h-3.5 w-3.5" /> Long-term memory
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Everything Thien remembers about you.</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Pinned facts, projects, people, and interests — continuously refined from your chats, files, and activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input placeholder="Search memory" className="h-9 pl-8 pr-3 text-sm rounded-lg bg-card/60 border border-border/60 outline-none placeholder:text-muted-foreground w-64" />
          </div>
          <button className="h-9 px-3 rounded-lg border border-border/60 bg-card/60 hover:bg-card/90 text-sm text-muted-foreground inline-flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="h-9 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add memory
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total memories',   value: '2,341' },
          { label: 'Pinned',           value: '18' },
          { label: 'People tracked',   value: '46' },
          { label: 'Refined this week',value: '128' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Pinned */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Pin className="h-4 w-4 text-blue-400" />
          <h2 className="text-lg font-semibold tracking-tight">Pinned memories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pinned.map((m, i) => <MemoryCard key={m.id} m={m} i={i} />)}
        </div>
      </div>

      {/* Graph + Timeline */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-tight">How your memories connect</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground">Expand →</button>
          </div>
          <GraphPlaceholder />
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-tight">Timeline</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground">This month</button>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/40 p-5">
            <ol className="relative border-l border-border/60 space-y-5 pl-5">
              {timelineEvents.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
                  <div className="text-[11px] text-muted-foreground">{e.time}</div>
                  <div className="mt-0.5 text-sm text-foreground/90">{e.title}</div>
                  <span className={`mt-2 inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${categoryColors[e.tag] || 'bg-white/5 text-foreground/80 ring-white/10'}`}>{e.tag}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Categories + Grid */}
      <div className="mt-12">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <h2 className="text-lg font-semibold tracking-tight">All memories</h2>
          <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
            {categories.map((c) => {
              const Icon = c.icon
              const active = cat === c.key
              return (
                <button key={c.key} onClick={() => setCat(c.key)} className={`px-2.5 h-7 rounded-md text-xs inline-flex items-center gap-1.5 transition-colors ${active ? 'bg-white text-black' : 'text-muted-foreground hover:text-foreground'}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {c.key}
                </button>
              )
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {visible.map((m, i) => <MemoryCard key={m.id} m={m} i={i} />)}
        </div>
      </div>
    </div>
  )
}

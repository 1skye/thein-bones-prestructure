'use client'

import { motion } from 'framer-motion'
import { Plus, Users, MessageSquare, FileText, ArrowUpRight } from 'lucide-react'
import { spaces } from '@/components/thien/mock-data'

export default function SpacesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">Spaces</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">One mind. Many contexts.</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Switch between the lives you live. Each space keeps its own memory, tools, and voice.</p>
        </div>
        <button className="h-9 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" /> New space
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 hover:border-border transition-all cursor-pointer group"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${s.tint} opacity-70 pointer-events-none`} />
              <div className="relative p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center text-lg">
                      <span>{s.emoji}</span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{s.name}</div>
                      <div className="text-[11px] text-muted-foreground">{s.activity}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {12 + i * 7} chats</span>
                  <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> {28 + i * 9} files</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {2 + i} members</span>
                </div>
                <div className="mt-5 -mx-1 flex items-center gap-2">
                  <button className="flex-1 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium">Open space</button>
                  <button className="h-8 px-3 rounded-lg border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-xs text-muted-foreground">Configure</button>
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Create tile */}
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: spaces.length * 0.05 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-dashed border-border/70 bg-transparent hover:bg-card/30 hover:border-border transition-all flex flex-col items-center justify-center p-8 text-center min-h-[220px]"
        >
          <div className="h-11 w-11 rounded-xl bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-3 text-sm font-medium">Create a new space</div>
          <div className="mt-1 text-[11px] text-muted-foreground max-w-[220px]">Give it its own memory, tools, and voice.</div>
        </motion.button>
      </div>
    </div>
  )
}

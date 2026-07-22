'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, LayoutGrid, List, FileText, Image as ImageIcon, Film,
  FileSpreadsheet, FileCode2, Figma, Upload, Tag, Sparkles, Clock, Download, Share2, MoreHorizontal
} from 'lucide-react'
import { files, categoryColors } from '@/components/thien/mock-data'

const iconFor = (type) => {
  const map = {
    pdf: FileText, md: FileCode2, doc: FileText, image: ImageIcon, video: Film,
    sheet: FileSpreadsheet, fig: Figma,
  }
  return map[type] || FileText
}

const tintFor = (type) => ({
  pdf: 'from-rose-500/20 to-rose-500/0 text-rose-300',
  md: 'from-blue-500/20 to-blue-500/0 text-blue-300',
  doc: 'from-blue-500/20 to-blue-500/0 text-blue-300',
  image: 'from-violet-500/20 to-violet-500/0 text-violet-300',
  video: 'from-amber-500/20 to-amber-500/0 text-amber-300',
  sheet: 'from-emerald-500/20 to-emerald-500/0 text-emerald-300',
  fig: 'from-fuchsia-500/20 to-fuchsia-500/0 text-fuchsia-300',
}[type] || 'from-white/10 to-white/0 text-foreground')

const filters = ['All', 'Recent', 'Documents', 'Images', 'Videos', 'Downloads']

export default function FilesPage() {
  const [view, setView] = useState('grid')
  const [selected, setSelected] = useState(files[0])
  const [filter, setFilter] = useState('All')

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5" /> Semantic file search</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Your files, understood.</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">Ask by meaning — not filename. Thien reads, tags, and summarizes everything.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center gap-1.5">
            <Upload className="h-3.5 w-3.5" /> Upload
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mt-6 rounded-2xl border border-border/70 bg-card/60 p-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <input placeholder='Try: "the deck with the June ARR numbers" or "my Kyoto plans"' className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
          <button className="h-8 px-3 rounded-md bg-white/10 hover:bg-white/15 text-sm">Ask</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 h-7 rounded-md text-xs transition-colors ${filter === f ? 'bg-white text-black' : 'text-muted-foreground hover:text-foreground'}`}>{f}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-2.5 rounded-md border border-border/60 bg-card/40 text-xs text-muted-foreground inline-flex items-center gap-1.5"><Filter className="h-3.5 w-3.5" /> Tags</button>
          <div className="flex items-center rounded-md border border-border/60 bg-card/40">
            <button onClick={() => setView('grid')} className={`h-8 w-8 flex items-center justify-center ${view === 'grid' ? 'text-foreground' : 'text-muted-foreground'}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView('list')} className={`h-8 w-8 flex items-center justify-center ${view === 'list' ? 'text-foreground' : 'text-muted-foreground'}`}><List className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Content + preview */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {files.map((f, i) => {
                const Icon = iconFor(f.type)
                const tint = tintFor(f.type)
                const active = selected?.id === f.id
                return (
                  <motion.button
                    key={f.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelected(f)}
                    className={`text-left rounded-xl border p-4 transition-all ${active ? 'bg-white/[0.05] border-border' : 'bg-card/40 border-border/60 hover:bg-card/70 hover:border-border'}`}
                  >
                    <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${tint} flex items-center justify-center border border-border/40`}>
                      <Icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div className="mt-3">
                      <div className="text-sm font-medium truncate">{f.name}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{f.size}</span>•<span>{f.updated}</span>
                      </div>
                      <span className={`mt-2 inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${categoryColors[f.tag] || 'bg-white/5 text-foreground/80 ring-white/10'}`}>{f.tag}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden">
              <div className="grid grid-cols-[1fr_100px_120px_120px_60px] px-4 py-2 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <div>Name</div><div>Size</div><div>Updated</div><div>Tag</div><div></div>
              </div>
              {files.map((f) => {
                const Icon = iconFor(f.type)
                return (
                  <button key={f.id} onClick={() => setSelected(f)} className={`w-full grid grid-cols-[1fr_100px_120px_120px_60px] items-center px-4 py-2.5 text-sm hover:bg-white/[0.03] border-b border-border/40 last:border-0 ${selected?.id === f.id ? 'bg-white/[0.04]' : ''}`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="truncate text-left">{f.name}</span>
                    </div>
                    <div className="text-muted-foreground text-xs">{f.size}</div>
                    <div className="text-muted-foreground text-xs">{f.updated}</div>
                    <div><span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${categoryColors[f.tag] || 'bg-white/5 text-foreground/80 ring-white/10'}`}>{f.tag}</span></div>
                    <div className="text-right"><MoreHorizontal className="h-4 w-4 text-muted-foreground inline-block" /></div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Preview panel */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 rounded-xl border border-border/60 bg-card/40 overflow-hidden">
            <div className={`aspect-[4/3] bg-gradient-to-br ${tintFor(selected.type)} flex items-center justify-center border-b border-border/60`}>
              {(() => { const Icon = iconFor(selected.type); return <Icon className="h-12 w-12" strokeWidth={1.25} /> })()}
            </div>
            <div className="p-5">
              <div className="text-sm font-medium">{selected.name}</div>
              <div className="mt-1 text-[11px] text-muted-foreground flex items-center gap-2">
                <Clock className="h-3 w-3" /> {selected.updated} • {selected.size}
              </div>

              <div className="mt-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground/80 mb-2 inline-flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" /> AI Summary
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  A concise draft covering the market opportunity, current traction, and the ask. Slide 3 highlights the June ARR of $2.4M with 28% MoM growth. Includes a competitor comparison and hiring plan.
                </p>
              </div>

              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground/80 mb-2 inline-flex items-center gap-1.5">
                  <Tag className="h-3 w-3" /> Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Pitch', 'Series A', 'Startup', 'Metrics'].map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-border/60 bg-white/[0.02] text-foreground/80">{t}</span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <button className="flex-1 h-9 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 inline-flex items-center justify-center gap-1.5"><Download className="h-3.5 w-3.5" /> Download</button>
                <button className="h-9 px-3 rounded-lg border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-sm"><Share2 className="h-3.5 w-3.5" /></button>
                <button className="h-9 px-3 rounded-lg border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-sm"><MoreHorizontal className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

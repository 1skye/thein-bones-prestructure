'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUp, Mic } from 'lucide-react'

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full overflow-hidden bg-black shadow-lg shadow-black/50 ring-1 ring-white/15 flex items-center justify-center"
        aria-label="Open assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-white">
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="h-full w-full">
              <Image src="/thien-icon.png" alt="Thien" width={48} height={48} className="h-full w-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mini chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[92vw] rounded-2xl border border-border/70 glass-strong shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md overflow-hidden ring-1 ring-white/10 bg-black">
                  <Image src="/thien-icon.png" alt="Thien" width={24} height={24} className="h-full w-full object-cover" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium">Thien</div>
                  <div className="text-[11px] text-muted-foreground">Ready to help</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="h-7 w-7 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-[320px] overflow-y-auto">
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                </div>
                <div className="text-sm text-foreground/90 leading-relaxed rounded-2xl rounded-tl-sm bg-white/[0.04] px-3 py-2">
                  Hi Thien. I noticed you’re on the Memory page. Want me to surface anything about <span className="text-blue-400">Kyoto</span>?
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {['Summarize my day', 'What did I promise Alex?', 'Continue pitch deck'].map((t) => (
                  <button key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-border/70 bg-white/[0.02] hover:bg-white/[0.06] text-foreground/80 transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border/60 p-2.5">
              <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Thien anything…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button className="h-7 w-7 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground">
                  <Mic className="h-4 w-4" />
                </button>
                <button className="h-7 w-7 rounded-md bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

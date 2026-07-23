'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowUp, Paperclip, Image as ImageIcon, Mic, ChevronDown, Copy, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react'
import { models } from '@/components/thien/mock-data'

const hour = new Date().getHours()
const greeting = hour < 5 ? 'Still up' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

const mockReplies = [
  "I've noted that. What would you like to do next?",
  "Got it. I'll remember this and pull it up when it's relevant.",
  "Here's a first pass \u2014 tell me what to sharpen and I'll iterate.",
  "Understood. Want me to draft a plan, or just handle it?",
]

export default function HomePage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [model, setModel] = useState('thien-1-pro')
  const scrollRef = useRef(null)
  const started = messages.length > 0 || typing

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typing])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)]
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
      setTyping(false)
    }, 900)
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)] flex flex-col">
      {!started && <div className="hero-glow absolute inset-x-0 top-0 h-[520px] pointer-events-none" />}

      {/* Messages / greeting area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full flex items-center justify-center px-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05, type: 'spring', stiffness: 260, damping: 20 }}
                  className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25 ring-1 ring-white/10 flex items-center justify-center mb-6"
                >
                  <Sparkles className="h-5 w-5 text-white" strokeWidth={2.25} />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
                  {greeting}, <span className="text-muted-foreground">Thien.</span>
                </h1>
                <p className="mt-3 text-base md:text-lg text-muted-foreground">How can I help you today?</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto w-full px-4 md:px-8 py-8 space-y-6"
            >
              {messages.map((m, i) => <Message key={i} m={m} />)}
              {typing && (
                <div className="flex gap-3 items-start">
                  <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] px-4 py-3 border border-border/40">
                    <div className="flex items-center gap-1">
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Composer */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        className={`${started ? 'border-t border-border/60 bg-background/60' : ''}`}
      >
        <div className="max-w-3xl mx-auto w-full px-4 md:px-8 py-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            className="rounded-2xl border border-border/70 bg-card/60 focus-within:border-border shadow-xl shadow-black/40 transition-colors"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
              }}
              rows={started ? 2 : 3}
              placeholder="Message Thien\u2026"
              className="w-full bg-transparent outline-none resize-none px-4 pt-3.5 text-[15px] placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-0.5">
                <button className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground"><Paperclip className="h-4 w-4" /></button>
                <button className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground"><ImageIcon className="h-4 w-4" /></button>
                <button className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground"><Mic className="h-4 w-4" /></button>
                <div className="h-4 w-px bg-border/60 mx-1" />
                <button className="h-8 px-2 rounded-md hover:bg-white/5 text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  {models.find((m) => m.id === model)?.name} <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={send}
                disabled={!input.trim()}
                className="h-8 w-8 rounded-md bg-white text-black hover:bg-white/90 flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 text-center text-[10px] text-muted-foreground">Thien can make mistakes. Verify important information.</div>
        </div>
      </motion.div>
    </div>
  )
}

function Message({ m }) {
  const isUser = m.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      className={`flex gap-3 items-start ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'order-1' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed ${isUser ? 'bg-blue-500 text-white rounded-tr-sm' : 'bg-white/[0.04] border border-border/40 rounded-tl-sm'}`}>
          <div className="whitespace-pre-wrap">{m.content}</div>
        </div>
        {!isUser && (
          <div className="mt-1.5 flex items-center gap-1 text-muted-foreground">
            <button className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center"><Copy className="h-3 w-3" /></button>
            <button className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center"><RefreshCw className="h-3 w-3" /></button>
            <button className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center"><ThumbsUp className="h-3 w-3" /></button>
            <button className="h-6 w-6 rounded hover:bg-white/5 flex items-center justify-center"><ThumbsDown className="h-3 w-3" /></button>
          </div>
        )}
      </div>
      {isUser && (
        <div className="h-7 w-7 rounded-md bg-neutral-800 ring-1 ring-white/10 flex items-center justify-center shrink-0 text-[11px] font-semibold">TH</div>
      )}
    </motion.div>
  )
}

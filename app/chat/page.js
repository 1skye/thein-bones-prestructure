'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Plus, Pin, MoreHorizontal, Paperclip, Image as ImageIcon, Mic, ArrowUp,
  Sparkles, Copy, RefreshCw, ThumbsUp, ThumbsDown, ChevronDown, Settings2
} from 'lucide-react'
import { conversations, sampleMessages, models } from '@/components/thien/mock-data'

function ModelBadge({ name, active, onClick }) {
  return (
    <button onClick={onClick} className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${active ? 'border-blue-500/40 bg-blue-500/10 text-blue-300' : 'border-border/60 bg-white/[0.02] text-muted-foreground hover:text-foreground'}`}>
      {name}
    </button>
  )
}

export default function ChatPage() {
  const [active, setActive] = useState('c1')
  const [model, setModel] = useState('thien-1-pro')
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    setTyping(true)
    setInput('')
    setTimeout(() => setTyping(false), 1600)
  }

  const activeConv = conversations.find((c) => c.id === active)

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* Conversation list */}
      <div className="hidden md:flex md:w-[300px] shrink-0 flex-col border-r border-border/60 bg-[hsl(0_0%_2.5%)]">
        <div className="p-3 space-y-2">
          <button className="w-full h-9 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> New chat
          </button>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input placeholder="Search conversations" className="w-full h-8 pl-8 pr-2 text-xs rounded-md bg-card/60 border border-border/60 outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5">
          <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Pinned</div>
          {conversations.filter((c) => c.pinned).map((c) => (
            <ConvItem key={c.id} c={c} active={active === c.id} onClick={() => setActive(c.id)} />
          ))}
          <div className="px-2 pt-3 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Recent</div>
          {conversations.filter((c) => !c.pinned).map((c) => (
            <ConvItem key={c.id} c={c} active={active === c.id} onClick={() => setActive(c.id)} />
          ))}
        </div>
      </div>

      {/* Message area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Chat header */}
        <div className="h-12 flex items-center justify-between px-4 md:px-6 border-b border-border/60">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{activeConv?.title || 'New conversation'}</div>
            <div className="text-[11px] text-muted-foreground">8 messages • updated 2m ago</div>
          </div>
          <div className="flex items-center gap-1">
            <button className="h-8 px-2 rounded-md hover:bg-white/5 text-muted-foreground text-xs inline-flex items-center gap-1.5">
              <Settings2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tools</span>
            </button>
            <div className="h-4 w-px bg-border/60 mx-1" />
            <div className="hidden md:flex items-center gap-1.5">
              {models.map((m) => (
                <ModelBadge key={m.id} name={m.name} active={model === m.id} onClick={() => setModel(m.id)} />
              ))}
            </div>
            <button className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 space-y-6">
            {sampleMessages.map((m, i) => (
              <Message key={i} m={m} />
            ))}
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
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-border/60 bg-background/60">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-4">
            {/* Suggested prompts */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {['Continue', 'Make it shorter', 'More concise', 'Explain like I’m 5', 'Turn into email'].map((s) => (
                <button key={s} className="text-[11px] px-2.5 py-1 rounded-full border border-border/60 bg-white/[0.02] hover:bg-white/[0.06] text-foreground/80">
                  {s}
                </button>
              ))}
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              className="rounded-2xl border border-border/70 bg-card/60 focus-within:border-border transition-colors"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                rows={2}
                placeholder="Message Thien… (drag files here)"
                className="w-full bg-transparent outline-none resize-none px-4 pt-3 text-sm placeholder:text-muted-foreground"
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
                  className="h-8 w-8 rounded-md bg-white text-black hover:bg-white/90 flex items-center justify-center disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-center text-[10px] text-muted-foreground">Thien can make mistakes. Verify important information.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConvItem({ c, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left rounded-lg px-2.5 py-2 transition-colors ${active ? 'bg-white/5' : 'hover:bg-white/[0.03]'}`}
    >
      <div className="flex items-center gap-2">
        <div className={`text-sm font-medium truncate ${active ? 'text-foreground' : 'text-foreground/90'}`}>{c.title}</div>
        {c.pinned && <Pin className="h-3 w-3 text-muted-foreground shrink-0" />}
        {c.unread && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />}
      </div>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <div className="text-[11px] text-muted-foreground truncate">{c.preview}</div>
        <div className="text-[10px] text-muted-foreground shrink-0">{c.time}</div>
      </div>
    </button>
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
          <MessageBody content={m.content} />
          {m.code && (
            <pre className="mt-3 rounded-lg border border-border/60 bg-[hsl(0_0%_2%)] p-3 text-[12.5px] overflow-x-auto font-mono text-foreground/90">
              <code>{m.code}</code>
            </pre>
          )}
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

function MessageBody({ content }) {
  // Simple markdown-ish: split lines, render blockquotes and bold **
  const lines = content.split('\n')
  return (
    <div className="space-y-2">
      {lines.map((ln, i) => {
        if (ln.startsWith('> ')) {
          return <blockquote key={i} className="border-l-2 border-blue-500/60 pl-3 text-foreground/80">{formatInline(ln.slice(2))}</blockquote>
        }
        if (!ln.trim()) return <div key={i} className="h-1" />
        return <p key={i}>{formatInline(ln)}</p>
      })}
    </div>
  )
}

function formatInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
    return <span key={i}>{p}</span>
  })
}

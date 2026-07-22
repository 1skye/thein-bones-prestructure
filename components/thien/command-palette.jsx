'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search, MessageSquare, Brain, FolderOpen, Zap, Layers, Puzzle, Settings, Home, Sparkles, ArrowRight } from 'lucide-react'

const items = [
  { group: 'Navigate', label: 'Home',        icon: Home,          href: '/' },
  { group: 'Navigate', label: 'Chat',        icon: MessageSquare, href: '/chat' },
  { group: 'Navigate', label: 'Memory',      icon: Brain,         href: '/memory' },
  { group: 'Navigate', label: 'Files',       icon: FolderOpen,    href: '/files' },
  { group: 'Navigate', label: 'Automations', icon: Zap,           href: '/automations' },
  { group: 'Navigate', label: 'Spaces',      icon: Layers,        href: '/spaces' },
  { group: 'Navigate', label: 'Plugins',     icon: Puzzle,        href: '/plugins' },
  { group: 'Navigate', label: 'Settings',    icon: Settings,      href: '/settings' },
  { group: 'Actions',  label: 'Start a new chat',           icon: Sparkles, href: '/chat' },
  { group: 'Actions',  label: 'Create a memory',            icon: Brain,    href: '/memory' },
  { group: 'Actions',  label: 'Run morning briefing',       icon: Zap,      href: '/automations' },
  { group: 'Actions',  label: 'Search files semantically',  icon: FolderOpen,href: '/files' },
]

export default function CommandPalette({ open, onOpenChange }) {
  const router = useRouter()

  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  if (!open) return null

  const go = (href) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={() => onOpenChange(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-[hsl(0_0%_5%)] shadow-2xl shadow-black/60 ring-1 ring-white/[0.03]"
      >
        <Command label="Command Menu" className="[&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-border/60">
          <div className="flex items-center gap-3 px-4" cmdk-input-wrapper="">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Command.Input
              autoFocus
              placeholder="Search or ask Thien anything…"
              className="h-12 flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-sm"
            />
            <kbd className="text-[10px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 font-mono">ESC</kbd>
          </div>

          <Command.List className="max-h-[420px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
            {['Navigate', 'Actions'].map((group) => (
              <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/70">
                {items.filter((i) => i.group === group).map((item) => {
                  const Icon = item.icon
                  return (
                    <Command.Item
                      key={item.label}
                      value={item.label}
                      onSelect={() => go(item.href)}
                      className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground cursor-pointer aria-selected:bg-white/5"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span>{item.label}</span>
                      <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 aria-selected:opacity-100" />
                    </Command.Item>
                  )
                })}
              </Command.Group>
            ))}
          </Command.List>

          <div className="flex items-center justify-between border-t border-border/60 px-3 py-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-border/60">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-border/60">↵</kbd> Select</span>
            </div>
            <span>Powered by Thien</span>
          </div>
        </Command>
      </div>
    </div>
  )
}

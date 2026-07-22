'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { nav } from './mock-data'
import { Sparkles, ChevronsUpDown, CircleDot } from 'lucide-react'

const Logo = () => (
  <div className="flex items-center gap-2 px-3 py-4">
    <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
      <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
      <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-semibold tracking-tight text-foreground">Thien</span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">AI OS</span>
    </div>
  </div>
)

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-[240px] shrink-0 flex-col border-r border-border/60 bg-[hsl(0_0%_2%)]">
      <Logo />

      <div className="px-3 pb-2">
        <div className="h-px w-full bg-border/60" />
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {nav.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link key={item.key} href={item.href} className="relative block">
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-white/5 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-r-full bg-blue-500"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`h-4 w-4 ${active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} strokeWidth={1.75} />
                <span className="font-medium">{item.label}</span>
                {item.key === 'chat' && (
                  <span className="ml-auto rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">12</span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto p-3 space-y-3">
        {/* Storage */}
        <div className="rounded-lg border border-border/60 bg-card/40 p-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Storage</span>
            <span className="text-foreground/80 font-medium">6.2 / 20 GB</span>
          </div>
          <div className="mt-2 h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '31%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
            />
          </div>
        </div>

        {/* Model status */}
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card/40 px-3 py-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium text-foreground">Thien 1 Pro</span>
          </div>
          <CircleDot className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        {/* Profile */}
        <button className="w-full flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-2.5 py-2 hover:bg-white/[0.04] transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 ring-1 ring-white/10 flex items-center justify-center text-xs font-semibold text-white">TH</div>
          <div className="flex-1 text-left leading-tight">
            <div className="text-sm font-medium text-foreground">Thien Nguyen</div>
            <div className="text-[11px] text-muted-foreground">thien@thien.ai</div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  )
}

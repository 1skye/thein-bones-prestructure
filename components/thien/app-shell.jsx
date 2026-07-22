'use client'

import { useState } from 'react'
import Sidebar from './sidebar'
import TopBar from './topbar'
import CommandPalette from './command-palette'
import FloatingAssistant from './floating-assistant'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const titles = {
  '/': 'Home',
  '/chat': 'Chat',
  '/memory': 'Memory',
  '/files': 'Files',
  '/automations': 'Automations',
  '/spaces': 'Spaces',
  '/plugins': 'Plugins',
  '/settings': 'Settings',
}

export default function AppShell({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const pathname = usePathname() || '/'
  const title = titles[pathname] || (Object.keys(titles).find((k) => pathname.startsWith(k) && k !== '/') ? titles[Object.keys(titles).find((k) => pathname.startsWith(k) && k !== '/')] : 'Thien')

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onOpenPalette={() => setPaletteOpen(true)} title={title} />
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <FloatingAssistant />
    </div>
  )
}

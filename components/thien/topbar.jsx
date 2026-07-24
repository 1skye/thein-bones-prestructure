'use client'

import { Search, Command, Bell, PanelLeft, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function TopBar({ onOpenPalette, title }) {
  return (
    <div className="sticky top-0 z-30 h-14 border-b border-border/60 glass">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">
        <button className="md:hidden h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground">
          <PanelLeft className="h-4 w-4" />
        </button>

        {title && (
          <div className="hidden md:block text-sm text-muted-foreground/80">
            <span className="text-foreground font-medium">{title}</span>
          </div>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8 gap-1.5 bg-white text-black hover:bg-white/90 font-medium">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

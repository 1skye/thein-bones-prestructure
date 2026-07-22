import {
  MessageSquare, Sparkles, Brain, FolderOpen, Zap, Layers, Puzzle, Settings,
  Home, User, Briefcase, Code2, GraduationCap, Gamepad2, Github, Slack,
  FileText, Music, Chrome, HardDrive, StickyNote, Search, Command
} from 'lucide-react'

export const nav = [
  { key: 'home',        label: 'Home',        icon: Home,        href: '/' },
  { key: 'chat',        label: 'Chat',        icon: MessageSquare, href: '/chat' },
  { key: 'memory',      label: 'Memory',      icon: Brain,       href: '/memory' },
  { key: 'files',       label: 'Files',       icon: FolderOpen,  href: '/files' },
  { key: 'automations', label: 'Automations', icon: Zap,         href: '/automations' },
  { key: 'spaces',      label: 'Spaces',      icon: Layers,      href: '/spaces' },
  { key: 'plugins',     label: 'Plugins',     icon: Puzzle,      href: '/plugins' },
  { key: 'settings',    label: 'Settings',    icon: Settings,    href: '/settings' },
]

export const conversations = [
  { id: 'c1', title: 'Series A pitch deck outline',    preview: 'Let\'s refine slide 3 with stronger metrics…', time: '2m',  unread: true,  pinned: true  },
  { id: 'c2', title: 'Q3 hiring roadmap',              preview: 'Draft the JD for a staff design engineer…',   time: '1h',  unread: false, pinned: true  },
  { id: 'c3', title: 'Rust ownership deep dive',       preview: 'Explain lifetime elision with examples…',      time: '3h',  unread: false, pinned: false },
  { id: 'c4', title: 'Trip to Kyoto — 6 day itinerary',preview: 'Add a ryokan night with kaiseki dinner…',       time: 'Yesterday', unread: false, pinned: false },
  { id: 'c5', title: 'Investor follow-up email',       preview: 'Softer tone, mention new ARR milestone…',      time: 'Yesterday', unread: false, pinned: false },
  { id: 'c6', title: 'Weekend meal prep',              preview: 'High protein, 5 lunches, budget $80…',         time: 'Mon',       unread: false, pinned: false },
  { id: 'c7', title: 'ML paper: Mixture of Depths',    preview: 'Summarize the core routing idea…',              time: 'Sun',       unread: false, pinned: false },
  { id: 'c8', title: 'Landing page copy pass',         preview: 'Sharper hero — under 12 words…',                time: 'Sat',       unread: false, pinned: false },
]

export const sampleMessages = [
  { role: 'assistant', content: 'Good morning, Thien. I pulled the latest pitch draft. Slide 3 still uses last quarter\'s ARR — want me to update it to the June number?' },
  { role: 'user',      content: 'Yes, use the June ARR of $2.4M and add MoM growth.' },
  { role: 'assistant', content: 'Done. Slide 3 now reads:\n\n> **ARR: $2.4M** — up **28% MoM**, with net revenue retention at **131%**.\n\nI also flagged slide 5 — the competitor grid feels crowded. Want me to redesign it?' },
  { role: 'user',      content: 'Yes please. And keep the tone concise, more Linear-like.' },
  { role: 'assistant', content: 'On it. Drafting a cleaner 4-column layout with only the metrics that matter.', code: `interface Slide {
  title: string
  points: string[]
  metrics: Record<string, number>
}

function refine(slide: Slide): Slide {
  return {
    ...slide,
    points: slide.points.slice(0, 3),
  }
}` },
]

export const suggestedPrompts = [
  { icon: Sparkles, title: 'Summarize my day',       desc: '12 emails, 3 meetings, and 4 open threads' },
  { icon: Brain,    title: 'What did I promise Alex?',desc: 'Search memory across chats and files' },
  { icon: Zap,      title: 'Run morning briefing',   desc: 'Weather, calendar, priority inbox' },
  { icon: FileText, title: 'Draft investor update',  desc: 'Based on last week\'s metrics' },
]

export const memories = [
  { id: 'm1', category: 'People',    title: 'Alex prefers async written updates',        detail: 'Weekly Loom over meeting. Response time under 24h.', importance: 5, pinned: true,  time: 'Updated 2d ago' },
  { id: 'm2', category: 'Projects',  title: 'Thien launch — target Sept 12',              detail: 'Beta waitlist first, gated onboarding, invite-only.', importance: 5, pinned: true,  time: 'Updated today'  },
  { id: 'm3', category: 'Goals',     title: 'Ship v1 with < 5 core primitives',           detail: 'Chat, Memory, Files, Automations, Spaces. No feature creep.', importance: 4, pinned: true,  time: '1w ago' },
  { id: 'm4', category: 'Interests', title: 'Loves Japanese design & typography',         detail: 'Kenya Hara, MUJI, Naoto Fukasawa references come up often.', importance: 3, pinned: false, time: '3w ago' },
  { id: 'm5', category: 'People',    title: 'Mom\'s birthday — Nov 3',                    detail: 'Prefers experiences over gifts. Kyoto trip idea saved.', importance: 4, pinned: false, time: '2w ago' },
  { id: 'm6', category: 'Projects',  title: 'Blog needs weekly cadence',                  detail: 'Long-form essays > threads. 1500-2500 words.', importance: 2, pinned: false, time: '1w ago' },
  { id: 'm7', category: 'Goals',     title: 'Sub-3 hour marathon by spring',              detail: 'Current PR 3:14. Long run every Sunday.', importance: 3, pinned: false, time: '4d ago' },
  { id: 'm8', category: 'Interests', title: 'Reading — Ted Chiang, Borges, Calvino',      detail: 'Preference for short, philosophical, tightly written fiction.', importance: 2, pinned: false, time: '1m ago' },
  { id: 'm9', category: 'People',    title: 'Priya is designing the memory UI',           detail: 'Owns the graph visualization. Timeline in review.', importance: 4, pinned: false, time: '3d ago' },
]

export const timelineEvents = [
  { time: 'Today',       title: 'Refined pitch deck with June ARR numbers',           tag: 'Startup'  },
  { time: 'Today',       title: 'Committed sub-3 marathon goal',                       tag: 'Goals'    },
  { time: 'Yesterday',   title: 'Booked Kyoto ryokan for November trip',               tag: 'Travel'   },
  { time: '3 days ago',  title: 'Priya joined the design memory project',              tag: 'People'   },
  { time: 'Last week',   title: 'Set launch target — September 12',                    tag: 'Projects' },
  { time: '2 weeks ago', title: 'Discovered MUJI notebook system',                     tag: 'Interests'},
]

export const files = [
  { id: 'f1', name: 'Series A — Pitch v7.pdf',            type: 'pdf',   size: '4.2 MB', updated: '2m ago',  tag: 'Startup' },
  { id: 'f2', name: 'Hiring roadmap Q3.md',                type: 'md',    size: '18 KB',  updated: '1h ago',  tag: 'People'  },
  { id: 'f3', name: 'Kyoto itinerary.pages',               type: 'doc',   size: '210 KB', updated: '1d ago',  tag: 'Travel'  },
  { id: 'f4', name: 'Memory-graph-mock.fig',                type: 'fig',   size: '3.1 MB', updated: '2d ago',  tag: 'Design'  },
  { id: 'f5', name: 'Landing-hero.png',                     type: 'image', size: '1.6 MB', updated: '2d ago',  tag: 'Design'  },
  { id: 'f6', name: 'Onboarding walkthrough.mp4',           type: 'video', size: '68 MB',  updated: '5d ago',  tag: 'Product' },
  { id: 'f7', name: 'Investor list — cleaned.csv',          type: 'sheet', size: '92 KB',  updated: '1w ago',  tag: 'Startup' },
  { id: 'f8', name: 'thien-brand-system.pdf',               type: 'pdf',   size: '9.4 MB', updated: '1w ago',  tag: 'Brand'   },
  { id: 'f9', name: 'Product principles.md',                type: 'md',    size: '12 KB',  updated: '2w ago',  tag: 'Product' },
  { id: 'f10',name: 'Rust-lifetimes-notes.md',              type: 'md',    size: '24 KB',  updated: '3w ago',  tag: 'Learn'   },
]

export const automations = [
  { id: 'a1', name: 'Morning briefing',       desc: 'At 7:00 AM: weather, top 3 emails, calendar, and priority tasks.',        runs: 128, status: 'active',   lastRun: '2h ago',  duration: '1.2s' },
  { id: 'a2', name: 'Weekly investor update', desc: 'Every Friday 5 PM: pull metrics, draft summary, queue for approval.',       runs: 22,  status: 'active',   lastRun: 'Fri 5PM', duration: '4.4s' },
  { id: 'a3', name: 'Meeting notes → CRM',    desc: 'After every Zoom, extract action items and sync to HubSpot.',              runs: 87,  status: 'active',   lastRun: '1h ago',  duration: '2.1s' },
  { id: 'a4', name: 'Inbox triage',           desc: 'Every hour: label, snooze, and draft replies for priority senders.',         runs: 412, status: 'active',   lastRun: '18m ago', duration: '0.8s' },
  { id: 'a5', name: 'Doc summarizer',         desc: 'When a PDF > 5 pages is added, generate a 200-word summary in Memory.',    runs: 34,  status: 'paused',   lastRun: '3d ago',  duration: '3.6s' },
  { id: 'a6', name: 'Deep-work protector',    desc: 'On calendar block "Focus": silence Slack, mute mobile, log to journal.',   runs: 55,  status: 'active',   lastRun: 'Today',   duration: '0.4s' },
]

export const spaces = [
  { id: 's1', name: 'Personal',  emoji: '\u{1F3E1}', icon: User,          desc: 'Personal life, family, health, journaling.',          activity: 'Journal entry added — 2h ago', tint: 'from-blue-500/20 to-blue-500/0' },
  { id: 's2', name: 'Startup',   emoji: '\u{1F680}', icon: Briefcase,     desc: 'Company operations, fundraising, hiring, GTM.',       activity: 'Pitch deck v7 — 2m ago',        tint: 'from-emerald-500/20 to-emerald-500/0' },
  { id: 's3', name: 'Coding',    emoji: '\u{1F4BB}', icon: Code2,         desc: 'Repos, snippets, code reviews, learning notes.',      activity: 'Rust deep-dive — 3h ago',       tint: 'from-violet-500/20 to-violet-500/0' },
  { id: 's4', name: 'College',   emoji: '\u{1F393}', icon: GraduationCap, desc: 'Courses, assignments, research, study notes.',        activity: 'ML paper summary — Yesterday',  tint: 'from-amber-500/20 to-amber-500/0' },
  { id: 's5', name: 'Gaming',    emoji: '\u{1F3AE}', icon: Gamepad2,      desc: 'Squad chats, backlog, guides, patch notes.',          activity: 'BG3 build saved — 2d ago',      tint: 'from-rose-500/20 to-rose-500/0' },
]

export const plugins = [
  { id: 'p1', name: 'GitHub',       desc: 'Read repos, issues, PRs. Draft commits & reviews.',        version: '1.4.2', icon: Github,     installed: true  },
  { id: 'p2', name: 'VS Code',      desc: 'Two-way bridge to your editor. Refactor & search.',        version: '0.9.1', icon: Code2,      installed: true  },
  { id: 'p3', name: 'Discord',      desc: 'Summarize channels. Draft replies. Track threads.',        version: '1.0.8', icon: MessageSquare, installed: false },
  { id: 'p4', name: 'Google Drive', desc: 'Semantic search across your Drive. Summarize docs.',       version: '2.3.0', icon: HardDrive,  installed: true  },
  { id: 'p5', name: 'Notion',       desc: 'Push memories to Notion. Sync pages back to Thien.',       version: '1.7.5', icon: StickyNote, installed: false },
  { id: 'p6', name: 'Slack',        desc: 'Triage DMs & mentions. Turn threads into tasks.',          version: '2.0.1', icon: Slack,      installed: true  },
  { id: 'p7', name: 'Chrome',       desc: 'Save pages to memory. Context-aware answers on any tab.',  version: '3.1.0', icon: Chrome,     installed: false },
  { id: 'p8', name: 'Spotify',      desc: 'Now-playing context. Playlist commands from chat.',        version: '0.6.2', icon: Music,      installed: false },
]

export const models = [
  { id: 'thien-1',       name: 'Thien 1',       desc: 'Balanced — fastest for daily use',    context: '128k' },
  { id: 'thien-1-pro',   name: 'Thien 1 Pro',   desc: 'Deeper reasoning, longer context',    context: '1M'   },
  { id: 'thien-1-mini',  name: 'Thien 1 mini',  desc: 'Ultra-fast, on-device',               context: '32k'  },
  { id: 'thien-vision',  name: 'Thien Vision',  desc: 'Multimodal — images, PDFs, video',    context: '256k' },
]

export const categoryColors = {
  People:    'bg-blue-500/10 text-blue-300 ring-blue-500/20',
  Projects:  'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20',
  Goals:     'bg-violet-500/10 text-violet-300 ring-violet-500/20',
  Interests: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
  Travel:    'bg-rose-500/10 text-rose-300 ring-rose-500/20',
  Design:    'bg-cyan-500/10 text-cyan-300 ring-cyan-500/20',
  Startup:   'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20',
  Product:   'bg-blue-500/10 text-blue-300 ring-blue-500/20',
  Brand:     'bg-fuchsia-500/10 text-fuchsia-300 ring-fuchsia-500/20',
  Learn:     'bg-amber-500/10 text-amber-300 ring-amber-500/20',
}

import './globals.css'
import { Providers } from './providers'
import AppShell from '@/components/thien/app-shell'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Thien — Your AI Operating System',
  description: 'Thien is the world\'s most intelligent personal AI — it remembers, understands, and acts.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <Providers>
          <AppShell>{children}</AppShell>
          <Toaster position="bottom-right" theme="dark" richColors />
        </Providers>
      </body>
    </html>
  )
}

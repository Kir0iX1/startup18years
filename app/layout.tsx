import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/**
 * Applies the saved theme before first paint so there is no flash.
 * Falls back to the OS preference when nothing is saved yet.
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem('start18-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'night':'cream'}if(t==='night'){document.documentElement.setAttribute('data-theme','night')}}catch(e){}})()`

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'СТАРТ18 — Архитектура твоего первого дохода',
  description:
    'Платформа для молодёжи 18+: актуальные профессии 2026 года, дорожная карта заработка от первого фриланса до собственного дела, калькулятор потенциального дохода.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F0EDE4' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1B1F' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`bg-background ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

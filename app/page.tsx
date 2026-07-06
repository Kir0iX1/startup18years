import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { Professions } from '@/components/professions'
import { Roadmap } from '@/components/roadmap'
import { Calculator } from '@/components/calculator'
import { Principles } from '@/components/principles'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
        <Professions />
        <Roadmap />
        <Calculator />
        <Principles />
      </main>
      <SiteFooter />
    </>
  )
}

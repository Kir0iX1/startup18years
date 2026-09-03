import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { Professions } from '@/components/professions'
import { Roadmap } from '@/components/roadmap'
import { Scenarios } from '@/components/scenarios'
import { Calculator } from '@/components/calculator'
import { GoalSimulator } from '@/components/goal-simulator'
import { Principles } from '@/components/principles'
import { Quiz } from '@/components/quiz'
import { Faq } from '@/components/faq'
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
        <Scenarios />
        <Calculator />
        <GoalSimulator />
        <Quiz />
        <Principles />
        <Faq />
      </main>
      <SiteFooter />
    </>
  )
}

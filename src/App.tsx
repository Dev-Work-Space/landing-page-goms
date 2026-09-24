import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Comparison } from './sections/Comparison'
import { Productivity } from './sections/Productivity'
import { Work } from './sections/Work'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Comparison />
        <Productivity />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

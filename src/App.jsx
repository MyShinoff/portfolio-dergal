import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero épinglé + section qui passe par-dessus */}
        <div className="relative">
          <Hero />
          <About />
        </div>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

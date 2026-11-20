import ParticleBg from './components/ParticleBg'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Model from './components/Model'
import Analyzer from './components/Analyzer'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <ParticleBg />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <HowItWorks />
          <Features />
          <Analyzer />
          <Model />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App

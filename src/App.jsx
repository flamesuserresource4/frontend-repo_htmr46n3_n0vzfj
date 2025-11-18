import { useState } from 'react'
import Header from './components/Header'
import HeroMarquee from './components/HeroMarquee'
import MenuShowcase from './components/MenuShowcase'
import About from './components/About'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

function App() {
  const [showMap, setShowMap] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header onOpenMap={() => setShowMap(true)} />
      <HeroMarquee />
      <MenuShowcase />
      <About />
      <OrderForm />
      <Footer />

      {showMap && (
        <div className="fixed inset-0 bg-black/70 z-[60] grid place-items-center p-4" onClick={()=>setShowMap(false)}>
          <div className="bg-slate-900 rounded-xl border border-white/10 w-full max-w-3xl overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="font-semibold">Our Location</div>
              <button onClick={()=>setShowMap(false)} className="text-white/70 hover:text-white">Close</button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=Kampala%20Uganda&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useEffect, useRef } from 'react'

const products = [
  { name: 'Arabica Green Beans', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop' },
  { name: 'Wuga Arabica Beans', img: 'https://images.unsplash.com/photo-1507133750040-4a8f57021557?q=80&w=800&auto=format&fit=crop' },
  { name: 'Robusta Green Beans', img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop' },
  { name: 'NUCAFE Products', img: 'https://images.unsplash.com/photo-1473929731525-3f02f15f5e55?q=80&w=800&auto=format&fit=crop' },
  { name: 'Omukaga Coffee', img: 'https://images.unsplash.com/photo-1502452213786-a5bc0a67e963?q=80&w=800&auto=format&fit=crop' },
]

export default function HeroMarquee() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = null
    let x = 0
    let raf
    const speed = 30 // px per second

    const loop = (ts) => {
      if (!start) start = ts
      const dt = (ts - start) / 1000
      start = ts
      x -= speed * dt
      if (Math.abs(x) >= el.scrollWidth / 2) x = 0
      el.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="h-[320px] bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
        <div className="h-full w-full bg-slate-900/60 backdrop-blur-sm grid place-items-center">
          <div className="max-w-7xl w-full px-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow">High quality Ugandan coffee</h1>
            <p className="text-white/80 mt-2">Kakineha Coffee Beverages — "Good coffee, satisfaction guaranteed"</p>
          </div>
        </div>
      </div>
      <div className="relative bg-slate-900 border-t border-white/10">
        <div className="overflow-hidden py-6">
          <div className="flex gap-6 will-change-transform" ref={ref} style={{ transform: 'translateX(0)' }}>
            {[...products, ...products].map((p, i) => (
              <div key={i} className="min-w-[280px] h-40 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shadow">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

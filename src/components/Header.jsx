import { MapPin, Phone, Menu as MenuIcon, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onOpenMap }) {
  const [open, setOpen] = useState(false)

  const navItem = (href, label) => (
    <a href={href} className="text-slate-100/90 hover:text-white px-3 py-2 rounded-md transition-colors">
      {label}
    </a>
  )

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-3">
            <img src="https://img.icons8.com/?size=80&id=119627&format=png" alt="Kakineha Logo" className="h-9 w-9" />
            <div className="leading-tight">
              <p className="text-white font-semibold -mb-1">Kakineha Coffee Beverages</p>
              <p className="text-xs text-amber-300">Good coffee, satisfaction guaranteed</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItem('#home','Home')}
            {navItem('#menu','Menu')}
            {navItem('#about','About')}
            {navItem('#order','Order Now')}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={onOpenMap} className="flex items-center gap-1 text-slate-100/90 hover:text-white">
              <MapPin className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">Location</span>
            </button>
            <a href="tel:+256700000000" className="flex items-center gap-1 text-slate-100/90 hover:text-white">
              <Phone className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">+256 700 000 000</span>
            </a>
            <a href="#order" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-md shadow">
              <ShoppingCart className="h-5 w-5" />
              <span>Order</span>
            </a>
          </div>

          <button onClick={()=>setOpen(v=>!v)} className="md:hidden text-white p-2">
            <MenuIcon />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3 space-y-2">
            <a onClick={()=>setOpen(false)} href="#home" className="block text-white/90">Home</a>
            <a onClick={()=>setOpen(false)} href="#menu" className="block text-white/90">Menu</a>
            <a onClick={()=>setOpen(false)} href="#about" className="block text-white/90">About</a>
            <a onClick={()=>setOpen(false)} href="#order" className="block text-white/90">Order Now</a>
            <div className="flex items-center gap-4 pt-2">
              <button onClick={() => {onOpenMap(); setOpen(false)}} className="flex items-center gap-1 text-slate-100/90">
                <MapPin className="h-5 w-5 text-emerald-400" /> Location
              </button>
              <a href="tel:+256700000000" className="flex items-center gap-1 text-slate-100/90">
                <Phone className="h-5 w-5 text-emerald-400" /> Call
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

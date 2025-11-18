export default function Footer(){
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6 text-white/80">
        <div>
          <div className="font-semibold text-white">Kakineha Coffee Beverages</div>
          <div className="text-sm">High quality coffee beans. 100% Uganda coffee.</div>
          <div className="text-xs mt-2">© {new Date().getFullYear()} Kakineha Coffee Beverages. All rights reserved.</div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Contact</div>
          <div>Phone: +256 700 000 000</div>
          <div>Email: hello@kakineha.coffee</div>
          <a href="tel:+256700000000" className="underline text-emerald-400">Call now</a>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Location</div>
          <div>Find us on the map from the header</div>
          <div>Kampala, Uganda</div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Partners</div>
          <ul className="space-y-1">
            <li>NUCAFE</li>
            <li>Omukaga Coffee</li>
            <li>Distributors: Kakineha Coffee Beverages</li>
            <li>Sponsors: Local farms & partners</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

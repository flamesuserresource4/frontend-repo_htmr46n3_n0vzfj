export default function MenuShowcase() {
  const items = [
    { title: 'Arabica Green Beans', desc: 'Premium Arabica for export and roasting', tag: 'Kakineha', color: 'from-amber-500 to-amber-700' },
    { title: 'Wuga Arabica Green Beans', desc: 'Washed Wuga Arabica, high altitude', tag: 'Kakineha', color: 'from-emerald-500 to-emerald-700' },
    { title: 'Robusta Green Beans', desc: 'Strong body, great crema', tag: 'Kakineha', color: 'from-orange-500 to-orange-700' },
    { title: 'NUCAFE Coffee', desc: 'Assorted packs from our distributor partner', tag: 'NUCAFE', color: 'from-blue-500 to-blue-700' },
    { title: 'Omukaga Coffee', desc: 'Signature Omukaga selections', tag: 'Omukaga', color: 'from-violet-500 to-violet-700' },
    { title: 'Hot Coffee', desc: 'Freshly brewed cups for in-store clients', tag: 'Beverage', color: 'from-rose-500 to-rose-700' },
    { title: 'Tea', desc: 'Order hot tea with mobile checkout', tag: 'Beverage', color: 'from-teal-500 to-teal-700' },
  ]

  return (
    <section id="menu" className="bg-slate-950 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">What we offer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-gradient-to-br p-1 " style={{backgroundImage:`linear-gradient(to bottom right,rgba(255,255,255,0.08),rgba(255,255,255,0.02))`}}>
              <div className={`rounded-lg p-4 bg-gradient-to-br ${item.color} text-white min-h-[140px]`}>
                <div className="text-xs uppercase tracking-wide opacity-90">{item.tag}</div>
                <div className="text-lg font-semibold">{item.title}</div>
                <p className="text-sm opacity-90 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

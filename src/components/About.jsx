export default function About(){
  return (
    <section id="about" className="bg-slate-900 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">About Kakineha Coffee Beverages</h3>
          <p className="text-white/80 leading-relaxed">
            We distribute high quality coffee beans (Arabica, Robusta) and partner with NUCAFE and Omukaga to bring a full coffee
            experience to our customers. Our own brand includes premium green beans in various types — Arabica, Wuga Arabica, and Robusta —
            available in bulk quantities for roasters, cafes and exporters. We also serve hot coffee for clients visiting our store.
          </p>
          <p className="text-white/80 leading-relaxed mt-3">
            "Good coffee, satisfaction guaranteed"
          </p>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop" alt="Coffee farm" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  )
}

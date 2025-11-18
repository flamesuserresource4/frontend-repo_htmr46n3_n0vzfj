import { useState } from 'react'

export default function OrderForm() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    full_name: '', phone: '', email: '', address: '',
    items: [
      { name: 'Arabica Green Beans', quantity: 1, unit_price: 25000, product_id: 'manual', total: 25000 },
    ],
    payment_method: 'mobile_money',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const subtotal = form.items.reduce((s,i)=>s+Number(i.total||0),0)

  const updateItem = (idx, key, value) => {
    const items = [...form.items]
    items[idx] = { ...items[idx], [key]: value }
    items[idx].total = Number(items[idx].quantity) * Number(items[idx].unit_price)
    setForm({ ...form, items })
  }

  const addItem = () => setForm({ ...form, items: [...form.items, { name: 'Robusta Green Beans', quantity: 1, unit_price: 20000, product_id: 'manual', total: 20000 }] })
  const removeItem = (idx) => setForm({ ...form, items: form.items.filter((_,i)=>i!==idx) })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        customer: { full_name: form.full_name, phone: form.phone, email: form.email, address: form.address },
        items: form.items.map(i=>({ ...i })),
        subtotal,
        payment_method: form.payment_method,
        notes: form.notes,
      }
      const res = await fetch(`${baseUrl}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Order failed')

      // Initiate mock payment
      const pay = await fetch(`${baseUrl}/api/payments/init`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ order_id: data.order_id, method: form.payment_method, amount: subtotal, phone: form.phone }) })
      const p = await pay.json()
      if (!pay.ok) throw new Error(p.detail || 'Payment init failed')
      alert(`Order created. Payment reference: ${p.reference}. Status is pending in demo.`)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="order" className="bg-slate-950 border-t border-white/10 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-white mb-6">Order now</h3>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} placeholder="Full name" className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email (optional)" className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
            <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} placeholder="Address" className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
            <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} placeholder="Notes (e.g., delivery time, quantity in bags)" className="w-full bg-slate-800/60 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/50" />
          </div>

          <div className="space-y-3">
            {form.items.map((it, idx) => (
              <div key={idx} className="p-3 rounded-md bg-slate-800/60 border border-white/10">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <select value={it.name} onChange={e=>updateItem(idx,'name',e.target.value)} className="col-span-5 bg-slate-900/60 text-white px-2 py-2 rounded">
                    <option>Arabica Green Beans</option>
                    <option>Wuga Arabica Green Beans</option>
                    <option>Robusta Green Beans</option>
                    <option>NUCAFE Product</option>
                    <option>Omukaga Coffee</option>
                    <option>Hot Coffee</option>
                    <option>Tea</option>
                  </select>
                  <input type="number" min="0" step="0.1" value={it.quantity} onChange={e=>updateItem(idx,'quantity',e.target.value)} className="col-span-2 bg-slate-900/60 text-white px-2 py-2 rounded" placeholder="Qty" />
                  <input type="number" min="0" value={it.unit_price} onChange={e=>updateItem(idx,'unit_price',e.target.value)} className="col-span-3 bg-slate-900/60 text-white px-2 py-2 rounded" placeholder="Unit price" />
                  <div className="col-span-2 text-right text-white">{(it.total||0).toLocaleString()}</div>
                </div>
                <div className="text-right mt-2">
                  <button type="button" onClick={()=>removeItem(idx)} className="text-rose-400 hover:underline text-sm">Remove</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem} className="text-emerald-400 hover:underline">+ Add item</button>

            <div className="flex items-center gap-3 mt-4">
              <label className="text-white/80">Payment:</label>
              <select value={form.payment_method} onChange={e=>setForm({...form, payment_method:e.target.value})} className="bg-slate-900/60 text-white px-2 py-2 rounded">
                <option value="mobile_money">Mobile Money</option>
                <option value="card">Bank Card</option>
                <option value="cash_on_pickup">Cash on pickup</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-white mt-4">
              <div className="text-white/80">Subtotal</div>
              <div className="text-xl font-semibold">UGX {subtotal.toLocaleString()}</div>
            </div>

            <button disabled={loading} className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md disabled:opacity-60">
              {loading ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

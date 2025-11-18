import { useEffect, useMemo, useState } from 'react'

export default function AdminProducts() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState({})

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/products`)
      const data = await res.json()
      setProducts(data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const updatePrice = async (id, price) => {
    const res = await fetch(`${baseUrl}/api/admin/products/${id}/price`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ price: Number(price) })
    })
    const data = await res.json()
    if (!res.ok) return alert(data.detail || 'Update failed')
    await fetchProducts()
  }

  const bulkBody = useMemo(() => ({ items: Object.entries(selected).filter(([,v])=>v.checked).map(([id,v])=>({ product_id: id, price: Number(v.price) || 0 })) }), [selected])

  const bulkUpdate = async () => {
    if (bulkBody.items.length === 0) return alert('Select at least one product and set a price')
    const res = await fetch(`${baseUrl}/api/admin/products/bulk-price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(bulkBody)
    })
    const data = await res.json()
    if (!res.ok) return alert(data.detail || 'Bulk update failed')
    setSelected({})
    await fetchProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <button onClick={bulkUpdate} className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded">Apply Bulk Prices</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60">
              <tr>
                <th className="p-2">Select</th>
                <th className="p-2">Name</th>
                <th className="p-2">Brand</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-white/10">
                  <td className="p-2">
                    <input type="checkbox" checked={selected[p.id]?.checked||false} onChange={(e)=>setSelected(s=>({...s,[p.id]:{...(s[p.id]||{}),checked:e.target.checked}}))} />
                  </td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.brand}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">UGX {Number(p.price).toLocaleString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="New price" className="bg-slate-800/60 border border-white/10 rounded px-2 py-1 w-32" value={selected[p.id]?.price||''} onChange={e=>setSelected(s=>({...s,[p.id]:{...(s[p.id]||{}),price:e.target.value}}))} />
                      <button onClick={()=>updatePrice(p.id, selected[p.id]?.price)} className="bg-sky-600 hover:bg-sky-700 px-2 py-1 rounded">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

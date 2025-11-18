import { useEffect, useState } from 'react'

export default function AdminOrders() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      if (status) qs.set('status', status)
      const res = await fetch(`${baseUrl}/api/admin/orders?${qs.toString()}`, { headers: { 'Authorization': `Bearer ${token}` } })
      const data = await res.json()
      setOrders(data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchOrders() }, [status])

  const updateOrder = async (id, newStatus, notes) => {
    const res = await fetch(`${baseUrl}/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus, notes })
    })
    const data = await res.json()
    if (!res.ok) return alert(data.detail || 'Update failed')
    await fetchOrders()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <div className="flex items-center gap-2">
          <label>Status</label>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="bg-slate-800/60 border border-white/10 rounded px-2 py-1">
            <option value="">All</option>
            <option>pending</option>
            <option>paid</option>
            <option>failed</option>
            <option>cancelled</option>
            <option>fulfilled</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60">
              <tr>
                <th className="p-2">Customer</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-white/10">
                  <td className="p-2">{o.customer?.full_name}</td>
                  <td className="p-2">{o.customer?.phone}</td>
                  <td className="p-2">UGX {Number(o.subtotal||0).toLocaleString()}</td>
                  <td className="p-2"><span className="px-2 py-1 rounded bg-slate-800/60">{o.status}</span></td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <select defaultValue={o.status} onChange={e=>updateOrder(o.id, e.target.value, o.notes)} className="bg-slate-800/60 border border-white/10 rounded px-2 py-1">
                        <option>pending</option>
                        <option>paid</option>
                        <option>failed</option>
                        <option>cancelled</option>
                        <option>fulfilled</option>
                      </select>
                      <button onClick={()=>updateOrder(o.id, 'paid', o.notes)} className="bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded">Mark Paid</button>
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

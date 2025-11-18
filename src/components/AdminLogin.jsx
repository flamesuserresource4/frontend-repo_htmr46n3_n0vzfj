import { useState } from 'react'

export default function AdminLogin() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = new URLSearchParams()
      body.append('username', email)
      body.append('password', password)
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('token', data.access_token)
      window.location.href = '/admin/products'
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-900 text-white p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-slate-800/60 border border-white/10 rounded-lg p-5 space-y-3">
        <div className="text-lg font-semibold">Admin Login</div>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2" />
        <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded">{loading? 'Signing in...':'Sign in'}</button>
      </form>
    </div>
  )
}

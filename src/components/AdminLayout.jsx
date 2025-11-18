import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

export default function AdminLayout() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }
  return (
    <div className="min-h-screen bg-slate-900 text-white grid grid-cols-12">
      <aside className="col-span-12 md:col-span-2 border-r border-white/10 p-4 space-y-3">
        <div className="font-bold text-lg">Admin</div>
        <nav className="flex flex-col gap-1">
          <NavLink to="/admin/products" className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-slate-800':'hover:bg-slate-800/60'}`}>Products</NavLink>
          <NavLink to="/admin/orders" className={({isActive})=>`px-3 py-2 rounded ${isActive?'bg-slate-800':'hover:bg-slate-800/60'}`}>Orders</NavLink>
        </nav>
        <button onClick={logout} className="text-sm text-white/70 hover:text-white">Logout</button>
      </aside>
      <main className="col-span-12 md:col-span-10 p-6">
        <Outlet />
      </main>
    </div>
  )
}

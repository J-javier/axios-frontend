import { useState } from 'react'
import { BuscarProductos } from './pages/BuscarProductos'
import { Metricas } from './pages/Metricas'
import PaginaProductos from './pages/PaginaProductos'
import { ModalNuevoProducto } from './components/ModalNuevoProducto'



function App() {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Catálogo</p>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Lista de artículos</h1>
          </div>
          <button
            onClick={() => setModalAbierto(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
            </svg>
            <span className="hidden sm:inline">Nuevo producto</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* <PaginaProductos/> */}
        {/* <Metricas/> */}
        <BuscarProductos/>
      </main>

      <ModalNuevoProducto abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </div>
  )
}

export default App

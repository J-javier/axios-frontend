import { api } from '../lib/axios'
import { useEffect, useState } from 'react'
import type { Producto, RespuestaProductos } from '../types/producto';
import { ProductoCard } from '../components/ProductoCard';

function PaginaProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)

    const cargarProductos = () => {
    api.get<RespuestaProductos>('/products')
      .then((res) => {
      console.log(res.data.products[0]);
      setProductos(res.data.products);
    })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  };
    
    useEffect(() => {
        cargarProductos();
    } ,[])
    
    const reintentar = () => {
        setCargando(true)
        setError(false)
        cargarProductos();
    }


    if (cargando)
        return (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-label="Cargando productos">
                {Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white">
                        <div className="aspect-square bg-stone-100" />
                        <div className="space-y-3 p-4">
                            <div className="h-4 w-16 rounded-full bg-stone-100" />
                            <div className="h-4 w-3/4 rounded bg-stone-100" />
                            <div className="h-5 w-1/3 rounded bg-stone-100" />
                        </div>
                    </li>
                ))}
            </ul>
        )

    if (error)
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
                <p className="font-medium text-red-800">No se pudieron cargar los datos</p>
                <button
                    onClick={reintentar}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                    Reintentar
                </button>
            </div>
        )

    return (
        <section className="space-y-6">
            <p className="text-sm text-stone-500">
                <span className="font-semibold text-stone-800">{productos.length}</span> producto(s) mostrado(s)
            </p>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {productos.map(p => (
                    <ProductoCard key={p.id} producto={p} />
                ))}
            </ul>
        </section>
    )
}

export default PaginaProductos

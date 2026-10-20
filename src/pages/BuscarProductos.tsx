import { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import type { Producto, RespuestaProductos } from '../types/producto';
import { ProductoCard } from '../components/ProductoCard';

export function BuscarProductos() {
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        api.get<RespuestaProductos>('/products/search', { params: { q: busqueda } }).then(((res) => setProductos(res.data.products)))
    }, [busqueda])

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400">
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                    </svg>
                    <input
                        value={busqueda}
                        placeholder="Encuentra tu artículo"
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-3.5 text-sm placeholder:text-stone-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15"
                    />
                </div>
                <p className="text-sm text-stone-500">
                    <span className="font-semibold text-stone-800">{productos.length}</span> resultado(s)
                </p>
            </div>

            {productos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                    <p className="font-medium text-stone-700">No encontramos artículos</p>
                    <p className="mt-1 text-sm text-stone-500">Prueba con otra palabra de búsqueda.</p>
                </div>
            ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {productos.map(p => (
                        <ProductoCard key={p.id} producto={p} />
                    ))}
                </ul>
            )}
        </section>
    );
}

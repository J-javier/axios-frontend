import { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import type { Producto } from '../types/producto';

export function BuscarProductos() {
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        api.get('/products/search', { params: { q: busqueda } }).then(((res) => setProductos(res.data.products)))
    }, [busqueda])

    return (
        <div>
            <input
                value={busqueda}
                placeholder="Encuentra tu artículo"
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <ul>
                {productos.map(p => (
                    <li key={p.id}>{p.title} — ${p.price}</li>
                ))}
            </ul>

        </div>
    );
}
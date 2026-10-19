import { api } from '../lib/axios'
import { useEffect, useState } from 'react'
import type { Producto } from '../types/producto';

function PaginaProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)

    const cargarProductos = () => {
    api.get('/products')
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


    if (cargando) return <p> Pagina esta cargando .....</p>

    if (error)
        return (
            <>
                <p>No se pudieron cargar los datos</p>
                <button onClick={reintentar}> Reintentar</button>
            </>
        )

    return (
        <>
            <p>{productos.length} producto(s) mostrado(s)</p>
            <ul>
                {productos.map(p => (
                    <li key={p.id}>{p.title} — ${p.price}</li>
                ))}
            </ul>
        </>
    )
}

export default PaginaProductos

// src/pages/Metricas.tsx
import { useState, useEffect } from 'react';
import { api } from '../lib/axios';
import type { Paginacion } from '../types/producto';

export function Metricas() {
  const [productos, setProductos] = useState<number | null>(null);
  const [usuarios, setUsuarios] = useState<number | null>(null);
  const [carritos, setCarritos] = useState<number | null>(null);

  /* 
    primerio los productos , se termina de resolver su promesa 
    siguen los usuarios 
    carts 
  */

    useEffect(()=>{
        api.get<Paginacion>('/products').then((res) => setProductos(res.data.total)) 
        api.get<Paginacion>('/users').then((res) => setUsuarios(res.data.total))
        api.get<Paginacion>('/carts').then((res) => setCarritos(res.data.total))
    },[])

/* async and await */

  return (
    <div>
        <p>Productos: {productos ?? '...'}</p>
        <p>Usuarios: {usuarios ?? '...'}</p>
        <p>Carritos: {carritos ?? '...'}</p>

    </div>
  );
}
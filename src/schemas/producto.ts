import { z } from 'zod';

export const nuevoProductoSchema = z.object({
    title: z.string().trim().min(3, 'El nombre debe tener al menos 3 caracteres'),
    brand: z.string().trim().min(1, 'Ingresa la marca'),
    category: z.string().min(1, 'Selecciona una categoría'),
    price: z
        .number({ error: 'Ingresa un precio' })
        .positive('El precio debe ser mayor a 0'),
    discountPercentage: z
        .number({ error: 'Ingresa un descuento' })
        .min(0, 'El descuento no puede ser negativo')
        .max(100, 'El descuento no puede superar el 100%'),
    stock: z
        .number({ error: 'Ingresa el stock' })
        .int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo'),
    thumbnail: z.union([z.url('Ingresa una URL válida'), z.literal('')]),
    description: z
        .string()
        .trim()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(500, 'La descripción no puede superar los 500 caracteres'),
});

export type NuevoProducto = z.infer<typeof nuevoProductoSchema>;

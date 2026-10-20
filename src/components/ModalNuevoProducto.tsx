import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../lib/axios';
import { nuevoProductoSchema, type NuevoProducto } from '../schemas/producto';

type Props = {
    abierto: boolean;
    onCerrar: () => void;
};

const valoresIniciales: Partial<NuevoProducto> = {
    title: '',
    brand: '',
    category: '',
    discountPercentage: 0,
    thumbnail: '',
    description: '',
};

const estiloInput =
    'w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 aria-invalid:border-red-400 aria-invalid:focus:ring-red-500/15';

const estiloLabel = 'mb-1.5 block text-sm font-medium text-stone-700';

// "home-decoration" -> "Home decoration"
const formatearCategoria = (categoria: string) => {
    const texto = categoria.replace(/-/g, ' ');
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

type CampoProps = {
    id: keyof NuevoProducto;
    etiqueta: string;
    error?: string;
    opcional?: boolean;
    children: ReactNode;
};

function Campo({ id, etiqueta, error, opcional, children }: CampoProps) {
    return (
        <div>
            <label htmlFor={id} className={estiloLabel}>
                {etiqueta}
                {opcional && <span className="ml-1 font-normal text-stone-400">(opcional)</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export function ModalNuevoProducto({ abierto, onCerrar }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [categories, setCategories] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NuevoProducto>({
        resolver: zodResolver(nuevoProductoSchema),
        defaultValues: valoresIniciales,
    }); 
 
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (abierto && !dialog.open) dialog.showModal();
        if (!abierto && dialog.open) dialog.close();
    }, [abierto]);
 
    const cerrar = () => {
        reset(valoresIniciales);
        onCerrar();
    };

    const submit =  async  (producto: NuevoProducto) => { 

    };
 
    const accesible = (campo: keyof NuevoProducto) => ({
        id: campo,
        'aria-invalid': errors[campo] ? true : undefined,
        'aria-describedby': errors[campo] ? `${campo}-error` : undefined,
    });

    return (
        <dialog
            ref={dialogRef}
            onClose={cerrar}
            onClick={(e) => e.target === e.currentTarget && cerrar()}
            className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-stone-900/50 backdrop:backdrop-blur-sm"
        >
            
            <form noValidate onSubmit={handleSubmit(submit)} className="flex max-h-[inherit] flex-col">
                <header className="flex items-start justify-between gap-4 border-b border-stone-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-stone-900">Nuevo producto</h2>
                        <p className="mt-0.5 text-sm text-stone-500">
                            Completa los datos para agregarlo al catálogo.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={cerrar}
                        aria-label="Cerrar"
                        className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </header>

                <div className="space-y-4 overflow-y-auto px-6 py-5">
                    <Campo id="title" etiqueta="Nombre" error={errors.title?.message}>
                        <input
                            {...accesible('title')}
                            {...register('title')}
                            placeholder="Ej. Essence Mascara Lash Princess"
                            className={estiloInput}
                        />
                    </Campo>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Campo id="brand" etiqueta="Marca" error={errors.brand?.message}>
                            <input
                                {...accesible('brand')}
                                {...register('brand')}
                                placeholder="Ej. Essence"
                                className={estiloInput}
                            />
                        </Campo>

                        <Campo id="category" etiqueta="Categoría" error={errors.category?.message}>
                            <select {...accesible('category')} {...register('category')} className={estiloInput}>
                                <option value="" disabled>Selecciona una</option>
                                {categories.map(c => (
                                    <option key={c} value={c}>{formatearCategoria(c)}</option>
                                ))}
                            </select>
                        </Campo>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Campo id="price" etiqueta="Precio" error={errors.price?.message}>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-stone-400">$</span>
                                <input
                                    {...accesible('price')}
                                    {...register('price', { valueAsNumber: true })}
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className={`${estiloInput} pl-7`}
                                />
                            </div>
                        </Campo>

                        <Campo id="discountPercentage" etiqueta="Descuento" error={errors.discountPercentage?.message}>
                            <div className="relative">
                                <input
                                    {...accesible('discountPercentage')}
                                    {...register('discountPercentage', { valueAsNumber: true })}
                                    type="number"
                                    step="0.01"
                                    placeholder="0"
                                    className={`${estiloInput} pr-8`}
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-stone-400">%</span>
                            </div>
                        </Campo>

                        <Campo id="stock" etiqueta="Stock" error={errors.stock?.message}>
                            <input
                                {...accesible('stock')}
                                {...register('stock', { valueAsNumber: true })}
                                type="number"
                                step="1"
                                placeholder="0"
                                className={estiloInput}
                            />
                        </Campo>
                    </div>

                    <Campo id="thumbnail" etiqueta="URL de la imagen" error={errors.thumbnail?.message} opcional>
                        <input
                            {...accesible('thumbnail')}
                            {...register('thumbnail')}
                            type="url"
                            placeholder="https://..."
                            className={estiloInput}
                        />
                    </Campo>

                    <Campo id="description" etiqueta="Descripción" error={errors.description?.message}>
                        <textarea
                            {...accesible('description')}
                            {...register('description')}
                            rows={3}
                            placeholder="Describe brevemente el producto"
                            className={`${estiloInput} resize-none`}
                        />
                    </Campo>
                </div>

                <footer className="flex flex-col-reverse gap-2 border-t border-stone-100 bg-stone-50/60 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={cerrar}
                        className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30"
                    >
                        Guardar producto
                    </button>
                </footer>
            </form>
        </dialog>
    );
}

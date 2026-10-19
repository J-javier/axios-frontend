import { useEffect, useRef } from 'react';

type Props = {
    abierto: boolean;
    onCerrar: () => void;
};

const categorias = [
    { valor: 'beauty', etiqueta: 'Belleza' },
    { valor: 'fragrances', etiqueta: 'Fragancias' },
    { valor: 'furniture', etiqueta: 'Muebles' },
    { valor: 'groceries', etiqueta: 'Comestibles' },
];

const estiloInput =
    'w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15';

const estiloLabel = 'mb-1.5 block text-sm font-medium text-stone-700';

export function ModalNuevoProducto({ abierto, onCerrar }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Sincroniza el estado de React con el <dialog> nativo (da Escape y foco gratis)
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (abierto && !dialog.open) dialog.showModal();
        if (!abierto && dialog.open) dialog.close();
    }, [abierto]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onCerrar}
            onClick={(e) => e.target === e.currentTarget && onCerrar()}
            className="m-auto w-full max-w-lg rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-stone-900/50 backdrop:backdrop-blur-sm"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onCerrar();
                }}
            >
                <header className="flex items-start justify-between gap-4 border-b border-stone-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-stone-900">Nuevo producto</h2>
                        <p className="mt-0.5 text-sm text-stone-500">
                            Completa los datos para agregarlo al catálogo.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onCerrar}
                        aria-label="Cerrar"
                        className="rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </header>

                <div className="space-y-4 px-6 py-5">
                    <div>
                        <label htmlFor="title" className={estiloLabel}>Nombre</label>
                        <input id="title" name="title" placeholder="Ej. Mascara Essence" className={estiloInput} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="price" className={estiloLabel}>Precio</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-stone-400">$</span>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className={`${estiloInput} pl-7`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className={estiloLabel}>Categoría</label>
                            <select id="category" name="category" defaultValue="" className={estiloInput}>
                                <option value="" disabled>Selecciona una</option>
                                {categorias.map(c => (
                                    <option key={c.valor} value={c.valor}>{c.etiqueta}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className={estiloLabel}>Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            placeholder="Describe brevemente el producto"
                            className={`${estiloInput} resize-none`}
                        />
                    </div>
                </div>

                <footer className="flex flex-col-reverse gap-2 border-t border-stone-100 bg-stone-50/60 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCerrar}
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

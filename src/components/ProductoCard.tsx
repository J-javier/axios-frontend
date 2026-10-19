import type { Producto } from '../types/producto';

export function ProductoCard({ producto }: { producto: Producto }) {
    return (
        <li className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg hover:shadow-stone-200/60">
            <div className="flex aspect-square items-center justify-center bg-stone-100">
                {producto.thumbnail ? (
                    <img
                        src={producto.thumbnail}
                        alt={producto.title}
                        loading="lazy"
                        className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-4xl font-semibold text-stone-300">
                        {producto.title.charAt(0)}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-700">
                    {producto.category}
                </span>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-stone-800">
                    {producto.title}
                </h3>
                <p className="mt-auto text-lg font-bold text-stone-900">
                    ${producto.price}
                </p>
            </div>
        </li>
    );
}

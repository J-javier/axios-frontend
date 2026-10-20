export type Dimensiones = {
  width: number;
  height: number;
  depth: number;
};

export type Resena = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type MetaProducto = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type EstadoDisponibilidad = 'In Stock' | 'Low Stock' | 'Out of Stock';

export type Producto = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string; // algunos productos de la API no traen marca
  sku: string;
  weight: number;
  dimensions: Dimensiones;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: EstadoDisponibilidad;
  reviews: Resena[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaProducto;
  images: string[];
  thumbnail: string;
};

/* Campos de paginación que devuelve dummyjson en cualquier listado */
export type Paginacion = {
  total: number;
  skip: number;
  limit: number;
};

export type RespuestaProductos = Paginacion & {
  products: Producto[];
};

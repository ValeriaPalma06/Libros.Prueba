export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  offerPrice?: number;
  stock: number;
  image: string;
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string; // YYYY-MM-DD
  password: string;
  failedAttempts: number;
  isBlocked: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
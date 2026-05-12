export interface Product {
  id: string;
  brand: string;
  brandKey?: string;
  name: string;
  vol?: string;
  img: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  discount?: string;
  soldOut?: boolean;
  type?: string;
  groups?: string[];
  suitableSkinTypes?: string[];
  unsuitableSkinTypes?: string[];
  skinConcerns?: string[];
}

export interface Article {
  id: number;
  cat: string;
  tag: string;
  title: string;
  date: string;
  img: string;
  images?: string[];
  excerpt: string;
  content?: string;
  authorId?: string;
  skinConcerns?: string[];
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface SkinConcern {
  id: string;
  name: string;
  description?: string;
}

export interface SkinType {
  id: string;
  name: string;
  description?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  city: string;
  ward: string;
  address: string;
  savedAt: number;
}

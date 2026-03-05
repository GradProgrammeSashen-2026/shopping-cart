export interface Product {
  id: number
  title: string
  price: number       
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export interface CartItem extends Product {
  quantity: number
}

export type CartAction =
  | { type: 'ADD_ITEM';    payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'INCREMENT';   payload: { id: number } }
  | { type: 'DECREMENT';   payload: { id: number } }
  | { type: 'CLEAR_CART' }

export interface CartState {
  items: CartItem[]
}

export type SortOption =
  | 'default' | 'price-asc' | 'price-desc'
  | 'name-asc' | 'name-desc'

export type DisplayCount = 10 | 20 | 30

export type CurrencyCode = 'USD' | 'ZAR' | 'EUR' | 'GBP' | 'NGN' | 'KES'

export interface CurrencyInfo {
  code: CurrencyCode
  symbol: string
  label: string
  rate: number  
}
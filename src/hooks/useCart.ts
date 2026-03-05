import { use } from 'react'
import { CartStateContext, CartDispatchContext } from '../context/CartContext'
import type { CartAction } from '../types'

export function useCart() {
  const state = use(CartStateContext)
  if (state === null) {
    throw new Error('useCart must be inside <CartProvider>')
  }
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return { items: state.items, totalItems, totalPrice }
}

export function useCartDispatch(): React.Dispatch<CartAction> {
  const dispatch = use(CartDispatchContext)
  if (dispatch === null) {
    throw new Error('useCartDispatch must be inside <CartProvider>')
  }
  return dispatch
}

export function useCartItem(productId: number) {
  const { items } = useCart()
  return items.find(i => i.id === productId) ?? null
}
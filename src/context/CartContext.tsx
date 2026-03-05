import React, { createContext, useReducer, type ReactNode } from 'react'
import { cartReducer, initialCartState } from './cartReducer'
import type { CartState, CartAction } from '../types'

export const CartStateContext =
  createContext<CartState | null>(null)

export const CartDispatchContext =
  createContext<React.Dispatch<CartAction> | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <CartStateContext value={state}>
      <CartDispatchContext value={dispatch}>
        {children}
      </CartDispatchContext>
    </CartStateContext>
  )
}
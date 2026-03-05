import type { CartState, CartAction, CartItem } from '../types'

export const initialCartState: CartState = {
  items: [],
}

export function cartReducer(state: CartState, action: CartAction): CartState {

  if (action.type === 'ADD_ITEM') {

    const itemAlreadyInCart = state.items.find(
      cartItem => cartItem.id === action.payload.id
    )

    if (itemAlreadyInCart) {
      const updatedItems = state.items.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        } else {
          return cartItem
        }
      })

      return { ...state, items: updatedItems }
    }

    const brandNewItem: CartItem = {
      ...action.payload, 
      quantity: 1,       
    }

    const itemsWithNewProduct = [...state.items, brandNewItem]
    return { ...state, items: itemsWithNewProduct }
  }

  if (action.type === 'REMOVE_ITEM') {

    const itemsWithoutRemoved = state.items.filter(
      cartItem => cartItem.id !== action.payload.id
    )

    return { ...state, items: itemsWithoutRemoved }
  }

  if (action.type === 'INCREMENT') {

    const itemsWithIncrease = state.items.map(cartItem => {
      if (cartItem.id === action.payload.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 }
      } else {
        return cartItem
      }
    })

    return { ...state, items: itemsWithIncrease }
  }

  if (action.type === 'DECREMENT') {

    const itemsWithDecrease = state.items.map(cartItem => {
      if (cartItem.id === action.payload.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 }
      } else {
        return cartItem
      }
    })

    const itemsWithZerosRemoved = itemsWithDecrease.filter(
      cartItem => cartItem.quantity > 0
    )

    return { ...state, items: itemsWithZerosRemoved }
  }

  if (action.type === 'CLEAR_CART') {
    return initialCartState
  }

  return state
}
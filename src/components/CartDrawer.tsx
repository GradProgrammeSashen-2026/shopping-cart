import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter,} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useCart, useCartDispatch } from '../hooks/useCart'
import { useCurrency } from '../context/CurrencyContext'
import { formatPrice } from '../utils/currency'
import type { CartItem } from '../types'

interface Props {
  open: boolean
  onClose: () => void
}

interface CartRowProps {
  item: CartItem
  currency: string
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

function CartRow({ item, currency, onIncrement, onDecrement, onRemove }: CartRowProps) {
  return (
    <li className="flex gap-3 items-start">

      <img
        src={item.image}
        alt={item.title}
        width={56}
        height={56}
        loading="lazy"
        className="w-14 h-14 object-contain rounded-lg bg-muted/30 p-1 shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.title}</p>

        <p className="text-sm text-primary font-semibold">
          {formatPrice(item.price, currency)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={onDecrement}
            aria-label="Decrease quantity"
          >
            −
          </Button>

          <span
            className="text-sm w-5 text-center font-medium"
            aria-live="polite"
          >
            {item.quantity}
          </span>

          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            onClick={onIncrement}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label={`Remove ${item.title}`}
      >
        ✕
      </Button>

    </li>
  )
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, totalItems, totalPrice } = useCart()
  const dispatch = useCartDispatch()
  const { currency } = useCurrency()

  function handleIncrement(id: number) {
    dispatch({ type: 'INCREMENT', payload: { id } })
  }

  function handleDecrement(id: number) {
    dispatch({ type: 'DECREMENT', payload: { id } })
  }

  function handleRemove(id: number) {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  function handleClear() {
    dispatch({ type: 'CLEAR_CART' })
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      onClose()
    }
  }

  const cartIsEmpty = items.length === 0

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[90dvh]">

        <DrawerHeader>
          <DrawerTitle>
            Your Cart
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {totalItems} items
              </span>
            )}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">

          {cartIsEmpty ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-4xl mb-3">🛍️</p>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4 pb-4">
              {items.map(item => (
                <CartRow
                  key={item.id}
                  item={item}
                  currency={currency}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                  onRemove={() => handleRemove(item.id)}
                />
              ))}
            </ul>
          )}

        </div>

        {!cartIsEmpty && (
          <DrawerFooter className="border-t">

            <div className="flex justify-between items-center text-sm mb-3">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(totalPrice, currency)}
              </span>
            </div>

            <Button className="w-full">
              Checkout
            </Button>

            <Button
              variant="ghost"
              className="w-full text-sm"
              onClick={handleClear}
            >
              Clear cart
            </Button>

          </DrawerFooter>
        )}

      </DrawerContent>
    </Drawer>
  )
}
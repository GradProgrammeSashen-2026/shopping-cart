import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select'
import { useCart } from '../hooks/useCart'
import { useCurrency } from '../context/CurrencyContext'
import { CURRENCIES } from '../utils/currency'
import CartDrawer from './CartDrawer'
import type { CurrencyCode } from '../types'

function Brand() {
  return (
    <span className="text-xl font-bold tracking-tight">
      🛒 ShopKart
    </span>
  )
}
interface CurrencySelectorProps {
  currentCurrency: CurrencyCode
  onCurrencyChange: (newCurrency: CurrencyCode) => void
}

function CurrencySelector({ currentCurrency, onCurrencyChange }: CurrencySelectorProps) {
  function handleChange(value: string) {
    onCurrencyChange(value as CurrencyCode)
  }

  return (
    <Select value={currentCurrency} onValueChange={handleChange}>
      <SelectTrigger className="w-28 h-9" aria-label="Select currency">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {Object.values(CURRENCIES).map(currencyOption => (
          <SelectItem key={currencyOption.code} value={currencyOption.code}>
            {currencyOption.symbol} {currencyOption.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface CartButtonProps {
  itemCount: number
  onClick: () => void
}

function CartButton({ itemCount, onClick }: CartButtonProps) {
  const cartIsEmpty = itemCount === 0

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={onClick}
      aria-label={`Cart — ${itemCount} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {!cartIsEmpty && (
        <Badge
          className="absolute -top-2 -right-2 h-5 min-w-5 px-1
                     flex items-center justify-center text-xs"
          aria-live="polite"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  )
}

export default function Navbar() {
  const { totalItems } = useCart()
  const { currency, setCurrency } = useCurrency()

  const [drawerOpen, setDrawerOpen] = useState(false)

  function openDrawer() {
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Brand />
          <div className="flex items-center gap-3">
            <CurrencySelector
              currentCurrency={currency}
              onCurrencyChange={setCurrency}
            />

            <CartButton
              itemCount={totalItems}
              onClick={openDrawer}
            />
          </div>

        </div>
      </header>

      <CartDrawer
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  )
}
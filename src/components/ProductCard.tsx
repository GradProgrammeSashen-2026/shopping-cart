import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge  } from '@/components/ui/badge'
import { useCartDispatch, useCartItem } from '../hooks/useCart'
import { useCurrency } from '../context/CurrencyContext'
import { formatPrice }  from '../utils/currency'
import type { Product } from '../types'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const dispatch  = useCartDispatch()
  const cartItem  = useCartItem(product.id)
  const { currency } = useCurrency()
  const [imgLoaded, setImgLoaded] = useState(false)
  const inCart = cartItem !== null

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative bg-muted/30 aspect-square p-6
                      flex items-center justify-center">
        <Badge variant="secondary"
               className="absolute top-2 left-2 text-xs capitalize">
          {product.category}
        </Badge>
        {!imgLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded-t-xl"
               aria-hidden />
        )}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          width={180}
          height={180}
          onLoad={() => setImgLoaded(true)}
          className={`max-h-40 object-contain transition-opacity
                      ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <h2 className="text-sm font-medium line-clamp-2 leading-snug">
          {product.title}
        </h2>
        <div className="flex items-center gap-1"
             aria-label={`${product.rating.rate} stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden
              className={`text-sm ${
                i < Math.round(product.rating.rate)
                  ? 'text-yellow-400'
                  : 'text-muted-foreground/30'
              }`}>★</span>
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({product.rating.count})
          </span>
        </div>
        <p className="text-base font-semibold text-primary mt-auto">
          {formatPrice(product.price, currency)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {inCart ? (
          <div className="flex items-center gap-2 w-full justify-center">
            <Button size="icon" variant="outline" className="h-8 w-8"
              onClick={() => dispatch({ type: 'DECREMENT',
                payload: { id: product.id } })}
              aria-label="Decrease quantity">−</Button>
            <span className="w-6 text-center text-sm font-semibold"
                  aria-live="polite">{cartItem.quantity}</span>
            <Button size="icon" variant="outline" className="h-8 w-8"
              onClick={() => dispatch({ type: 'INCREMENT',
                payload: { id: product.id } })}
              aria-label="Increase quantity">+</Button>
          </div>
        ) : (
          <Button className="w-full"
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
            aria-label={`Add ${product.title} to cart`}>
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
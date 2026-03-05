import React, { useState, useMemo, use, Suspense } from 'react'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import ProductCard from './ProductCard'
import type { Product, SortOption, DisplayCount } from '../types'

const productsPromise: Promise<Product[]> = fetch('https://fakestoreapi.com/products').then
(res => {
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json() as Promise<Product[]>
})

function Skeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                      lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 space-y-3">
            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </main>
  )
}

function Grid() {
  const products = use(productsPromise)

  const [sort, setSort]                   = useState<SortOption>('default')
  const [displayCount, setDisplayCount]   = useState<DisplayCount>(10)
  const [category, setCategory]           = useState('all')

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))]
    return ['all', ...cats]
  }, [products])

  const visible = useMemo(() => {
    let list = category === 'all'
      ? products
      : products.filter(p => p.category === category)

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'name-asc')   list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'name-desc')  list = [...list].sort((a, b) => b.title.localeCompare(a.title))

    return list.slice(0, displayCount)
  }, [products, sort, displayCount, category])

  return (
    <main id="main-content" className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between
                      bg-card border rounded-xl p-4">
        <div className="flex flex-wrap gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-44" aria-label="Category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => (
                <SelectItem key={c} value={c}>
                  {c === 'all' ? 'All categories' : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={v => setSort(v as SortOption)}>
            <SelectTrigger className="w-44" aria-label="Sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default order</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={String(displayCount)}
            onValueChange={v => setDisplayCount(Number(v) as DisplayCount)}
          >
            <SelectTrigger className="w-28" aria-label="Show count">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="20">Show 20</SelectItem>
              <SelectItem value="30">Show 30</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {visible.length} products
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                      lg:grid-cols-4 gap-5"
           role="list" aria-label="Products">
        {visible.map(product => (
          <div role="listitem" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  )
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { error: string | null }
> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(e: Error) {
    return { error: e.message }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="container mx-auto p-8 text-center">
          <p className="text-destructive mb-4">{this.state.error}</p>
          <button className="underline text-sm" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function ProductGrid() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Skeleton />}>
        <Grid />
      </Suspense>
    </ErrorBoundary>
  )
}
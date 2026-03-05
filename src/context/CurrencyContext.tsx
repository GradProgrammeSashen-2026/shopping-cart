import React, { createContext, useState, use, type ReactNode } from 'react'
import type { CurrencyCode } from '../types'

interface Value {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
}

const CurrencyContext = createContext<Value | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD')
  return (
    <CurrencyContext value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext>
  )
}

export function useCurrency() {
  const ctx = use(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be inside <CurrencyProvider>')
  return ctx
}
import type { CurrencyCode, CurrencyInfo } from '../types'

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$',   label: 'US Dollar',          rate: 1     },
  ZAR: { code: 'ZAR', symbol: 'R',   label: 'South African Rand', rate: 18.5  },
  EUR: { code: 'EUR', symbol: '€',   label: 'Euro',               rate: 0.92  },
  GBP: { code: 'GBP', symbol: '£',   label: 'British Pound',      rate: 0.79  },
  NGN: { code: 'NGN', symbol: '₦',   label: 'Nigerian Naira',     rate: 1580  },
  KES: { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling',    rate: 129   },
}

export function formatPrice(usdPrice: number, currency: CurrencyCode): string {
  const info = CURRENCIES[currency]
  const converted = usdPrice * info.rate
  return info.symbol + converted.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
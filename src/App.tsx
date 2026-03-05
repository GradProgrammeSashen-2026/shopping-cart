import { CurrencyProvider } from './context/CurrencyContext'
import { CartProvider }     from './context/CartContext'
import Navbar               from './components/Navbar'
import ProductGrid          from './components/ProductGrid'

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4
                     focus:left-4 focus:z-50 focus:px-4 focus:py-2
                     focus:bg-primary focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <ProductGrid />
        </div>
      </CartProvider>
    </CurrencyProvider>
  )
}
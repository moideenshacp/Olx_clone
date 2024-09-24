import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProductsProvider } from './context/ProductContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ProductsProvider>
    <App />
    </ProductsProvider>
    </BrowserRouter>
    
  </StrictMode>,
)

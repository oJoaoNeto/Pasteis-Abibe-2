import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './router'
import { DataProvider } from './context/DataContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <AppRouter />
    </DataProvider>
  </StrictMode>,
)

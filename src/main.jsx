import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppMain from './AppMain'

createRoot(document.getElementById('root')).render(
    <AppMain />
)

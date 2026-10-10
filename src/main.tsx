import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { App } from './App'

const root = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <App year={Number(root.dataset.renderYear) || new Date().getFullYear()} />
  </React.StrictMode>
)

if (root.dataset.prerendered === 'true') {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}

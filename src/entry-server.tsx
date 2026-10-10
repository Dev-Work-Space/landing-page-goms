import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'

export function render() {
  const year = new Date().getFullYear()
  const html = renderToString(
    <React.StrictMode>
      <App year={year} />
    </React.StrictMode>,
  )
  return { html, year }
}

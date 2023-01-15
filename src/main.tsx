import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StoreContext, store } from './stores/store'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreContext.Provider value={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </StoreContext.Provider>,
)

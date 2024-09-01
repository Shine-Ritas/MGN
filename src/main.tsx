import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoute from './route/appRoute.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import GeneralError from './pages/errors/general-error.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<GeneralError />}>
      <Provider store={store}>

        <Router>
          <AppRoute />
          

        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

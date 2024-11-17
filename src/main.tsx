import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
import GeneralError from './pages/errors/general-error.tsx'
import AppRoute from './routes/appRoute.tsx';
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <ErrorBoundary 
    fallback={<GeneralError />}>
      <HelmetProvider context={helmetContext}>
        <Router>
          <AppRoute />
        </Router>
        </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { runSecurityAudit } from './utils/securityAudit'
import ErrorBoundary from './components/ErrorBoundary'

// Execute silent security audit for production readiness
const auditResults = runSecurityAudit();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

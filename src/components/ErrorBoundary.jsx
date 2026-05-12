import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical Render Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 mx-auto">
              <ShieldAlert size={32} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">System Interrupted</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              A critical error occurred while rendering the vault interface. 
              This may be due to a network interruption or invalid database state.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl mx-auto hover:bg-slate-200 transition-all"
            >
              <RefreshCw size={16} />
              Reinitialize Vault
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
              {}
              <div className="bg-linear-to-r from-red-600 to-orange-600 p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                  <FaExclamationTriangle className="text-red-600 text-4xl" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Oops! Something went wrong
                </h1>
                <p className="text-red-100">
                  Don't worry, we're on it. Try refreshing the page.
                </p>
              </div>

              {}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    What happened?
                  </h2>
                  <p className="text-gray-600">
                    The application encountered an unexpected error. This has
                    been logged and our team will look into it.
                  </p>
                </div>

                {}
                {import.meta.env.DEV && this.state.error && (
                  <details className="mb-6">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900 mb-2">
                      Error Details (Development Mode)
                    </summary>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
                      <p className="text-sm font-mono text-red-800 mb-2">
                        <strong>Error:</strong> {this.state.error.message}
                      </p>
                      {this.state.errorInfo && (
                        <pre className="text-xs text-red-700 overflow-auto max-h-40">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

                {}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={this.handleReset}
                    className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    <FaRedo />
                    Try Again
                  </button>
                  <button
                    onClick={this.handleGoHome}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    <FaHome />
                    Go to Home
                  </button>
                </div>

                {}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Need help?</strong> If this problem persists, please
                    contact the system administrator with the error details
                    above.
                  </p>
                </div>
              </div>
            </div>

            {}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Error ID:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {Date.now()}
                </code>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

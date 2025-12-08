import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

class InlineErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Inline error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-red-600 text-xl mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Unable to load this section
              </h3>
              <p className="text-sm text-red-700">
                {this.props.fallbackMessage ||
                  "Something went wrong while loading this content. Please try refreshing the page."}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default InlineErrorBoundary;

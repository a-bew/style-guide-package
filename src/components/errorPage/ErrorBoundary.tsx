import React from "react";
import SomethingWentWrong from "./SomethingWentWrong";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  reloadOnReset?: boolean;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null }, () => {
      if (this.props.reloadOnReset) {
        setTimeout(() => window.location.reload(), 0);
      }
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <SomethingWentWrong
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

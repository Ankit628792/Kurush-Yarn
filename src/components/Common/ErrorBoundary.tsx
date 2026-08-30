import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  fallbackTitle?: string;
  fallbackMessage?: string;
  isolateSection?: boolean; // When true, renders an elegant bounded inline card instead of full page
  sectionName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

/**
 * Global & Section-Level ErrorBoundary for Kurush Yarn Atelier.
 * Catches render errors, WebGL scene crashes, or asset failures gracefully.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Structured error logging for diagnostics
    console.error(' [Kurush Atelier ErrorBoundary]: Component rendered with error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      section: this.props.sectionName || 'Global'
    });

    this.setState({ errorInfo });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    });
  };

  public toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render(): ReactNode {
    const { hasError, error, errorInfo, showDetails } = this.state;
    const {
      children,
      fallback,
      fallbackTitle,
      fallbackMessage,
      isolateSection = false,
      sectionName = 'Exhibition Component'
    } = this.props;

    if (!hasError) {
      return children;
    }

    // Custom render prop fallback
    if (typeof fallback === 'function') {
      return fallback(error || new Error('Component failed to render'), this.handleReset);
    }

    // Custom ReactNode fallback
    if (fallback) {
      return fallback;
    }

    // Isolated section fallback (e.g. for 3D Canvas, Hero, or Gallery)
    if (isolateSection) {
      return (
        <div
          className="my-8 mx-auto w-full max-w-4xl p-6 sm:p-8 bg-[#F7F5F2] rounded-2xl border border-[#3D2B1F]/15 shadow-sm text-[#3D2B1F]"
          id={`error-fallback-${sectionName.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#3D2B1F]/5 text-[#3D2B1F] mt-0.5 sm:mt-0 flex-shrink-0">
                <AlertCircle size={20} className="stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <span
                  className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold block"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {sectionName} Notice
                </span>
                <h3
                  className="font-editorial text-lg sm:text-xl text-[#3D2B1F]"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  {fallbackTitle || `Unable to render ${sectionName}`}
                </h3>
                <p className="text-xs text-[#3D2B1F]/70 font-sans max-w-xl leading-relaxed">
                  {fallbackMessage ||
                    'An unexpected visual rendering state occurred. The rest of the exhibition remains fully interactive.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3D2B1F] text-[#FDFCFB] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#3D2B1F]/85 transition-colors"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <RefreshCw size={12} />
                <span>Retry</span>
              </button>
            </div>
          </div>

          {/* Collapsible Error Technical Stack */}
          {error && (
            <div className="mt-4 pt-3 border-t border-[#3D2B1F]/10">
              <button
                onClick={this.toggleDetails}
                className="text-[10px] text-[#3D2B1F]/60 hover:text-[#3D2B1F] inline-flex items-center gap-1 font-mono transition-colors"
              >
                <span>{showDetails ? 'Hide Diagnostics' : 'Show Diagnostics'}</span>
                {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>

              {showDetails && (
                <div className="mt-2 p-3 bg-white rounded-lg border border-[#3D2B1F]/10 font-mono text-[10px] text-[#3D2B1F]/80 overflow-x-auto max-h-40">
                  <p className="font-bold text-red-900 mb-1">{error.toString()}</p>
                  {errorInfo?.componentStack && (
                    <pre className="whitespace-pre-wrap text-[#3D2B1F]/60">{errorInfo.componentStack}</pre>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Full-page Global fallback
    return (
      <div
        className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-center text-[#3D2B1F] selection:bg-[#3D2B1F] selection:text-[#FDFCFB]"
        id="global-error-screen"
      >
        <div className="max-w-md w-full p-8 sm:p-10 bg-white rounded-3xl border border-[#3D2B1F]/15 shadow-xl space-y-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F5F2] border border-[#3D2B1F]/15 flex items-center justify-center text-[#3D2B1F]">
            <Sparkles size={20} className="stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <span
              className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold block"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Kurush Yarn Atelier
            </span>
            <h1
              className="font-editorial text-2xl sm:text-3xl text-[#3D2B1F] tracking-tight"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              {fallbackTitle || 'Exhibition Interrupted'}
            </h1>
            <p className="text-xs text-[#3D2B1F]/70 font-sans leading-relaxed">
              {fallbackMessage ||
                'A visual or script error occurred while rendering the atelier exhibition. Please reload or click retry below.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3D2B1F] text-[#FDFCFB] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#3D2B1F]/85 transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <RefreshCw size={12} />
              <span>Retry Session</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#3D2B1F]/20 text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-semibold hover:border-[#3D2B1F] transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Reload Page
            </button>
          </div>

          {/* Technical Diagnostics */}
          {error && (
            <div className="pt-4 border-t border-[#3D2B1F]/10 text-left">
              <button
                onClick={this.toggleDetails}
                className="text-[10px] text-[#3D2B1F]/60 hover:text-[#3D2B1F] inline-flex items-center gap-1 font-mono transition-colors"
              >
                <span>{showDetails ? 'Hide Diagnostics' : 'Show Error Details'}</span>
                {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>

              {showDetails && (
                <div className="mt-2 p-3 bg-[#F7F5F2] rounded-lg border border-[#3D2B1F]/10 font-mono text-[10px] text-[#3D2B1F]/80 overflow-x-auto max-h-48">
                  <p className="font-bold text-red-900 mb-1">{error.toString()}</p>
                  {error.stack && <pre className="whitespace-pre-wrap text-[#3D2B1F]/60 text-[9px]">{error.stack}</pre>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;

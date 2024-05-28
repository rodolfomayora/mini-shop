import {
  type ReactElement,
  type ReactNode,
  type ErrorInfo,
  Component,
} from 'react';

interface Props {
  children: ReactNode,
  fallback?: ReactElement,
}

interface State {
  hasError: boolean,
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {

    return ({ hasError: true });
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    
    console.log({ error, errorInfo });
  }


  render() {
    const defaultFallback = <div style={{
      width: "100%",
      height: "100svh",
      display: "grid",
      placeContent: "center",
      fontSize: "20px",
      fontWeight: 600
    }}>Oops! something whent wrong</div>;

    if (this.state.hasError) {
      return this.props.fallback ?? defaultFallback;
    }

    return this.props.children;
  }
}
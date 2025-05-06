'use client';

import { Component, ReactNode } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

class LiveblocksErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any) {
    if (typeof window !== 'undefined') {
      if (error?.message?.includes('403') || error?.response?.status === 403) {
        toast.error("You are not authorized to view this page.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // Or render a fallback UI
    }

    return this.props.children;
  }
}

export default LiveblocksErrorBoundary;

import React from 'react';

import { FullPageSpinner } from './FullPageSpinner';

type SuspenseProps = {
  loading: boolean;
  fallback?: React.ReactElement;
  error?: any;
  onErrorMessage: string;
  children: React.ReactNode;
};

export function Suspense({
  loading,
  fallback = <FullPageSpinner />,
  error,
  children,
  onErrorMessage,
}: SuspenseProps) {
  if (loading) return <>{fallback}</>;
  if (error) return <div>{onErrorMessage}</div>;

  return <>{children}</>;
}

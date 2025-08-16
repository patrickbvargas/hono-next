import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, LoadingFallback } from "~/shared/components";

interface SuspenseBoundaryProps extends React.SuspenseProps {
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}
export const SuspenseBoundary = ({
  children,
  fallback = <LoadingFallback />,
  errorFallback = <ErrorFallback />,
}: SuspenseBoundaryProps) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <React.Suspense fallback={fallback}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

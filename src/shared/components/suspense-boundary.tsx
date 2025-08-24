import * as React from "react";
import { ErrorFallback, LoadingFallback } from "./";
import { ErrorBoundary } from "react-error-boundary";

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

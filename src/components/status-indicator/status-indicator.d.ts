export interface StatusIndicatorProps {
  isActivating: boolean;
  isActive: boolean;
  error?: Error;
  setError?: (e?: Error) => void;
}
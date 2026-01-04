import { useState, useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  storageKey: string;
}

interface RateLimitState {
  attempts: number;
  windowStart: number;
}

export function useRateLimit({ maxAttempts, windowMs, storageKey }: RateLimitConfig) {
  const [isLimited, setIsLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const getState = useCallback((): RateLimitState => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parsing errors
    }
    return { attempts: 0, windowStart: Date.now() };
  }, [storageKey]);

  const setState = useCallback((state: RateLimitState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  const checkLimit = useCallback((): boolean => {
    const state = getState();
    const now = Date.now();

    // Reset if window has passed
    if (now - state.windowStart > windowMs) {
      setState({ attempts: 0, windowStart: now });
      setIsLimited(false);
      setRemainingTime(0);
      return false;
    }

    // Check if limited
    if (state.attempts >= maxAttempts) {
      const remaining = Math.ceil((windowMs - (now - state.windowStart)) / 1000);
      setRemainingTime(remaining);
      setIsLimited(true);
      return true;
    }

    setIsLimited(false);
    return false;
  }, [getState, setState, maxAttempts, windowMs]);

  const recordAttempt = useCallback(() => {
    const state = getState();
    const now = Date.now();

    // Reset window if expired
    if (now - state.windowStart > windowMs) {
      setState({ attempts: 1, windowStart: now });
      return;
    }

    // Increment attempts
    const newState = { ...state, attempts: state.attempts + 1 };
    setState(newState);

    if (newState.attempts >= maxAttempts) {
      const remaining = Math.ceil((windowMs - (now - state.windowStart)) / 1000);
      setRemainingTime(remaining);
      setIsLimited(true);
    }
  }, [getState, setState, maxAttempts, windowMs]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore errors
    }
    setIsLimited(false);
    setRemainingTime(0);
  }, [storageKey]);

  return { isLimited, remainingTime, checkLimit, recordAttempt, reset };
}

import axios from 'axios';

const friendlyMessages: Record<string, string> = {
  'Network Error': 'Unable to connect. Please check your internet connection.',
  'timeout of': 'The request timed out. Please try again.',
  'Invalid credentials': 'Incorrect email or password.',
  'Unauthenticated.': 'Your session has expired. Please log in again.',
  'The email has already been taken.': 'An account with this email already exists.',
  'Too Many Attempts.': 'Too many attempts. Please wait a moment and try again.',
};

const DEFAULT_FALLBACK = 'Something went wrong. Please try again.';

export function getErrorMessage(error: unknown, fallback?: string): string {
  const fb = fallback ?? DEFAULT_FALLBACK;

  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    // Backend returns { message: "..." }
    if (data?.message && typeof data.message === 'string') {
      return friendlyMessages[data.message] ?? data.message;
    }

    // Backend returns { error: "..." }
    if (data?.error && typeof data.error === 'string') {
      return friendlyMessages[data.error] ?? data.error;
    }

    // Network / timeout errors
    if (error.message) {
      for (const key of Object.keys(friendlyMessages)) {
        if (error.message.includes(key)) return friendlyMessages[key];
      }
    }

    return fb;
  }

  if (error instanceof Error) {
    return friendlyMessages[error.message] ?? error.message;
  }

  if (typeof error === 'string') {
    return friendlyMessages[error] ?? error;
  }

  return fb;
}

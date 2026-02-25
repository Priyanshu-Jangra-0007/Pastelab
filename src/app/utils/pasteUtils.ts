import { publicAnonKey, serverUrl } from '../config/supabase';

export interface PasteData {
  code: string;
  content: string;
  createdAt: string;
  expiresAt: string;
  views: number;
  syntaxHighlighting?: boolean;
}

async function getApiErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.error === 'string' && data.error.trim()) {
      return data.error;
    }
  } catch {
    // Ignore JSON parse failures and fall back to status text below.
  }

  return `Request failed (${response.status} ${response.statusText})`;
}

function toActionableNetworkError(action: 'create' | 'load', error: unknown): Error {
  if (error instanceof TypeError) {
    return new Error(
      `Unable to ${action} paste because the backend is unreachable. Check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, and deployed function path.`
    );
  }

  return error instanceof Error ? error : new Error(`Unable to ${action} paste.`);
}

// Generate a unique short code (client-side backup)
export function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a new paste
export async function createPaste(
  content: string,
  expiration: string,
  syntaxHighlighting: boolean = false
): Promise<string> {
  try {
    const response = await fetch(`${serverUrl}/paste`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({
        content,
        expiration,
        syntaxHighlighting
      })
    });

    if (!response.ok) {
      const errorMessage = await getApiErrorMessage(response);
      console.error('Failed to create paste:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.code;
  } catch (error) {
    console.error('Error creating paste:', error);
    throw toActionableNetworkError('create', error);
  }
}

// Get a paste by code
export async function getPaste(code: string): Promise<PasteData | null> {
  try {
    const response = await fetch(`${serverUrl}/paste/${code}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const errorMessage = await getApiErrorMessage(response);
      console.error('Failed to get paste:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting paste:', toActionableNetworkError('load', error));
    return null;
  }
}

// Sanitize content to prevent XSS
export function sanitizeContent(content: string): string {
  return content.replace(/[<>]/g, (char) => {
    return char === '<' ? '&lt;' : '&gt;';
  });
}

// Download content as file
export function downloadAsFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Calculate time remaining until expiration
export function getTimeRemaining(expiresAt: string): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diff = expires.getTime() - now.getTime();

  if (diff <= 0) {
    return 'Expired';
  }

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
  }
}

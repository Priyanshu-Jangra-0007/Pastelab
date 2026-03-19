import { supabase } from '../config/supabase';

export interface PasteData {
  code: string;
  content: string;
  createdAt: string;
  expiresAt: string;
  views: number;
  syntaxHighlighting?: boolean;
}

const KV_TABLE = 'kv_store_491033a6';
const MAX_CODE_ATTEMPTS = 30;

function toActionableNetworkError(action: 'create' | 'load', error: unknown): Error {
  if (error instanceof Error && error.name === 'AbortError') {
    return new Error(
      `Unable to ${action} paste because the request was interrupted. Please retry, and if it keeps happening check your deployed Supabase URL and network connection.`
    );
  }

  if (error instanceof TypeError || (error instanceof Error && /network|fetch/i.test(error.message))) {
    return new Error(
      `Unable to ${action} paste because the backend is unreachable. Check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, and deployed function path.`
    );
  }

  return error instanceof Error ? error : new Error(`Unable to ${action} paste.`);
}

function calculateExpiresAt(duration: string): string {
  const now = new Date();

  switch (duration) {
    case '10min':
      now.setMinutes(now.getMinutes() + 10);
      break;
    case '30min':
      now.setMinutes(now.getMinutes() + 30);
      break;
    case '1hour':
      now.setHours(now.getHours() + 1);
      break;
    case '6hours':
      now.setHours(now.getHours() + 6);
      break;
    case '12hours':
      now.setHours(now.getHours() + 12);
      break;
    case '1day':
      now.setDate(now.getDate() + 1);
      break;
    default:
      now.setHours(now.getHours() + 1);
      break;
  }

  return now.toISOString();
}

// Generate a unique short code (client-side backup)
export function generateShortCode(): string {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 2; i++) {
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
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      throw new Error('Content is required');
    }

    const createdAt = new Date().toISOString();
    const expiresAt = calculateExpiresAt(expiration || '1hour');

    for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
      const code = generateShortCode();
      const pasteData: PasteData = {
        code,
        content: trimmedContent,
        createdAt,
        expiresAt,
        views: 0,
        syntaxHighlighting
      };

      const { error } = await supabase.from(KV_TABLE).insert({
        key: code,
        value: pasteData
      });

      if (!error) {
        return code;
      }

      // Unique violation means generated code already exists; retry.
      if (error.code === '23505') {
        continue;
      }

      throw new Error(error.message);
    }

    throw new Error('Unable to allocate a unique 2-digit code. Please retry.');
  } catch (error) {
    console.error('Error creating paste:', error);
    throw toActionableNetworkError('create', error);
  }
}

// Get a paste by code
export async function getPaste(code: string): Promise<PasteData | null> {
  try {
    const { data, error } = await supabase.from(KV_TABLE).select('value').eq('key', code).maybeSingle();

    if (error) {
      console.error('Failed to get paste:', error.message);
      throw new Error(error.message);
    }

    const pasteData = data?.value as PasteData | undefined;
    if (!pasteData) {
      return null;
    }

    const now = new Date();
    const expiresAt = new Date(pasteData.expiresAt);
    if (expiresAt < now) {
      await supabase.from(KV_TABLE).delete().eq('key', code);
      return null;
    }

    const updatedData: PasteData = {
      ...pasteData,
      views: (pasteData.views || 0) + 1
    };

    const { error: updateError } = await supabase.from(KV_TABLE).update({ value: updatedData }).eq('key', code);
    if (updateError) {
      console.error('Failed to update view count:', updateError.message);
    }

    return updatedData;
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

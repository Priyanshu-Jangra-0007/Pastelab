import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Enable CORS and logging
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Generate a unique short code
function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Calculate expiration timestamp
function calculateExpiresAt(duration: string): Date {
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
  }
  
  return now;
}

// Health check endpoint
app.get('/make-server-491033a6/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create a new paste
app.post('/make-server-491033a6/paste', async (c) => {
  try {
    const body = await c.req.json();
    const { content, expiration, syntaxHighlighting = false } = body;

    if (!content) {
      return c.json({ error: 'Content is required' }, 400);
    }

    const code = generateShortCode();
    const now = new Date();
    const expiresAt = calculateExpiresAt(expiration || '1hour');

    const pasteData = {
      code,
      content,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      views: 0,
      syntaxHighlighting
    };

    // Store in KV store
    await kv.set(code, pasteData);

    console.log(`Created paste with code: ${code}`);
    
    return c.json({ code, success: true });
  } catch (error) {
    console.error('Error creating paste:', error);
    return c.json({ error: `Failed to create paste: ${error.message}` }, 500);
  }
});

// Get a paste by code
app.get('/make-server-491033a6/paste/:code', async (c) => {
  try {
    const code = c.req.param('code');

    if (!code) {
      return c.json({ error: 'Code is required' }, 400);
    }

    // Get from KV store
    const pasteData = await kv.get(code);

    if (!pasteData) {
      return c.json({ error: 'Paste not found' }, 404);
    }

    // Check if expired
    const now = new Date();
    const expiresAt = new Date(pasteData.expiresAt);

    if (expiresAt < now) {
      // Clean up expired paste
      await kv.del(code);
      return c.json({ error: 'Paste has expired' }, 404);
    }

    // Increment view count
    const updatedData = {
      ...pasteData,
      views: (pasteData.views || 0) + 1
    };
    await kv.set(code, updatedData);

    console.log(`Retrieved paste with code: ${code}, views: ${updatedData.views}`);

    return c.json(updatedData);
  } catch (error) {
    console.error('Error getting paste:', error);
    return c.json({ error: `Failed to get paste: ${error.message}` }, 500);
  }
});

// Delete expired pastes (cleanup endpoint)
app.delete('/make-server-491033a6/cleanup', async (c) => {
  try {
    const pastes = await kv.getByPrefix('');
    const now = new Date();
    let deletedCount = 0;

    for (const paste of pastes) {
      if (paste && paste.expiresAt) {
        const expiresAt = new Date(paste.expiresAt);
        if (expiresAt < now) {
          await kv.del(paste.code);
          deletedCount++;
        }
      }
    }

    console.log(`Cleaned up ${deletedCount} expired pastes`);
    return c.json({ success: true, deleted: deletedCount });
  } catch (error) {
    console.error('Error cleaning up pastes:', error);
    return c.json({ error: `Failed to cleanup pastes: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);

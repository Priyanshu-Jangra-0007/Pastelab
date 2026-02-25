const FUNCTION_PATH_PREFIX = '/.netlify/functions/supabase-proxy';

function getTargetBaseUrl() {
  return (
    process.env.SUPABASE_FUNCTION_URL ||
    process.env.VITE_SERVER_URL ||
    ''
  ).replace(/\/+$/g, '');
}

function getAnonKey() {
  return (
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim();
}

exports.handler = async (event) => {
  const targetBaseUrl = getTargetBaseUrl();

  if (!targetBaseUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          'Missing SUPABASE_FUNCTION_URL in Netlify environment settings.',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  const suffixPath = event.path.startsWith(FUNCTION_PATH_PREFIX)
    ? event.path.slice(FUNCTION_PATH_PREFIX.length)
    : '';
  const targetUrl = new URL(`${targetBaseUrl}${suffixPath || ''}`);

  if (event.rawQuery) {
    targetUrl.search = event.rawQuery;
  }

  const anonKey = getAnonKey();
  const incomingHeaders = event.headers || {};
  const outgoingHeaders = {};

  if (incomingHeaders['content-type']) {
    outgoingHeaders['content-type'] = incomingHeaders['content-type'];
  }

  if (incomingHeaders.authorization) {
    outgoingHeaders.authorization = incomingHeaders.authorization;
  } else if (anonKey) {
    outgoingHeaders.authorization = `Bearer ${anonKey}`;
  }

  if (incomingHeaders.apikey) {
    outgoingHeaders.apikey = incomingHeaders.apikey;
  } else if (anonKey) {
    outgoingHeaders.apikey = anonKey;
  }

  let body;
  if (!['GET', 'HEAD'].includes(event.httpMethod) && event.body) {
    body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : event.body;
  }

  try {
    const upstreamResponse = await fetch(targetUrl.toString(), {
      method: event.httpMethod,
      headers: outgoingHeaders,
      body,
    });

    return {
      statusCode: upstreamResponse.status,
      body: await upstreamResponse.text(),
      headers: {
        'Content-Type':
          upstreamResponse.headers.get('content-type') || 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: `Proxy request failed: ${error instanceof Error ? error.message : String(error)}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};

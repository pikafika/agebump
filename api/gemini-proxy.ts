export const config = { runtime: 'edge' };

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: { message: 'Server: Gemini API key not configured' } },
      { status: 500 },
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const upstream = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await upstream.json()) as Record<string, unknown>;
    return Response.json(data, { status: upstream.status });
  } catch (err) {
    return Response.json(
      { error: { message: `Proxy error: ${err instanceof Error ? err.message : 'unknown'}` } },
      { status: 502 },
    );
  }
}

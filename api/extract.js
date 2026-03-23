module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, prompt, model, clientApiKey } = req.body;

  // Use the client's API key if provided, otherwise fallback to the environment variable.
  const apiKey = clientApiKey || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: { message: 'Missing API key. Configure it in .env or pass it from the client.' } });
  }

  if (!image || !prompt) {
    return res.status(400).json({ error: { message: 'Image and prompt are required.' } });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://runtrack.app',
        'X-Title': 'RunTrack Virtual Event'
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-4o-mini',
        max_tokens: 600,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: image } },
              { type: 'text', text: prompt }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `OpenRouter API error ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
}

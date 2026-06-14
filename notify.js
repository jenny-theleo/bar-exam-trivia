const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:admin@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = async (req, res) => {
  // Allow the app itself to call this (same-origin requests from the PWA)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { subscription, title, body, url } = req.body || {};

    if (!subscription || !subscription.endpoint) {
      res.status(400).json({ error: 'Missing or invalid subscription' });
      return;
    }

    const payload = JSON.stringify({
      title: title || 'Bar Exam Trivia',
      body: body || "It's your turn!",
      url: url || '/',
    });

    await webpush.sendNotification(subscription, payload);
    res.status(200).json({ success: true });
  } catch (e) {
    // 410 Gone / 404 means the subscription is no longer valid (user
    // uninstalled, cleared data, etc.) — not a server error, just stale data.
    if (e.statusCode === 410 || e.statusCode === 404) {
      res.status(200).json({ success: false, reason: 'subscription_expired' });
      return;
    }
    console.error('Push send error:', e.message);
    res.status(500).json({ error: e.message });
  }
};

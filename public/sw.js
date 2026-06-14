self.addEventListener('fetch', () => {});

// ── PUSH NOTIFICATIONS ────────────────────────────────────────────────────
// Fires when the server sends a push message (opponent finished their turn,
// topic was picked, etc.) — even if the app is closed.
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'Bar Exam Trivia', body: event.data ? event.data.text() : "It's your turn!" };
  }

  const title = data.title || 'Bar Exam Trivia';
  const options = {
    body: data.body || "It's your turn!",
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: data.url || '/' },
    tag: 'bar-trivia-turn',
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping the notification opens (or focuses) the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

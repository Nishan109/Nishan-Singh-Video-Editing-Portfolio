// YouTube can reject individual embeds on numeric loopback origins.
// Keep the actual page and the player on the same named development origin.
export function getLocalPreviewUrl(href) {
  const url = new URL(href);
  if (!['http:', 'https:'].includes(url.protocol)) return null;
  if (!['127.0.0.1', '[::1]'].includes(url.hostname)) return null;
  url.hostname = 'localhost';
  return url.href;
}

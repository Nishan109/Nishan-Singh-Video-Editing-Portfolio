export function getHeroParallax(top, height, { compact = false, reducedMotion = false } = {}) {
  if (reducedMotion || !Number.isFinite(top) || !Number.isFinite(height) || height <= 0) {
    return { offset: 0, range: 0 };
  }
  const range = Math.min(height * (compact ? 0.1 : 0.16), compact ? 80 : 140);
  const offset = Math.min(range, Math.max(0, -top) * (compact ? 0.14 : 0.22));
  return { offset: Math.round(offset * 100) / 100, range: Math.ceil(range) };
}

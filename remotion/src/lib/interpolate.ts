/**
 * Replaces {dot.path} tokens in a template string with values from `props`.
 *
 * Used by:
 * - generate-vo.ts (before sending to ElevenLabs)
 * - <Captions> (before display)
 *
 * Identical input → identical VO + captions, guaranteed in sync.
 *
 * Example:
 *   interpolate("Hi {business.ownerFirstName}", { business: { ownerFirstName: "Marco" } })
 *   → "Hi Marco"
 *
 * Unresolved tokens are left as-is so missing data is visible during QA
 * rather than silently producing empty strings.
 */
export function interpolate(template: string, props: Record<string, unknown>): string {
  return template.replace(/\{([a-zA-Z0-9_.]+)\}/g, (match, path: string) => {
    const value = path.split(".").reduce<unknown>((acc, key) => {
      if (acc === null || acc === undefined) return undefined;
      if (typeof acc !== "object") return undefined;
      return (acc as Record<string, unknown>)[key];
    }, props);

    if (value === undefined || value === null) return match;
    return String(value);
  });
}

/**
 * Splits an interpolated script into caption-sized segments at sentence
 * boundaries. Returns an array of strings preserving punctuation. Used
 * by <Captions> when no captionsOverride is set.
 */
export function splitIntoCaptionLines(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const matches = trimmed.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g);
  if (!matches) return [trimmed];
  return matches.map((s) => s.trim()).filter(Boolean);
}

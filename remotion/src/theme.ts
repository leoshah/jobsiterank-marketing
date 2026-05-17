/**
 * Re-exports the shared design tokens from /lib/design-tokens.ts so
 * Remotion code can import via the short `./theme` path. Keeps imports
 * clean and gives one obvious place to add Remotion-specific
 * derived tokens (e.g., frame counts, easing curves) later.
 */
export { colors, fonts, radii, shadows, tracking, lineHeight } from "../../lib/design-tokens";

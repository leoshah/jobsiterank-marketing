/**
 * Shared design tokens for JobsiteRank.
 *
 * This file is the JavaScript/TypeScript-importable mirror of the CSS
 * `@theme {}` block in [src/styles/global.css]. It exists so the Remotion
 * subproject (which is React/TSX, not Astro) can reference the same color
 * palette, fonts, radii, and shadows as the marketing site without
 * duplicating literals across files.
 *
 * The Astro side continues to consume tokens via CSS custom properties
 * (`var(--color-accent)`, etc.) — that codebase is NOT migrated to import
 * from here. Both files are kept numerically in sync by hand. Changes
 * here MUST be reflected in src/styles/global.css and vice versa.
 */

export const colors = {
  ink: "#0E1B22",
  inkSoft: "#1E2A33",
  paper: "#FFFFFF",
  cream: "#FAFAF7",
  mint: "#ECFDF5",

  accent: "#10B981",
  accentDark: "#047857",
  accentSoft: "#D1FAE5",

  warning: "#F59E0B",
  success: "#10B981",

  slate: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    900: "#0F172A",
  },
} as const;

export const fonts = {
  display: '"Bricolage Grotesque", system-ui, sans-serif',
  sans: '"DM Sans", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(15 23 42 / 0.04)",
  md: "0 4px 12px -2px rgb(15 23 42 / 0.06), 0 2px 4px -2px rgb(15 23 42 / 0.04)",
  lg: "0 12px 32px -8px rgb(15 23 42 / 0.10), 0 4px 8px -4px rgb(15 23 42 / 0.06)",
  xl: "0 24px 48px -12px rgb(15 23 42 / 0.18)",
  emerald: "0 12px 32px -8px rgb(16 185 129 / 0.25)",
} as const;

export const tracking = {
  display: "-0.025em",
} as const;

export const lineHeight = {
  display: 1.05,
  body: 1.5,
  bodyRelaxed: 1.6,
} as const;

import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

const bricolage = loadBricolage("normal", {
  weights: ["500", "600", "700"],
});

const dmSans = loadDMSans("normal", {
  weights: ["400", "500", "600", "700"],
});

export const bricolageFamily = bricolage.fontFamily;
export const dmSansFamily = dmSans.fontFamily;

export const waitForFonts = async () => {
  await Promise.all([bricolage.waitUntilDone(), dmSans.waitUntilDone()]);
};

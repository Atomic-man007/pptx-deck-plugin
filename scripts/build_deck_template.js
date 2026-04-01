/**
 * build_deck_template.js — Generic PptxGenJS starter template
 *
 * Usage:
 *   1. Copy this file: cp build_deck_template.js my_deck.js
 *   2. Replace the BRAND block below with your colors
 *      (run extract_brand.py against a .potx to get the block automatically)
 *   3. Add slides using the patterns in references/slide_patterns.md
 *   4. Run: node my_deck.js
 *
 * Requires: npm install pptxgenjs (run once in /tmp or your project)
 */

const pptxgen = require("pptxgenjs");

// ── BRAND CONFIG ───────────────────────────────────────────────────────────────
// Replace with your brand colors. NEVER use # prefix on hex values.
const BRAND = {
  primary:   "0070C0",   // Main brand color — headers, accents
  secondary: "003087",   // Secondary — subheadings, icons
  dark:      "1A1A1A",   // Near-black — body text, dark bg title slides
  light:     "FFFFFF",   // White — light backgrounds, text on dark
  lightBg:   "F5F5F5",   // Soft off-white — slide backgrounds, cards
  accent:    "FF6B35",   // Pop color — CTAs, highlights, badges
  font:      "Calibri",  // Brand font — falls back to Calibri if not installed
};
// ──────────────────────────────────────────────────────────────────────────────

const FONT = BRAND.font;

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";  // 10" × 5.625"
pres.author  = "Author Name";
pres.title   = "Presentation Title";

// ── HELPERS ───────────────────────────────────────────────────────────────────

/** Standard header bar — add to every content slide */
function addHeader(slide, title, subtitle) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.85,
    fill: { color: BRAND.primary }, line: { color: BRAND.primary }
  });
  slide.addText(title, {
    x: 0.35, y: 0.08, w: 9.3, h: 0.48,
    fontSize: 20, fontFace: FONT, bold: true,
    color: BRAND.light, valign: "middle", margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.35, y: 0.56, w: 9.3, h: 0.22,
      fontSize: 10, fontFace: FONT, color: "DDDDDD",
      valign: "middle", margin: 0
    });
  }
}

/** Footer bar */
function addFooter(slide, label, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.38, w: 10, h: 0.25,
    fill: { color: BRAND.lightBg }, line: { color: "E0E0E0" }
  });
  slide.addText(label || "", {
    x: 0.2, y: 5.39, w: 8.5, h: 0.22,
    fontSize: 8, fontFace: FONT, color: "888888", valign: "middle", margin: 0
  });
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: 9.4, y: 5.39, w: 0.4, h: 0.22,
      fontSize: 8, fontFace: FONT, color: "888888", align: "right", valign: "middle", margin: 0
    });
  }
}

/** Left-accent card */
function addCard(slide, x, y, w, h, title, body, accentColor) {
  const col = accentColor || BRAND.primary;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: BRAND.light }, line: { color: "E0E0E0", width: 0.5 },
    shadow: { type: "outer", color: "000000", blur: 4, offset: 2, angle: 135, opacity: 0.08 }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.07, h,
    fill: { color: col }, line: { color: col }
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.16, y: y + 0.1, w: w - 0.22, h: 0.28,
      fontSize: 11, fontFace: FONT, bold: true, color: BRAND.dark, margin: 0
    });
  }
  if (body) {
    slide.addText(body, {
      x: x + 0.16, y: y + (title ? 0.42 : 0.1), w: w - 0.22, h: h - (title ? 0.55 : 0.2),
      fontSize: 10, fontFace: FONT, color: "555555", wrap: true, margin: 0
    });
  }
}

// ── SLIDES ────────────────────────────────────────────────────────────────────
// Replace these example slides with your actual content.
// See references/slide_patterns.md for copy-paste patterns for each slide type.

// SLIDE 1 — Title
{
  const s = pres.addSlide();
  s.background = { color: BRAND.dark };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.55, h: 5.625,
    fill: { color: BRAND.primary }, line: { color: BRAND.primary }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 0, w: 0.12, h: 5.625,
    fill: { color: BRAND.accent }, line: { color: BRAND.accent }
  });

  s.addText("Your Presentation Title", {
    x: 1.0, y: 1.3, w: 8.5, h: 0.75,
    fontSize: 36, fontFace: FONT, bold: true, color: BRAND.light, margin: 0
  });
  s.addText("Subtitle or tagline", {
    x: 1.0, y: 2.15, w: 8.5, h: 0.4,
    fontSize: 18, fontFace: FONT, color: BRAND.primary, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.0, y: 2.7, w: 3.5, h: 0.05,
    fill: { color: BRAND.accent }, line: { color: BRAND.accent }
  });
  s.addText("Author  |  Team  |  Date", {
    x: 1.0, y: 4.9, w: 8, h: 0.3,
    fontSize: 11, fontFace: FONT, color: "888888", margin: 0
  });
}

// SLIDE 2 — Content (replace with your slides from slide_patterns.md)
{
  const s = pres.addSlide();
  s.background = { color: BRAND.light };
  addHeader(s, "Slide Title", "Optional subtitle");
  addFooter(s, "Presentation Title  |  Date", 2);

  addCard(s, 0.3, 1.1, 4.4, 1.6, "Point One", "Description for point one.", BRAND.primary);
  addCard(s, 5.0, 1.1, 4.4, 1.6, "Point Two", "Description for point two.", BRAND.accent);
  addCard(s, 0.3, 2.9, 4.4, 1.6, "Point Three", "Description for point three.", BRAND.secondary);
  addCard(s, 5.0, 2.9, 4.4, 1.6, "Point Four", "Description for point four.", "2E7D32");
}

// SLIDE 3 — Summary
{
  const s = pres.addSlide();
  s.background = { color: BRAND.primary };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 9.5, y: 0, w: 0.5, h: 5.625,
    fill: { color: BRAND.accent }, line: { color: BRAND.accent }
  });

  s.addText("Thank You", {
    x: 0.5, y: 1.5, w: 8.5, h: 0.9,
    fontSize: 42, fontFace: FONT, bold: true, color: BRAND.light, margin: 0
  });
  s.addText("Key takeaway or closing message goes here.", {
    x: 0.5, y: 2.7, w: 8.5, h: 0.5,
    fontSize: 16, fontFace: FONT, color: "DDDDDD", margin: 0
  });
  s.addText("Author  |  Team  |  Date", {
    x: 0.5, y: 5.0, w: 8.5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: "AAAAAA", margin: 0
  });
}

// ── WRITE OUTPUT ──────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "output.pptx" })
  .then(() => console.log("✓  output.pptx created"))
  .catch(e => console.error("Error:", e));

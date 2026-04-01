---
name: create-deck
description: "Creates a professional PowerPoint presentation (.pptx) from any content. Use when the user asks to make a deck, slides, presentation, or .pptx file. Accepts topic descriptions, markdown notes, bullet points, or structured data. Handles brand setup automatically."
---

# Create Deck Skill

Build a polished `.pptx` file from any content using PptxGenJS.

## Step 1 — Install dependency (once)

```bash
cd /tmp && npm install pptxgenjs
```

## Step 2 — Get brand colors

**Option A — User drops a template file (.potx or .pptx):**
```bash
python3 $SKILL_DIR/../../scripts/extract_brand.py their-template.potx
# Prints a ready-to-paste BRAND config block
```

**Option B — No template (default):**
Ask the user: *"What tone fits this deck — corporate, technical, startup, or minimal?"*

Then pick from `$SKILL_DIR/../../references/brand_config.md`. Never default to generic blue.

## Step 3 — Plan slides

Map the content to slide types. Read `$SKILL_DIR/../../references/slide_patterns.md` for copy-paste code for each type:

| Type | Use when |
|---|---|
| `title` | Always first |
| `two-column` | Problem / solution, before / after |
| `flow` | Process steps, pipeline diagram |
| `cards` | 2×2 or 3×1 key points |
| `metrics` | Big number callouts |
| `timeline` | Phases, roadmap, next steps |
| `summary` | Always last |

## Step 4 — Build

Write a `build_deck.js` file based on `$SKILL_DIR/../../scripts/build_deck_template.js`.

Replace `BRAND` at the top with chosen/extracted colors, then add slides using patterns.

```bash
node build_deck.js
# → writes output.pptx
```

## Step 5 — QA

```bash
python3 $SKILL_DIR/../../scripts/qa_deck.py output.pptx
```

For visual QA:
```bash
soffice --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
# Inspect slide-*.jpg images
```

## Critical rules — never break these

- `"FF0000"` not `"#FF0000"` — hash prefix corrupts the file
- Never reuse `shadow` or `fill` objects — create fresh each call
- `bullet: true` not unicode `•` — avoids double bullets
- `breakLine: true` between array text items
- `margin: 0` when aligning text precisely with shapes
- No underline accent lines under titles — use whitespace or color blocks

## Usage examples

```
/pptx-deck:create-deck  Q1 business review for the engineering team
/pptx-deck:create-deck  10-slide product pitch, startup tone, blue palette
/pptx-deck:create-deck  $ARGUMENTS
```

If `$ARGUMENTS` is provided, treat it as the deck topic/description and proceed directly.

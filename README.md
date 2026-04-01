# pptx-deck — Claude Code Plugin

Create professional PowerPoint presentations (`.pptx`) from code using PptxGenJS.

**Brand-agnostic** — works with any company colors and fonts. Drop a `.potx` template to auto-extract brand colors, or let Claude pick a palette based on your topic.

---

## Install

```bash
claude --plugin-dir ./pptx-deck-plugin
```

Or install from a marketplace once published.

---

## Usage

```
/pptx-deck:create-deck  Q1 engineering review for the leadership team
/pptx-deck:create-deck  10-slide product pitch, startup tone
/pptx-deck:create-deck  status update on our AI project
```

Claude will:
1. Ask about your brand (or auto-detect from a template file you drop)
2. Plan slide types based on your content
3. Generate and run a `build_deck.js` script
4. Output a ready-to-open `.pptx` file
5. Run QA to check all slides have content

---

## What you get

| Slide type | Description |
|---|---|
| Title | Bold opener with vertical accent stripe |
| Two-column | Problem/solution, before/after |
| Flow | Process steps with boxes and arrows |
| Cards (2×2 or 3×1) | Key points with left-accent cards |
| Metrics | Large number callouts (6 stats) |
| Timeline | Phases / roadmap / next steps |
| Summary | Closing slide with done/pending split |

---

## Brand setup

### From a template file
```bash
python3 scripts/extract_brand.py your-template.potx
# Prints a BRAND config block — paste into build_deck.js
```

### Let Claude choose
Describe the tone: *corporate, technical, startup, minimal, warm, bold* — Claude picks from 8 ready palettes in `references/brand_config.md`.

---

## Requirements

```bash
npm install pptxgenjs          # required for deck generation
pip install python-pptx        # optional — for QA script
# soffice + pdftoppm            # optional — for visual QA
```

---

## File structure

```
pptx-deck-plugin/
├── .claude-plugin/
│   └── plugin.json                 ← plugin manifest
├── skills/
│   └── create-deck/
│       └── SKILL.md                ← skill entrypoint
├── scripts/
│   ├── build_deck_template.js      ← starter template (copy + edit)
│   ├── extract_brand.py            ← extract colors from .potx/.pptx
│   └── qa_deck.py                  ← content QA checker
└── references/
    ├── brand_config.md             ← 8 color palettes + selection guide
    ├── slide_patterns.md           ← copy-paste code for every slide type
    └── pptxgenjs_api.md            ← full PptxGenJS API cheatsheet
```

---

## License

MIT

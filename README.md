# pptx-deck — Claude Code Plugin

> **Create polished PowerPoint presentations from plain text — any brand, any topic, in seconds.**

[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-orange?logo=anthropic)](https://code.claude.com)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](#)

A Claude Code plugin that turns your notes, bullet points, or topic descriptions into a professional `.pptx` file — complete with diagrams, cards, metrics slides, and a branded color scheme.

No PowerPoint knowledge needed. No manual slide-building. Just describe what you want.

---

## What it does

```
/pptx-deck:create-deck  Q1 engineering review for the leadership team
```

Claude will:
- Ask about your brand colors (or auto-detect from a `.potx` template you drop)
- Plan the right slide types for your content
- Generate and run the build script
- Output a ready-to-open `.pptx` in under 30 seconds
- Run QA to verify all slides have content

---

## Install

```bash
# Clone the plugin
git clone https://github.com/<your-username>/pptx-deck-plugin

# Install the one dependency
cd /tmp && npm install pptxgenjs

# Run Claude Code with the plugin loaded
claude --plugin-dir ./pptx-deck-plugin
```

---

## Usage

```
/pptx-deck:create-deck  <topic or description>
```

### Examples

```
/pptx-deck:create-deck  10-slide product pitch for Series A investors
/pptx-deck:create-deck  weekly engineering status update, minimal style
/pptx-deck:create-deck  onboarding deck for new team members, warm tone
/pptx-deck:create-deck  AI project overview for management, corporate blue
```

---

## Slide types included

| Slide | Description |
|---|---|
| **Title** | Bold opener with vertical accent stripe |
| **Two-column** | Problem/solution, before/after, pros/cons |
| **Flow diagram** | Process steps with boxes and arrows |
| **2×2 Cards** | Key points with left-accent cards |
| **Metrics** | 6 large number callouts |
| **Timeline** | Phases, roadmap, next steps |
| **Summary** | Closing slide with done/pending split |

---

## Brand setup

### Auto-detect from your template
Drop any `.potx` or `.pptx` file:
```bash
python3 scripts/extract_brand.py your-template.potx
# → Prints a ready-to-paste BRAND config block
```

### Let Claude choose
Say the tone — *corporate, technical, startup, minimal, warm, bold* — and Claude picks from 8 built-in palettes. Never defaults to generic blue.

---

## Requirements

| Tool | Purpose | Required? |
|---|---|---|
| `node` + `pptxgenjs` | Generates the `.pptx` | Yes |
| `python3` | Brand extraction + QA | Optional |
| LibreOffice + poppler | Visual QA (PDF → images) | Optional |

---

## How it works

```
You describe topic
        ↓
Claude picks brand + plans slides
        ↓
Generates build_deck.js
        ↓
node build_deck.js  →  output.pptx
        ↓
qa_deck.py checks slide content
        ↓
You open output.pptx
```

---

## Files

```
pptx-deck-plugin/
├── .claude-plugin/plugin.json       ← plugin manifest
├── skills/create-deck/SKILL.md      ← /pptx-deck:create-deck
├── scripts/
│   ├── build_deck_template.js       ← starter template (copy + edit)
│   ├── extract_brand.py             ← .potx/.pptx → BRAND config
│   └── qa_deck.py                   ← content QA
└── references/
    ├── brand_config.md              ← 8 color palettes
    ├── slide_patterns.md            ← copy-paste code for every slide type
    └── pptxgenjs_api.md             ← full PptxGenJS API cheatsheet
```

---

## Contributing

PRs welcome! Ideas for contribution:
- New slide pattern types (timeline, org chart, comparison table)
- New brand palettes in `references/brand_config.md`
- Better QA checks in `qa_deck.py`
- Visual QA automation

---

## License

MIT — free to use, modify, and distribute.

---

*Built with [Claude Code](https://code.claude.com) · [PptxGenJS](https://github.com/gitbrent/PptxGenJS)*

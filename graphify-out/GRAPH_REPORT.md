# Graph Report - gitgud-platinum-tracker  (2026-08-27)

## Corpus Check
- Large corpus: 31 files · ~577,275 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 50 nodes · 74 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 73% EXTRACTED · 27% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8

## God Nodes (most connected - your core abstractions)
1. `GitGud Tracker` - 13 edges
2. `Game Selector Sidebar UI` - 10 edges
3. `Dark Souls II: Scholar of the First Sin` - 6 edges
4. `Dark Souls: Remastered` - 5 edges
5. `Dark Souls III: The Fire Fades Edition` - 5 edges
6. `Elden Ring` - 5 edges
7. `Elden Ring: Nightreign` - 5 edges
8. `loadGameData()` - 4 edges
9. `Bloodborne` - 4 edges
10. `Demon's Souls (PS5 Remake)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Dark Souls 1 Background Art` --references--> `Dark Souls: Remastered`  [EXTRACTED]
  img/bg-ds1.jpg → README.md
- `Dark Souls 2 Background Art` --references--> `Dark Souls II: Scholar of the First Sin`  [EXTRACTED]
  img/bg-ds2.jpg → README.md
- `Dark Souls 3 Background Art` --references--> `Dark Souls III: The Fire Fades Edition`  [EXTRACTED]
  img/bg-ds3.jpg → README.md
- `Elden Ring Open World Background Art` --references--> `Elden Ring`  [EXTRACTED]
  img/bg-eldenring.jpg → README.md
- `Elden Ring Nightreign Background Art` --references--> `Elden Ring: Nightreign`  [EXTRACTED]
  img/bg-nightreign.jpg → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Core Tracker Features** — readme_granular_tracking, readme_npc_quest_tracking, readme_browser_storage [EXTRACTED 1.00]
- **FromSoftware Game Logos Used in Sidebar Navigation** — img_ds1_logo, img_ds2_logo, img_ds3_logo, img_eldenring_logo, img_bloodborne_logo, img_demonssouls_logo, img_sekiro_logo [INFERRED 0.95]
- **FromSoftware Soulsborne/Soulslike Game Series** — readme_dark_souls_remastered, readme_dark_souls_2, readme_dark_souls_3, readme_elden_ring, readme_bloodborne, readme_demons_souls, readme_sekiro [INFERRED 0.95]
- **Full-Screen Game Background Art Set** — img_bg_bloodborne_background, img_bg_ds1_background, img_bg_ds2_background, img_bg_ds3_background, img_bg_eldenring_background, img_bg_sekiro_background, img_bg_demonssouls_background, img_bg_nightreign_background, img_bg_liesofp_background [INFERRED 0.95]

## Communities (9 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.27
Nodes (9): createCheckboxItem(), gameButtons, gameTitle, globalProgress, loadGameData(), renderTracker(), showWIP(), trackerContainer (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.36
Nodes (9): Dark Souls 1 Background Art, Dark Souls 2 Background Art, Dark Souls 3 Background Art, Dark Souls Remastered Logo, Dark Souls II Logo, Dark Souls III Logo, Dark Souls II: Scholar of the First Sin, Dark Souls III: The Fire Fades Edition (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.38
Nodes (7): Bloodborne Gothic Horror Background Art, Lies of P Steampunk Background Art, Bloodborne Game Logo, Lies of P Game Logo, Game Selector Sidebar UI, Bloodborne, Lies of P

### Community 3 - "Community 3"
Cohesion: 0.29
Nodes (7): Local Storage Save Disclaimer, Global Platinum Progress Bar, Browser Local Storage Persistence, GitGud Tracker, Granular Boss/Item Tracking, Sequential NPC Quest Tracking, Soulslike 100% Completion Tracker

### Community 4 - "Community 4"
Cohesion: 0.53
Nodes (6): Elden Ring Open World Background Art, Elden Ring Nightreign Background Art, Elden Ring Logo, Elden Ring Nightreign Logo, Elden Ring, Elden Ring: Nightreign

### Community 5 - "Community 5"
Cohesion: 1.00
Nodes (3): Demon's Souls Fantasy Background Art, Demon's Souls Game Logo, Demon's Souls (PS5 Remake)

### Community 6 - "Community 6"
Cohesion: 1.00
Nodes (3): Sekiro Feudal Japan Background Art, Sekiro: Shadows Die Twice Logo, Sekiro: Shadows Die Twice

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (3): Favicon Design Variant 1, Favicon Design Variant 2, GitGud Tracker Favicon

## Knowledge Gaps
- **8 isolated node(s):** `gameButtons`, `gameTitle`, `trackerContainer`, `globalProgress`, `Global Platinum Progress Bar` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GitGud Tracker` connect `Community 3` to `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **Why does `Game Selector Sidebar UI` connect `Community 2` to `Community 1`, `Community 3`, `Community 4`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `Bloodborne` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Dark Souls II: Scholar of the First Sin` (e.g. with `Dark Souls III: The Fire Fades Edition` and `Dark Souls: Remastered`) actually correct?**
  _`Dark Souls II: Scholar of the First Sin` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `gameButtons`, `gameTitle`, `trackerContainer` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
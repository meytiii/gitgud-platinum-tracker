# Graph Report - gitgud-platinum-tracker  (2026-08-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 232 nodes · 324 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eee1685e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.js
- Dark Souls Series
- updateEquipmentAndStatCalculations
- createCheckboxItem
- Elden Ring Universe
- Demon's Souls
- Sekiro
- Favicon & Branding
- Tracker Container

## God Nodes (most connected - your core abstractions)
1. `GitGud Tracker` - 13 edges
2. `updateEquipmentAndStatCalculations()` - 11 edges
3. `Game Selector Sidebar UI` - 10 edges
4. `createCheckboxItem()` - 8 edges
5. `createWalkthroughItem()` - 8 edges
6. `getSavedState()` - 8 edges
7. `loadPlannerStudioData()` - 7 edges
8. `triggerCelebration()` - 7 edges
9. `getActiveProfile()` - 7 edges
10. `renderPlannerStatsGrid()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Dark Souls 2 Background Art` --references--> `Dark Souls II: Scholar of the First Sin`  [EXTRACTED]
  img/bg-ds2.jpg → README.md
- `Dark Souls 3 Background Art` --references--> `Dark Souls III: The Fire Fades Edition`  [EXTRACTED]
  img/bg-ds3.jpg → README.md
- `Dark Souls 1 Background Art` --references--> `Dark Souls: Remastered`  [EXTRACTED]
  img/bg-ds1.jpg → README.md
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

## Communities (9 total, 2 thin omitted)

### Community 0 - "app.js"
Cohesion: 0.02
Nodes (124): accentThemeSelect, ARCHETYPE_TEMPLATES, backupFileInput, backupPasteArea, barFpFill, barHpFill, barStaminaFill, bonusArms (+116 more)

### Community 1 - "Dark Souls Series"
Cohesion: 0.10
Nodes (35): Bloodborne Gothic Horror Background Art, Demon's Souls Fantasy Background Art, Dark Souls 1 Background Art, Dark Souls 2 Background Art, Dark Souls 3 Background Art, Elden Ring Open World Background Art, Lies of P Steampunk Background Art, Elden Ring Nightreign Background Art (+27 more)

### Community 2 - "updateEquipmentAndStatCalculations"
Cohesion: 0.12
Nodes (17): applyArchetypePreset(), calculateRuneCost(), fetchEquipmentData(), getAudioContext(), getPlannerStorageKey(), loadPlannerStudioData(), playCelebrationFanfare(), playCheckChime() (+9 more)

### Community 3 - "createCheckboxItem"
Cohesion: 0.18
Nodes (19): animateCelebration(), applySearchAndFilter(), createCheckboxItem(), createWalkthroughItem(), escapeRegExp(), getProfileItemKey(), getSavedState(), loadGameData() (+11 more)

### Community 4 - "Elden Ring Universe"
Cohesion: 0.23
Nodes (12): closeAllModals(), copyBackupCodeToClipboard(), createBackupObject(), exportBackupToJsonFile(), getActiveProfile(), getProfiles(), initTracker(), refreshCurrentView() (+4 more)

### Community 5 - "Demon's Souls"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, name, orientation, short_name, start_url (+1 more)

### Community 6 - "Sekiro"
Cohesion: 0.67
Nodes (3): Favicon Design Variant 1, Favicon Design Variant 2, GitGud Tracker Favicon

## Knowledge Gaps
- **138 isolated node(s):** `Global Platinum Progress Bar`, `Tracker Content Container`, `accentThemeSelect`, `ARCHETYPE_TEMPLATES`, `backupFileInput` (+133 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `updateEquipmentAndStatCalculations()` connect `updateEquipmentAndStatCalculations` to `app.js`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `Global Platinum Progress Bar`, `Tracker Content Container`, `accentThemeSelect` to the rest of the system?**
  _138 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.015625 - nodes in this community are weakly interconnected._
- **Should `Dark Souls Series` be split into smaller, more focused modules?**
  _Cohesion score 0.0957983193277311 - nodes in this community are weakly interconnected._
- **Should `updateEquipmentAndStatCalculations` be split into smaller, more focused modules?**
  _Cohesion score 0.11688311688311688 - nodes in this community are weakly interconnected._
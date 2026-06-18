# Changelog

All notable changes to this project are documented here.

## 0.1.6

### Fixed

- **Tooltip**: text no longer breaks mid-word and renders evenly. Replaced the
  aggressive `word-break: break-word` with `overflow-wrap: break-word`, added
  `text-align: left`, and removed a redundant `white-space` declaration.
- **Tooltip**: the enter/leave transition now animates `opacity` only, so the
  per-placement positioning transforms are no longer overridden — `left`,
  `right`, and `*-start` / `*-end` tooltips stop jumping during the animation.
- **Sidebar**: icons stay centered when collapsed. The label/badge/arrow no
  longer grow via `flex-grow` (now `flex: 0 0 0`) and the button `gap` is reset
  to `0`, so the lone icon is perfectly centered in the collapsed rail.

## 0.1.5

- Maintenance release.

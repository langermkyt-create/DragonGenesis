# DRAGON GENESIS

A fantasy dragon breeding and mutation collection game.

## Current prototype
- Dragon nursery and local save data
- Independent 35% mutation roll for each body part
- Weighted mutation rarity table
- Breeding between two dragons
- Collection sets and set bonus
- Basic PvE arena prototype
- Responsive mobile-first interface

## Run locally

```bash
npm install
npm run build
```

Open `index.html` in a browser. Progress is stored locally in the browser.

## Android APK

GitHub Actions builds a debug APK on pushes to `main` and on manual workflow dispatch. Download the `dragon-genesis-debug-apk` artifact from the Actions run.

The current arena is local PvE prototype. Real online multiplayer requires a backend, matchmaking, accounts and server-authoritative battle validation; it is not represented as implemented yet.

# Nishan Singh — Video Editing Portfolio

A cinematic portfolio for Nishan Singh’s films, video editing, mobile cinematography, and AI visual art. Built with Next.js and React, with a responsive layout and embedded YouTube players.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). Numeric loopback addresses such as `127.0.0.1` automatically redirect to `localhost` so the YouTube embeds work correctly in the local preview.

## Production build

```sh
npm run build
```

The static website is exported to `out/`. Serve that directory from a static web host.

## Project structure

- `app/`: page entry point, metadata, and global styles.
- `components/`: navigation, portfolio sections, galleries, and video players.
- `lib/projects.js`: film titles, artwork, and YouTube video links.
- `public/assets/`: portfolio images and favicon.
- `public/fonts/`: self-hosted fonts and their license files.

Update the `featured` list in `components/Portfolio.jsx` to change the films shown in Selected Work.

YouTube playback requires an internet connection. Generated builds, dependencies, local environment files, and verification screenshots are excluded from version control.

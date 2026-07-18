# glmu.cc

GLMU Consulting — sovereign cloud architectures, enterprise AI & enablement.

Built with [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/).

## Quick start

```bash
npm install
npm run dev       # → http://localhost:3000
```

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the build locally
```

## Deployment

Build locally and push the `dist/` folder, or configure your own deployment.

## Environment

Copy `.env.local` to a safe place and add your Gemini API key if you need the AI features.

```
GEMINI_API_KEY=your_key_here
```

## Structure

```
.
├── src/
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind v4 styles
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── CNAME                           # Custom domain: www.glmu.cc
```

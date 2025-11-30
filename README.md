# Desmos Live Code

Template for live-coding awesome Desmos graphs using TypeScript, Vite, and Playwright.
A Vite dev server rebuilds `main.ts` on every save, and a `Playwright` controlled browser instance runs the code inside Desmos using the global `Calc` object.

## Why

In some cases, manually entering equations can be tedious. By defining desmos expressions as code, you can use full power of typescript to construct more complex sets of expressions. You can write reusable functions, use for loops and map data. At the same time you can tweak visualizations manually as you usually would, before exporting to SVG for your next assignment or blog post.

## Quick Start

```bash
pnpm install
npx playwright install chromium
pnpm dev
```

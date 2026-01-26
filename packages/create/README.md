# @veltixapp/create

Scaffold a new Veltix extension from the template (based on the qrcode package structure).

## Usage

From the repository root:

```bash
# Create a new extension (kebab-case name)
pnpm run create <extension-name>
# or
pnpm exec veltix-ext create <extension-name>
```

Example:

```bash
pnpm run create my-widget
```

This creates `packages/my-widget/` with:

- `package.json` – `@veltixapp/extension-my-widget`, scripts, deps
- `tsconfig.json`, `webpack.config.js`, `bundle-dts.js`
- `src/index.tsx` – extension entry and manifest
- `src/my-widget.tsx` – main component
- `src/my-widget-view-container.tsx` – sidebar view container
- `src/manifest.ts`, `src/package.ts`

## Next steps

```bash
cd packages/<extension-name>
pnpm install
pnpm run build
pnpm run dev   # watch mode
```

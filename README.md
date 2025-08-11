# Veltix Extensions

This repository contains extensions for the Veltix application, built using a monorepo structure with Turborepo.

## Project Structure

This monorepo includes the following packages:

### Extensions

- **`@veltixapp/extension-qrcode`**: A QR code generation extension that provides QR code functionality to the Veltix application

### Build Tools

- **TypeScript**: Static type checking throughout the monorepo
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting and style consistency
- **Webpack**: Bundling and build optimization for extensions

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0+

### Installation

```bash
# Install dependencies
pnpm install
```

## Development

### Build All Extensions

```bash
# Build all packages
pnpm build

# Or using turbo directly
pnpm exec turbo build
```

### Build Specific Extension

```bash
# Build only the QR code extension
pnpm exec turbo build --filter=@veltixapp/extension-qrcode
```

### Development Mode

```bash
# Start development mode for all extensions
pnpm dev

# Or using turbo directly
pnpm exec turbo dev
```

### Development for Specific Extension

```bash
# Start development mode for QR code extension
pnpm exec turbo dev --filter=@veltixapp/extension-qrcode
```

## Available Scripts

- `pnpm build` - Build all extensions
- `pnpm dev` - Start development mode for all extensions
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code using Prettier
- `pnpm check-types` - Run TypeScript type checking

## QR Code Extension

The QR Code extension provides QR code generation functionality with the following features:

- **Multiple Build Formats**: IIFE (browser-ready) and SystemJS module formats
- **TypeScript Support**: Full type definitions bundled into a single declaration file
- **React Integration**: Built with React 19 and modern web standards
- **Customizable Styling**: Uses qr-code-styling for advanced QR code customization

### Build Outputs

- **IIFE Build** (`dist/index.js`): Universal module definition, creates global `VeltixQrCodeExtension`
- **SystemJS Build** (`dist/index.systemjs.js`): SystemJS module format for ES module environments
- **Type Definitions** (`dist/index.d.ts`): Bundled TypeScript declarations

For detailed usage and development information, see the [QR Code Extension README](./packages/qrcode/README.md).

## Monorepo Management

This project uses [Turborepo](https://turborepo.com/) for efficient monorepo management:

- **Caching**: Build artifacts are cached for faster subsequent builds
- **Parallel Execution**: Tasks run in parallel where possible
- **Dependency Graph**: Automatic task ordering based on package dependencies
- **Filtering**: Run commands on specific packages using `--filter` flags

## Contributing

When adding new extensions:

1. Create a new package in the `packages/` directory
2. Follow the existing package structure and naming conventions
3. Update the root `package.json` scripts if needed
4. Ensure proper TypeScript configuration and build setup

## Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Veltix Application](https://veltix.app)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/)

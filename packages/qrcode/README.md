# QR Code Extension

A Veltix extension that provides QR code generation functionality.

## Build

This extension provides a SystemJS build using webpack:

### SystemJS Build (`dist/index.js`)
- **Format**: SystemJS module format
- **Usage**: Load with SystemJS or other ES module loaders
- **Dependencies**: External React (must be provided at runtime)

## Type Definitions

All TypeScript declarations are bundled into a single `dist/index.d.ts` file for easy consumption.

## Usage

### SystemJS Build
```html
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js"></script>
<script>
    System.config({
        packages: {
            '@veltixapp/extension-qrcode': {
                main: './dist/index.js',
                format: 'system'
            }
        }
    });

    System.import('@veltixapp/extension-qrcode')
        .then(module => {
            const { qrcodeExtension } = module;
            console.log(qrcodeExtension.title); // "QR Code"
        });
</script>
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode for development
npm run dev

# Production build
npm run build:prod
```

## Build Configuration

- **SystemJS Build**: Uses `webpack.config.js` with SystemJS library type
- **TypeScript**: Configured with `ts-loader` for TypeScript compilation
- **Declaration Bundling**: Uses `dts-bundle` to combine all TypeScript declarations into a single file
- **External Dependencies**: React and React-DOM are externalized in SystemJS build

## API

The extension exports a `qrcodeExtension` object with the following structure:

```typescript
{
  id: 'qrcode',
  title: 'QR Code',
  icon: QrCodeIcon,
  viewContainer: QrCodeViewContainer,
  activate: () => {},
  components: [
    {
      type: 'qrcode',
      title: 'QR Code',
      description: 'QR Code',
      defaultProps: {},
      icon: QrCodeIcon,
      main: QrCode
    }
  ]
}
```

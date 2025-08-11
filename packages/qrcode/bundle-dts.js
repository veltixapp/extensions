const dts = require('dts-bundle');
const fs = require('fs');
const path = require('path');

// Bundle the declarations
dts.bundle({
  name: '@veltixapp/extension-qrcode',
  main: 'dist/index.d.ts',
  out: 'dist/index.d.ts',
  removeSource: true,
  outputAsModuleFolder: false
});

// Clean up nested dist directory if it exists
const nestedDistPath = path.join(__dirname, 'dist', 'dist');
if (fs.existsSync(nestedDistPath)) {
  const nestedIndexPath = path.join(nestedDistPath, 'index.d.ts');
  if (fs.existsSync(nestedIndexPath)) {
    // Move the bundled file to the main dist directory
    fs.copyFileSync(nestedIndexPath, path.join(__dirname, 'dist', 'index.d.ts'));
    // Remove the nested dist directory
    fs.rmSync(nestedDistPath, { recursive: true, force: true });
  }
}

// Clean up individual declaration files
const individualFiles = [
  'qrcode.d.ts',
  'qrcode-view-container.d.ts'
];

individualFiles.forEach(file => {
  const filePath = path.join(__dirname, 'dist', file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed ${file}`);
  }
});

console.log('TypeScript declarations bundled into dist/index.d.ts');

const dts = require('dts-bundle');
const fs = require('fs');
const path = require('path');

dts.bundle({
  name: '@veltixapp/extension-openmoji',
  main: 'dist/index.d.ts',
  out: 'dist/index.d.ts',
  removeSource: true,
  outputAsModuleFolder: false
});

const nestedDistPath = path.join(__dirname, 'dist', 'dist');
if (fs.existsSync(nestedDistPath)) {
  const nestedIndexPath = path.join(nestedDistPath, 'index.d.ts');
  if (fs.existsSync(nestedIndexPath)) {
    fs.copyFileSync(nestedIndexPath, path.join(__dirname, 'dist', 'index.d.ts'));
    fs.rmSync(nestedDistPath, { recursive: true, force: true });
  }
}

const individualFiles = [
  'openmoji.d.ts',
  'openmoji-view-container.d.ts'
];

individualFiles.forEach(file => {
  const filePath = path.join(__dirname, 'dist', file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
});

console.log('TypeScript declarations bundled into dist/index.d.ts');

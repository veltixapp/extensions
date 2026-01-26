import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function kebabToCamel(kebab: string): string {
  const pascal = kebabToPascal(kebab);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function applyVars(content: string, vars: Record<string, string>): string {
  let out = content;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }
  return out;
}

export async function createExtension(id: string): Promise<void> {
  const pascalName = kebabToPascal(id);
  const camelName = kebabToCamel(id);
  const title = kebabToTitle(id);
  const packageName = `@veltixapp/extension-${id}`;

  const vars: Record<string, string> = {
    id,
    pascalName,
    camelName,
    title,
    packageName,
  };

  const packagesDir = path.resolve(__dirname, "../..");
  const targetDir = path.join(packagesDir, id);

  if (fs.existsSync(targetDir)) {
    throw new Error(`Directory already exists: packages/${id}`);
  }

  const templates = getTemplates(vars);
  for (const [relativePath, content] of Object.entries(templates)) {
    const fullPath = path.join(targetDir, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
  }

  console.log(`Created extension at packages/${id}`);
  console.log("\nNext steps:");
  console.log(`  cd packages/${id}`);
  console.log("  pnpm install");
  console.log("  pnpm run build");
}

function getTemplates(v: Record<string, string>): Record<string, string> {
  const id = v.id;
  const pascalName = v.pascalName;
  const title = v.title;
  const packageName = v.packageName;

  return {
    "package.json": applyVars(
      `{
  "name": "{{packageName}}",
  "version": "0.0.0",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "webpack --config webpack.config.js && node bundle-dts.js",
    "build:watch": "webpack --config webpack.config.js --watch",
    "build:prod": "NODE_ENV=production webpack --config webpack.config.js && node bundle-dts.js",
    "clean": "rm -rf dist",
    "dev": "npm run build:watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@veltix/types": "^0.0.6",
    "lucide-react": "^0.539.0",
    "react": "^19.1.1"
  },
  "devDependencies": {
    "@types/node": "^24.2.1",
    "@types/react": "^19.1.9",
    "dts-bundle": "^0.7.3",
    "ts-loader": "^9.5.1",
    "tsx": "^4.7.0",
    "typescript": "^5.7.2",
    "webpack": "^5.101.0",
    "webpack-cli": "^5.1.4"
  },
  "files": [
    "dist"
  ]
}
`,
      v
    ),

    "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": false,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
`,

    "webpack.config.js": applyVars(
      `const path = require('path');

module.exports = {
  context: __dirname,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    index: './src/index.tsx',
    {{id}}: './src/package.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'system'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
    '@veltix/types': '@veltix/types'
  },
  devtool: 'source-map',
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
};
`,
      v
    ),

    "bundle-dts.js": applyVars(
      `const dts = require('dts-bundle');
const fs = require('fs');
const path = require('path');

dts.bundle({
  name: '{{packageName}}',
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
  '{{id}}.d.ts',
  '{{id}}-view-container.d.ts'
];

individualFiles.forEach(file => {
  const filePath = path.join(__dirname, 'dist', file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
});

console.log('TypeScript declarations bundled into dist/index.d.ts');
`,
      v
    ),

    "README.md": applyVars(
      `# {{title}} Extension

A Veltix extension.

## Build

\`\`\`bash
pnpm install
pnpm run build
pnpm run dev
\`\`\`
`,
      v
    ),

    [`src/${id}.tsx`]: applyVars(
      `import { useState } from 'react'

type {{pascalName}}Props = {
  message: string
}

export const {{pascalName}} = (props: {{pascalName}}Props) => {
  const [msg] = useState(props.message)
  return <div className="p-4 border rounded">{msg}</div>
}

{{pascalName}}.defaultProps = {
  message: "Hello from {{title}}",
}
`,
      v
    ),

    [`src/${id}-view-container.tsx`]: applyVars(
      `import { useState } from 'react'
import { Veltix } from '@veltix/types'

export const {{pascalName}}ViewContainer = ({ context }: { context: Veltix.Context }) => {
  const [message, setMessage] = useState('Hello')

  const handleInsert = () => {
    context.editor.createNode({
      position: { width: 200, height: 80 },
      type: '{{id}}',
      props: { message }
    })
  }

  return (
    <div className="p-2">
      <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white">
        <span className="bg-gradient-to-r from-cyan-200 to-emerald-600 bg-clip-text text-transparent">{{title}}</span>
      </h1>
      <div className="mb-4">
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
      </div>
      <button
        onClick={handleInsert}
        className="mb-2 me-2 w-full rounded-lg bg-[#2557D6] px-5 py-2 text-center text-sm font-medium text-white hover:bg-[#2557D6]/90"
      >
        Insert
      </button>
    </div>
  )
}
`,
      v
    ),

    "src/manifest.ts": applyVars(
      `import { Box as BoxIcon } from "lucide-react"
import { {{pascalName}} } from "./{{id}}"
import { Veltix } from "@veltix/types"

export const manifest: Veltix.Manifest = {
  name: "{{id}}",
  title: "{{title}}",
  description: "{{title}}",
  defaultProps: {},
  icon: BoxIcon,
  propertiesSchema: {
    sections: [
      {
        title: "{{title}}",
        type: "custom",
        settings: [
          {
            label: "Message",
            name: "message",
            type: "input",
            default: {{pascalName}}.defaultProps.message,
          },
        ],
      },
    ],
  },
  main: {{pascalName}} as unknown as Veltix.Manifest["main"],
}
`,
      v
    ),

    "src/package.ts": applyVars(
      `import { {{pascalName}} } from "./{{id}}"
import { Veltix } from "@veltix/types"

export default {
  name: "{{id}}",
  main: {{pascalName}} as unknown as Veltix.Manifest["main"],
}
`,
      v
    ),

    "src/index.tsx": applyVars(
      `import { Box as BoxIcon } from 'lucide-react'
import { Veltix } from '@veltix/types'
import { {{pascalName}}ViewContainer } from './{{id}}-view-container'
import { manifest } from './manifest'

export const {{camelName}}Extension: Veltix.Extension = {
  id: '{{id}}',
  title: '{{title}}',
  icon: BoxIcon,
  viewContainer: {{pascalName}}ViewContainer,
  activate: () => {},
  components: [ manifest ]
}

export default {
  {{camelName}}Extension
}
`,
      v
    ),
  };
}

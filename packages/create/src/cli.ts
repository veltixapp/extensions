#!/usr/bin/env node

import { createExtension } from "./create.js";

const args = process.argv.slice(2);
const command = args[0];
const name = args[1];

if (command === "create") {
  if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
    console.error(
      "Usage: veltix-ext create <extension-name>\n" +
        "  extension-name: kebab-case, e.g. my-widget"
    );
    process.exit(1);
  }
  createExtension(name).catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  console.log(
    "Veltix Extension CLI\n\n" +
      "  veltix-ext create <extension-name>  Create a new extension in packages/<name>\n"
  );
  process.exit(command ? 1 : 0);
}

import { mkdir, readdir, readFile, copyFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distIndex = path.join(root, "dist", "index.html");
const fallback = path.join(root, "dist", "404.html");
const jerseyDataRoot = path.join(root, "src", "data", "jerseys");

async function findJerseyDataFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findJerseyDataFiles(fullPath)));
    } else if (entry.name === "index.ts") {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await findJerseyDataFiles(jerseyDataRoot);
const jerseyIds = new Set();

for (const file of files) {
  const content = await readFile(file, "utf8");
  const match = content.match(/id:\s*["']([^"']+)["']/);
  if (match) {
    jerseyIds.add(match[1]);
  }
}

await copyFile(distIndex, fallback);

for (const jerseyId of jerseyIds) {
  const routeDirectory = path.join(root, "dist", "jerseys", jerseyId);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(distIndex, path.join(routeDirectory, "index.html"));
}

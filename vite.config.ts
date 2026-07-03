import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "jersey-showcase";
const githubPagesBase = repositoryName.endsWith(".github.io") ? "/" : `/${repositoryName}/`;

function preloadHeroImage(): Plugin {
  const base = isGitHubPages ? githubPagesBase : "/";
  return {
    name: "preload-hero-image",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type === "asset" && /hero-crest/i.test(fileName)) {
            const assetPath = `${base}${fileName}`.replace(/\/+/g, "/");
            const preload = `  <link rel="preload" as="image" href="${assetPath}" fetchpriority="high" />`;
            return html.replace("</head>", `${preload}\n</head>`);
          }
        }
        return html;
      },
    },
  };
}

export default defineConfig({
  base: isGitHubPages ? githubPagesBase : "/",
  plugins: [
    tanstackRouter({ target: "react" }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    preloadHeroImage(),
  ],
});

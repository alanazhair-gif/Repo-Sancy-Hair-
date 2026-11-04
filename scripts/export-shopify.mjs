// Turns the prerendered Next.js homepage into Shopify theme sections.
//
//   npm run export:shopify        (next build + this script)
//
// Output (shopify/):
//   sections/sancy-home.liquid    everything inside <main>, for templates/index.json
//   sections/sancy-footer.liquid  the site footer, for sections/footer-group.json
//   sections/sancy-header.liquid  the menu from /shopify-header, for sections/header-group.json
//   assets/                       sancy-home.js and the images both sections use
// Each section renders inside a declarative shadow root (see renderSection), and rem values
// are converted to px because Shopify themes often change the root font size.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import postcss from "postcss";

const root = process.cwd();
const out = path.join(root, "shopify");
const htmlFile = path.join(root, ".next/server/app/index.html");
const headerFile = path.join(root, ".next/server/app/shopify-header.html");
const cssDir = path.join(root, ".next/static/chunks");
const SCOPE = ".sancy-home";

if (!existsSync(htmlFile) || !existsSync(headerFile)) {
  throw new Error("Run `npm run build` first: the prerendered pages in .next/server/app are missing.");
}

rmSync(out, { recursive: true, force: true });
mkdirSync(path.join(out, "sections"), { recursive: true });
mkdirSync(path.join(out, "assets"), { recursive: true });

// 1. Markup: next/image URLs swapped for theme assets.
const html = readFileSync(htmlFile, "utf8");
const images = new Map();
const assetName = (publicPath) => `sancy-${publicPath.replace(/^\/sites\/sancy\//, "").replace(/\//g, "-")}`;

const toLiquid = (fragment) => {
  const markup = fragment
    .replace(/<img\b[^>]*>/g, (tag) => {
      const src = tag.match(/\ssrc="([^"]+)"/)?.[1] ?? "";
      const encoded = src.match(/[?&]url=([^&]+)/)?.[1];
      const publicPath = decodeURIComponent(encoded ?? src.replace(/&amp;/g, "&"));
      if (!publicPath.startsWith("/sites/sancy/")) return tag;
      const name = assetName(publicPath);
      images.set(name, path.join(root, "public", publicPath));
      return tag
        .replace(/\s(srcSet|srcset|sizes)="[^"]*"/g, "")
        .replace(/\ssrc="[^"]+"/, ` src="{{ '${name}' | asset_url }}"`)
        .replace(/\sfetchPriority="high"/i, "");
    })
    .replace(/<!--\/?\$\??-->|<!-- -->/g, "");
  if (/{%|{{(?! ')/.test(markup.replace(/{{ '[^']+' \| asset_url }}/g, ""))) {
    throw new Error("Page text contains Liquid delimiters; escape them before exporting.");
  }
  return markup;
};

const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0];
const header = readFileSync(headerFile, "utf8").match(/<header[\s\S]*?<\/header>/)?.[0];
if (!main || !footer || !header) throw new Error("No <main>, <footer> or <header> found in the prerendered pages.");

const homeMarkup = toLiquid(main);
// The footer shows on every page, so its in-page links go back to the homepage.
const footerMarkup = toLiquid(footer).replace(/href="#/g, 'href="/#');
// The standalone header already links to /#section.
const headerMarkup = toLiquid(header);

for (const [name, file] of images) copyFileSync(file, path.join(out, "assets", name));
copyFileSync(path.join(root, "scripts/shopify/sancy-home.js"), path.join(out, "assets", "sancy-home.js"));

// 2. Styles: the compiled Tailwind CSS, scoped under .sancy-home.
const cssFiles = readdirSync(cssDir).filter((f) => f.endsWith(".css"));
const css = cssFiles.map((f) => readFileSync(path.join(cssDir, f), "utf8")).join("\n");

const scopeSelector = (selector) =>
  selector
    .split(",")
    .map((part) => {
      const s = part.trim();
      if (/^(:root|:host|html|body)$/.test(s)) return SCOPE;
      if (/^(html|body)\s/.test(s)) return s.replace(/^(html|body)\s+/, `${SCOPE} `);
      return `${SCOPE} ${s}`;
    })
    .join(",");

const scoped = postcss([
  {
    postcssPlugin: "sancy-scope",
    Once(tree) {
      tree.walkAtRules("font-face", (rule) => rule.remove());
      // Browsers ignore @property inside a shadow root, so Tailwind's --tw-* defaults
      // (border style, shadows, transforms) would be missing. Declare them directly instead.
      const defaults = [];
      tree.walkAtRules("property", (rule) => {
        let initial;
        rule.walkDecls("initial-value", (d) => (initial = d.value));
        defaults.push(`${rule.params}:${initial ?? "initial"}`);
        rule.remove();
      });
      if (defaults.length) {
        tree.prepend(postcss.parse(`*,:before,:after,::backdrop{${defaults.join(";")}}`));
      }
      // Unlayered theme CSS always beats layered CSS, so flatten Tailwind's layers
      // (source order already runs theme, base, components, utilities).
      tree.walkAtRules("layer", (rule) => (rule.nodes ? rule.replaceWith(rule.nodes) : rule.remove()));
      tree.walkRules((rule) => {
        if (rule.parent?.type === "atrule" && /keyframes$/.test(rule.parent.name)) return;
        // next/font variable classes live on <html>; the section sets the font variables itself.
        if (/module__.*__(variable|className)/.test(rule.selector)) return rule.remove();
        rule.selector = scopeSelector(rule.selector);
      });
      tree.walkDecls((decl) => {
        decl.value = decl.value.replace(/(-?\d*\.?\d+)rem\b/g, (_, n) => `${+(n * 16).toFixed(3)}px`);
      });
    },
  },
]).process(css, { from: undefined }).css;

const extra = `
${SCOPE} {
  --font-montserrat: "Montserrat";
  --font-playfair: "Playfair Display";
  display: block;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
}
/* Themes style bare elements (h1 { color }, p { font-family }). One class of specificity
   beats those yet still loses to the Tailwind utilities below. */
${SCOPE} :is(h1, h2, h3, h4, h5, h6, p, li, dt, dd, label, legend, summary, small, strong, span) {
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}
/* The theme's header sits above the section, so the hero no longer needs room for an overlaid header. */
${SCOPE} #top > .grid { padding-top: 64px; }
`;
const styles = `${extra}\n${scoped}`;
if (/{{|{%/.test(styles)) throw new Error("CSS contains Liquid delimiters.");

// 3. The sections. Theme classes such as Horizon's .grid and .flex share names with
// Tailwind utilities, so each section lives in a declarative shadow root: theme CSS cannot
// reach in and ours cannot leak out. Styles are inlined so it renders without a flash.
// sancy-home.js attaches the shadow root by hand where the template stays inert.
const renderSection = ({ markup, schema }) => `{% comment %}
  Generated by scripts/export-shopify.mjs from the Next.js homepage. Do not edit by hand:
  change the React components, run the export again and re-upload.
{% endcomment %}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap" rel="stylesheet">
<style>
  /* The host may land inside a theme grid or flex wrapper: always span the full row. */
  [data-sancy-host] { display: block; width: 100%; max-width: none; margin: 0; padding: 0; grid-column: 1 / -1; flex: 1 1 100%; }
</style>
<div data-sancy-host>
<template shadowrootmode="open">
<style>${styles}</style>
<div class="sancy-home" data-sancy-home>
${markup}
</div>
</template>
</div>
<script src="{{ 'sancy-home.js' | asset_url }}" defer></script>

{% schema %}
${JSON.stringify(schema, null, 2)}
{% endschema %}
`;

const sections = {
  "sancy-home": {
    markup: homeMarkup,
    schema: { name: "Sancy homepage", tag: "section", class: "sancy-home-section", presets: [{ name: "Sancy homepage" }] },
  },
  "sancy-header": {
    markup: headerMarkup,
    schema: { name: "Sancy header", tag: "section", class: "sancy-header-section", enabled_on: { groups: ["header"] } },
  },
  "sancy-footer": {
    markup: footerMarkup,
    schema: { name: "Sancy footer", tag: "section", class: "sancy-footer-section", enabled_on: { groups: ["footer"] } },
  },
};

for (const [name, section] of Object.entries(sections)) {
  const liquid = renderSection(section);
  writeFileSync(path.join(out, "sections", `${name}.liquid`), liquid);
  console.log(`shopify/sections/${name}.liquid (${(liquid.length / 1024).toFixed(0)} KB)`);
}
console.log(`shopify/assets: sancy-home.js, ${images.size} images`);

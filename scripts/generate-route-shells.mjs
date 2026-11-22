import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDirectory = path.join(root, "dist");
const canonicalOrigin = "https://basoglumermer.com.tr";
const metadata = JSON.parse(
  await readFile(path.join(root, "src", "seoMetadata.json"), "utf8"),
);
const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");
const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
const locations = Array.from(sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g), (match) => match[1]);
const routes = new Set();

for (const location of locations) {
  const url = new URL(location);
  if (url.origin !== canonicalOrigin) {
    throw new Error(`Unexpected sitemap origin: ${url.origin}`);
  }
  const route = url.pathname.replace(/\/+$/, "") || "/";
  if (route !== "/") routes.add(route);
}

function routeMetadata(route) {
  if (metadata.pageMeta[route]) return metadata.pageMeta[route];
  if (route.startsWith("/mermerlerimiz/")) {
    return {
      title: "Mermer Kategorileri | Başoğlu Mermer Sanayi",
      description: metadata.pageMeta["/mermerlerimiz"].description,
    };
  }
  if (route.startsWith("/granitler/")) {
    return {
      title: "Granit Kategorileri | Başoğlu Mermer Sanayi",
      description: metadata.pageMeta["/granitler"].description,
    };
  }
  if (route.startsWith("/urun/")) {
    return {
      title: "Doğal Taş Ürünleri | Başoğlu Mermer Sanayi",
      description: "Başoğlu Mermer doğal taş ürünleri; ürün özellikleri, stok ve fiyat bilgisi için bizimle iletişime geçin.",
    };
  }
  throw new Error(`Sitemap route has no SEO metadata: ${route}`);
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceRequired(html, pattern, replacement, name) {
  if (!pattern.test(html)) throw new Error(`Missing ${name} in HTML template`);
  return html.replace(pattern, replacement);
}

for (const route of routes) {
  const page = routeMetadata(route);
  const canonicalUrl = new URL(`${route}/`, canonicalOrigin).toString();
  let html = replaceRequired(
    template,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttribute(page.title)}</title>`,
    "title",
  );
  html = replaceRequired(
    html,
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    "description",
  );
  html = replaceRequired(
    html,
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    "Open Graph title",
  );
  html = replaceRequired(
    html,
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    "Open Graph description",
  );
  html = replaceRequired(
    html,
    /<meta\s+property="og:url"[^>]*>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    "Open Graph URL",
  );
  html = replaceRequired(
    html,
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    "canonical URL",
  );

  const routeDirectory = path.resolve(outputDirectory, `.${route}`);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), html, "utf8");
}

console.log(`Generated ${routes.size} static route pages from sitemap.xml`);

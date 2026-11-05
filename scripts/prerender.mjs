import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);
const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const TMP_SSR_DIR = path.join(ROOT_DIR, '.tmp-ssr');

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getOgLocale(lang) {
  if (lang === 'ca') return 'ca_ES';
  if (lang === 'en') return 'en_US';
  return 'es_ES';
}

async function runPrerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run vite build before prerender.mjs.');
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  fs.mkdirSync(TMP_SSR_DIR, { recursive: true });
  const ssrBundlePath = path.join(TMP_SSR_DIR, 'entry-server.cjs');

  await build({
    entryPoints: [path.join(ROOT_DIR, 'src', 'entry-server.tsx')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: ssrBundlePath,
    logLevel: 'silent',
  });

  const ssrModule = require(ssrBundlePath);
  const { renderRoute, getAllPrerenderPaths } = ssrModule;

  const routes = getAllPrerenderPaths();
  let renderedCount = 0;

  for (const routePath of routes) {
    const { html, seo, lang } = renderRoute(routePath);
    const ogLocale = getOgLocale(lang);
    const safeSchemaJson = JSON.stringify(seo.schemaJson).replace(/</g, '\\u003c');

    let pageHtml = templateHtml;

    // 1. Update <html lang="...">
    pageHtml = pageHtml.replace(/<html lang="[^"]*">/, () => `<html lang="${escapeAttr(lang)}">`);

    // 2. Update <title>
    pageHtml = pageHtml.replace(
      /<title>[^<]*<\/title>/,
      () => `<title>${escapeAttr(seo.title)}</title>`
    );

    // 3. Update <meta name="description"> & staging robots tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="description" content="${escapeAttr(seo.description)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="robots" content="${escapeAttr(seo.robots)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="googlebot" content="${escapeAttr(seo.robots)}" />`
    );

    // 4. Update canonical & hreflang alternate links
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"[^>]*\/?>/,
      () => `<link rel="canonical" id="canonical-url" href="${escapeAttr(seo.canonicalUrl)}" />`
    );
    pageHtml = pageHtml.replace(
      /<link\s+rel="alternate"\s+hreflang="es"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="es" href="${escapeAttr(seo.alternates.es)}" />`
    );
    pageHtml = pageHtml.replace(
      /<link\s+rel="alternate"\s+hreflang="ca"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="ca" href="${escapeAttr(seo.alternates.ca)}" />`
    );
    pageHtml = pageHtml.replace(
      /<link\s+rel="alternate"\s+hreflang="en"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="en" href="${escapeAttr(seo.alternates.en)}" />`
    );
    pageHtml = pageHtml.replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="x-default" href="${escapeAttr(seo.alternates['x-default'])}" />`
    );

    // 5. Update OpenGraph & Twitter Card meta tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:title" content="${escapeAttr(seo.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:description" content="${escapeAttr(seo.description)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:type" content="${escapeAttr(seo.ogType)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"[^>]*\/?>/,
      () => `<meta property="og:url" id="og-url" content="${escapeAttr(seo.canonicalUrl)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:locale" content="${escapeAttr(ogLocale)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:image" content="${escapeAttr(seo.ogImage)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`
    );

    // 6. Replace JSON-LD Schema script
    pageHtml = pageHtml.replace(
      /<script\s+id="dynamic-schema-ld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
      () => `<script id="dynamic-schema-ld" type="application/ld+json">${safeSchemaJson}</script>`
    );

    // 7. Inject pre-rendered HTML into #root
    pageHtml = pageHtml.replace(
      /<div id="root"><\/div>/,
      () => `<div id="root">${html}</div>`
    );

    if (routePath === '/') {
      fs.writeFileSync(indexHtmlPath, pageHtml, 'utf-8');
    } else {
      const cleanRel = routePath.replace(/^\//, '');
      // Write both dist/<route>/index.html and dist/<route>.html for Vercel cleanUrls & static servers
      const dirIndexFile = path.join(DIST_DIR, cleanRel, 'index.html');
      const flatHtmlFile = path.join(DIST_DIR, `${cleanRel}.html`);
      fs.mkdirSync(path.dirname(dirIndexFile), { recursive: true });
      fs.writeFileSync(dirIndexFile, pageHtml, 'utf-8');
      fs.writeFileSync(flatHtmlFile, pageHtml, 'utf-8');
    }

    renderedCount += 1;
  }

  fs.rmSync(TMP_SSR_DIR, { recursive: true, force: true });
  console.log(`[prerender] Successfully pre-rendered ${renderedCount} static routes across es/ca/en.`);
}

runPrerender().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});

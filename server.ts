import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {
  authenticateOwnerPassword,
  buildSessionCookieHeader,
  changeOwnerPassword,
  createSessionToken,
  deleteCrmLeadById,
  extractSessionTokenFromHeaders,
  listCrmLeads,
  markAllCrmLeadsSeen,
  recordCrmLead,
  updateCrmLead,
  verifySessionToken,
} from './server/crmService.ts';
import { getLegacyRedirectPath, parseUrlPath } from './src/utils/routing.ts';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const IS_PROD = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

function escapeHtmlAttr(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getOgLocale(lang: string): string {
  if (lang === 'ca') return 'ca_ES';
  if (lang === 'en') return 'en_US';
  return 'es_ES';
}

function applySeoToHtmlTemplate(
  templateHtml: string,
  payload: {
    html: string;
    lang: string;
    seo: {
      title: string;
      description: string;
      canonicalUrl: string;
      alternates: { es: string; ca: string; en: string; 'x-default': string };
      robots: string;
      ogType: string;
      ogImage: string;
      schemaJson: unknown;
    };
  }
): string {
  const { html, lang, seo } = payload;
  const ogLocale = getOgLocale(lang);
  const safeSchemaJson = JSON.stringify(seo.schemaJson).replace(/</g, '\\u003c');

  return templateHtml
    .replace(/<html lang="[^"]*">/, () => `<html lang="${escapeHtmlAttr(lang)}">`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtmlAttr(seo.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="description" content="${escapeHtmlAttr(seo.description)}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="robots" content="${escapeHtmlAttr(seo.robots)}" />`
    )
    .replace(
      /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="googlebot" content="${escapeHtmlAttr(seo.robots)}" />`
    )
    .replace(
      /<link\s+rel="canonical"[^>]*\/?>/,
      () => `<link rel="canonical" id="canonical-url" href="${escapeHtmlAttr(seo.canonicalUrl)}" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="es"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="es" href="${escapeHtmlAttr(seo.alternates.es)}" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="ca"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="ca" href="${escapeHtmlAttr(seo.alternates.ca)}" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="en"[^>]*\/?>/,
      () => `<link rel="alternate" hreflang="en" href="${escapeHtmlAttr(seo.alternates.en)}" />`
    )
    .replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*\/?>/,
      () =>
        `<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttr(seo.alternates['x-default'])}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:title" content="${escapeHtmlAttr(seo.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:description" content="${escapeHtmlAttr(seo.description)}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:type" content="${escapeHtmlAttr(seo.ogType)}" />`
    )
    .replace(
      /<meta\s+property="og:url"[^>]*\/?>/,
      () => `<meta property="og:url" id="og-url" content="${escapeHtmlAttr(seo.canonicalUrl)}" />`
    )
    .replace(
      /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:locale" content="${escapeHtmlAttr(ogLocale)}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      () => `<meta property="og:image" content="${escapeHtmlAttr(seo.ogImage)}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="twitter:title" content="${escapeHtmlAttr(seo.title)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      () => `<meta name="twitter:description" content="${escapeHtmlAttr(seo.description)}" />`
    )
    .replace(
      /<script\s+id="dynamic-schema-ld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
      () => `<script id="dynamic-schema-ld" type="application/ld+json">${safeSchemaJson}</script>`
    )
    .replace(/<div id="root"><\/div>/, () => `<div id="root">${html}</div>`);
}

function buildCrmApiRouter() {
  const router = express.Router();
  router.use(express.json());

  router.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  const requireAuth: express.RequestHandler = (req, res, next) => {
    const token = extractSessionTokenFromHeaders(req.headers);
    if (!verifySessionToken(token)) {
      res.status(401).json({
        authenticated: false,
        error: 'Acceso denegado. Se requiere autenticación en el servidor.',
      });
      return;
    }
    next();
  };

  router.get('/session', (req, res) => {
    const token = extractSessionTokenFromHeaders(req.headers);
    if (!verifySessionToken(token)) {
      res.status(401).json({ authenticated: false });
      return;
    }
    res.status(200).json({ authenticated: true });
  });

  router.post('/login', (req, res) => {
    const body = (req.body || {}) as { password?: unknown };
    const password = typeof body.password === 'string' ? body.password : '';
    if (!authenticateOwnerPassword(password)) {
      res.status(401).json({
        authenticated: false,
        error: 'Contraseña incorrecta. Validación denegada por el servidor.',
      });
      return;
    }

    const session = createSessionToken();
    res.setHeader('Set-Cookie', buildSessionCookieHeader(session.token));
    res.status(200).json({
      authenticated: true,
      token: session.token,
      expiresAt: session.expiresAt,
    });
  });

  router.post('/logout', (_req, res) => {
    res.setHeader('Set-Cookie', buildSessionCookieHeader('', 0));
    res.status(200).json({ authenticated: false });
  });

  router.post('/password', requireAuth, (req, res) => {
    const body = (req.body || {}) as { newPassword?: unknown };
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
    const result = changeOwnerPassword(newPassword);
    if (!result.ok) {
      res.status(400).json({ error: result.error });
      return;
    }
    res.status(200).json({
      ok: true,
      message: 'Contraseña actualizada correctamente en el servidor.',
    });
  });

  router.post('/leads/mark-all-seen', requireAuth, (_req, res) => {
    const leads = markAllCrmLeadsSeen();
    res.status(200).json({ leads });
  });

  router.post('/leads', (req, res) => {
    const body = (req.body || {}) as Record<string, unknown>;
    const lead = recordCrmLead({
      type: body.type === 'call' ? 'call' : 'whatsapp',
      phoneTarget: typeof body.phoneTarget === 'string' ? body.phoneTarget : undefined,
      treatment: typeof body.treatment === 'string' ? body.treatment : undefined,
      sourcePage: typeof body.sourcePage === 'string' ? body.sourcePage : undefined,
      sourceUrl: typeof body.sourceUrl === 'string' ? body.sourceUrl : undefined,
    });
    res.status(201).json({ ok: true, id: lead.id });
  });

  router.get('/leads', requireAuth, (_req, res) => {
    res.status(200).json({ leads: listCrmLeads() });
  });

  router.patch('/leads/:id', requireAuth, (req, res) => {
    const id = req.params.id;
    const body = (req.body || {}) as { status?: unknown; notes?: unknown };
    const updated = updateCrmLead(id, {
      status:
        body.status === 'sin_ver' || body.status === 'visto'
          ? body.status
          : undefined,
      notes: typeof body.notes === 'string' ? body.notes : undefined,
    });
    if (!updated) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.status(200).json({ lead: updated });
  });

  router.delete('/leads/:id', requireAuth, (req, res) => {
    const deleted = deleteCrmLeadById(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Registro no encontrado' });
      return;
    }
    res.status(200).json({ ok: true });
  });

  router.use((_req, res) => {
    res.status(404).json({ error: 'Endpoint CRM no encontrado' });
  });

  return router;
}

async function startServer() {
  const app = express();

  // Mount server-authenticated CRM API
  app.use('/api/crm', buildCrmApiRouter());

  // Unmatched API endpoints always return 404 JSON
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.get('*', async (req, res) => {
      const reqPath = req.path || '/';

      // Permanent 301 redirect for legacy untranslated CA/EN specialty paths
      const legacyTarget = getLegacyRedirectPath(reqPath);
      if (legacyTarget) {
        res.redirect(301, legacyTarget);
        return;
      }

      // If request looks like a missing static file extension, return true 404
      if (/\.[a-zA-Z0-9]{2,8}$/.test(reqPath) && !reqPath.endsWith('.html')) {
        res.status(404).type('text/plain').send('404 Not Found');
        return;
      }

      const parsed = parseUrlPath(reqPath);
      const statusCode = parsed.isNotFound ? 404 : 200;

      try {
        const rawTemplate = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf-8');
        const transformedTemplate = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
        const ssrModule = await vite.ssrLoadModule('/src/entry-server.tsx');
        const rendered = ssrModule.renderRoute(reqPath);
        const finalHtml = applySeoToHtmlTemplate(transformedTemplate, rendered);

        res
          .status(statusCode)
          .setHeader('Content-Type', 'text/html; charset=utf-8')
          .setHeader('X-Robots-Tag', 'noindex, nofollow')
          .end(finalHtml);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        res.status(500).type('text/plain').send('Internal Server Error');
      }
    });
  } else {
    // Serve static build assets cleanly without directory index auto-fallback to homepage
    app.use(
      express.static(DIST_DIR, {
        index: false,
        redirect: false,
        setHeaders: (res, filePath) => {
          res.setHeader('X-Robots-Tag', 'noindex, nofollow');
          if (filePath.endsWith('robots.txt')) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          } else if (filePath.endsWith('sitemap.xml')) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          }
        },
      })
    );

    app.get('*', (req, res) => {
      const reqPath = req.path || '/';

      const legacyTarget = getLegacyRedirectPath(reqPath);
      if (legacyTarget) {
        res.redirect(301, legacyTarget);
        return;
      }

      const parsed = parseUrlPath(reqPath);

      if (parsed.isNotFound) {
        const localized404 =
          parsed.lang === 'ca'
            ? path.join(DIST_DIR, 'ca', '404.html')
            : parsed.lang === 'en'
            ? path.join(DIST_DIR, 'en', '404.html')
            : path.join(DIST_DIR, '404.html');
        const target404 = fs.existsSync(localized404)
          ? localized404
          : path.join(DIST_DIR, '404.html');

        res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (fs.existsSync(target404)) {
          res.status(404).sendFile(target404);
        } else {
          res.status(404).send('404 - Página no encontrada');
        }
        return;
      }

      const cleanRel = reqPath.replace(/^\/+|\/+$/g, '');
      const candidates =
        cleanRel === ''
          ? [path.join(DIST_DIR, 'index.html')]
          : [
              path.join(DIST_DIR, `${cleanRel}.html`),
              path.join(DIST_DIR, cleanRel, 'index.html'),
              path.join(DIST_DIR, 'index.html'),
            ];

      const matchedHtml = candidates.find((c) => fs.existsSync(c));
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (matchedHtml) {
        res.status(200).sendFile(matchedHtml);
      } else {
        res.status(404).send('404 - Página no encontrada');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server] Clínica Dental SET server listening on http://0.0.0.0:${PORT} (${IS_PROD ? 'production' : 'development'})`);
  });
}

startServer();

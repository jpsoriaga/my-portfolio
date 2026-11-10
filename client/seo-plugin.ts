import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const SITE_URL = "https://jpsoriaga.me";
const NAME = "John Patrick Soriaga";

type ProjectSeo = { slug: string; title: string; summary: string };

// projects.ts imports images, so it can't be loaded here; read the few text fields from its source instead.
function readProjects(source: string): ProjectSeo[] {
    return source
        .split(/\bslug: "/)
        .slice(1)
        .flatMap((entry) => {
            const slug = entry.slice(0, entry.indexOf('"'));
            const title = entry.match(/\btitle: "([^"]+)"/)?.[1];
            const summary = entry.match(/\bsummary: "([^"]+)"/)?.[1];

            // Only projects with details have their own page.
            return title && summary ? [{ slug, title, summary }] : [];
        });
}

function escapeAttr(value: string) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function withPageMeta(html: string, { title, description, url }: { title: string; description: string; url: string }) {
    const t = escapeAttr(title);
    const d = escapeAttr(description);

    return html
        .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
        .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${d}"`)
        .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${t}"`)
        .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
        .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
        .replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');
}

// Writes a real HTML file for each project page (so GitHub Pages serves it with 200 instead of 404),
// plus sitemap.xml and robots.txt.
export function seoPages(): Plugin {
    let outDir = "dist";
    let root = process.cwd();

    return {
        name: "seo-pages",
        apply: "build",
        configResolved(config) {
            root = config.root;
            outDir = resolve(config.root, config.build.outDir);
        },
        closeBundle() {
            const html = readFileSync(resolve(outDir, "index.html"), "utf8");
            const projects = readProjects(readFileSync(resolve(root, "src/components/RecentProject/projects.ts"), "utf8"));

            mkdirSync(resolve(outDir, "projects"), { recursive: true });

            for (const project of projects) {
                // GitHub Pages serves /projects/<slug> from projects/<slug>.html.
                writeFileSync(
                    resolve(outDir, "projects", `${project.slug}.html`),
                    withPageMeta(html, {
                        title: `${project.title} | ${NAME}`,
                        description: project.summary,
                        url: `${SITE_URL}/projects/${project.slug}`,
                    }),
                );
            }

            const today = new Date().toISOString().slice(0, 10);
            const urls = [`${SITE_URL}/`, ...projects.map((project) => `${SITE_URL}/projects/${project.slug}`)];
            const sitemap = [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                ...urls.map((url) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>`),
                "</urlset>",
                "",
            ].join("\n");

            writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);
            writeFileSync(resolve(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

            if (projects.length === 0) this.warn("seo-pages: no projects found in projects.ts");
        },
    };
}

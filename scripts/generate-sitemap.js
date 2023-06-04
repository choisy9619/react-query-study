const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
    const DOMAIN = 'https://test.com';

    const pages = await globby([
        'src/pages/*.tsx',
        'src/pages/**/*.tsx',
        '!src/pages/_*.tsx',
        '!src/pages/404.tsx',
        '!src/pages/error.tsx',
        '!src/pages/sitemap-dynamic.xml.tsx',
        '!src/pages/admin/*.tsx',
        '!src/pages/admin/**/*.tsx',
        '!src/pages/api/*.tsx',
        '!src/pages/api/**/*.tsx',
        '!src/pages/**/[id].tsx',
        '!src/pages/**/**/[id].tsx',
    ]);

    const getDate = new Date().toISOString();

    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const path = page
                        .replace('src/pages/', '')
                        .replace('.tsx', '');

                    const route =
                        path === 'index'
                            ? ''
                            : `/${path.replace('/index', '')}`;

                    return `
                        <url>
                            <loc>${`${DOMAIN}${route}`}</loc>
                            <lastmod>${getDate}</lastmod>
                        </url>
                         <url>
                            <loc>${`${DOMAIN}/en${route}`}</loc>
                            <lastmod>${getDate}</lastmod>
                        </url>
                    `;
                })
                .join('')}
        </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        parser: 'html',
    });

    fs.writeFileSync('public/sitemap.xml', formatted);
})();

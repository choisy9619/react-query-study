// dynamic sitemap example

// import { NextPageContext } from 'next';
//
// import {
//     APPLY_LIST_API_URL,
//     APPLY_VIEW_URL,
//     APPLY_WRITE_URL,
//     EN,
// } from '@/constants';
// import _company from '@contents/company';
// import { axios } from '@middlewares/api';
// import type { ApplyData } from '@/interfaces';
// import { getDate } from '@/utils';
//
function Sitemap() {
    return <></>;
}

export default Sitemap;
//
// export async function getServerSideProps(ctx: NextPageContext) {
//     if (process.env.DEPLOYMENT_ENV !== process.env.NODE_ENV) {
//         return { props: { result: {} } };
//     }
//
//     const { res } = ctx;
//     const url = _company.domain;
//
//     const createSitemap = (
//         posts: ApplyData[],
//     ) => `<?xml version="1.0" encoding="UTF-8"?>
//         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${posts
//         .map(({ id }) => {
//             return `
//                     <url>
//                         <loc>${`${url}${APPLY_VIEW_URL}/${id}`}</loc>
//                         <lastmod>${getDate}</lastmod>
//                     </url>
//                     <url>
//                         <loc>${`${url}${EN}${APPLY_VIEW_URL}/${id}`}</loc>
//                         <lastmod>${getDate}</lastmod>
//                     </url>
//                     <url>
//                         <loc>${`${url}${APPLY_WRITE_URL}/${id}`}</loc>
//                         <lastmod>${getDate}</lastmod>
//                     </url>
//                     <url>
//                         <loc>${`${url}${EN}${APPLY_WRITE_URL}/${id}`}</loc>
//                         <lastmod>${getDate}</lastmod>
//                     </url>
//                 `;
//         })
//         .join('')}
//         </urlset>
//         `;
//
//     const posts = await axios(APPLY_LIST_API_URL).then(
//         (res) => res?.data?.result?.items,
//     );
//
//     res?.setHeader('Content-Type', 'text/xml');
//     res?.write(createSitemap(posts));
//     res?.end();
//
//     return { props: { result: posts } };
// }

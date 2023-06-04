import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import type { SiteHeadProps } from '@/interfaces';

export default function SiteHead(props: SiteHeadProps) {
    const { title } = props;
    const url = 'https://test.com/';
    const { t } = useTranslation('meta');

    return (
        <Head>
            <title>{!!title ? `${title} | ${t('title')}` : t('title')}</title>
            <meta name="description" content={t('description')} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={t('title')} />
            <meta
                name="og:description"
                property="og:description"
                content={t('description')}
            />
            <meta property="og:site_name" content={t('title')} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content="" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta name="theme-color" content="" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="" />
            <meta name="apple-mobile-web-app-title" content={t('title')} />
            <meta name="robots" content="noindex, follow" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="" />
            <link rel="canonical" href={url} />
        </Head>
    );
}

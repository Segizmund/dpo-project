import { Head } from '@inertiajs/react';

const SeoTags = ({ seo }) => {
    const defaultTitle = 'Дополнительное профессиональное образование';
    const defaultDesc = 'Курсы программирования, дизайна и педагогики.';
    
    return (
        <Head>
            <title>{seo?.title ? `${seo.title} | ${defaultTitle}` : defaultTitle}</title>
            <meta name="description" content={seo?.description || defaultDesc} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo?.title || defaultTitle} />
            <meta property="og:description" content={seo?.description || defaultDesc} />
            <meta property="og:url" content={seo?.url || window?.location?.href} />
            <meta property="og:image" content={seo?.image || '/img/og-default.png'} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo?.title || defaultTitle} />
            <meta name="twitter:description" content={seo?.description || defaultDesc} />
        </Head>
    );
};

export default SeoTags;
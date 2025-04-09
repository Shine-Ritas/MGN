import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://www.radian-manga.me' });

const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/manga', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  // Add more routes here
];

urls.forEach((url) => sitemap.write(url));
sitemap.end();

streamToPromise(sitemap).then(() => {
  console.log('✅ Sitemap created at public/sitemap.xml');
}).catch((err) => {
  console.error('❌ Error generating sitemap:', err);
});

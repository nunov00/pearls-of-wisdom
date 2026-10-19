import { defineConfig } from 'astro/config';
const origin = process.env.SITE_URL;
if (process.env.RELEASE === '1' && !origin) throw new Error('SITE_URL is required for release');
export default defineConfig({ output: 'static', ...(origin ? {site: origin} : {}), build: {inlineStylesheets:'never'} });

const path = require('path');
const fs = require('fs');

let ROOT = process.env.PWD;

if (!ROOT) {
  ROOT = process.cwd();
}

const config = {
  // Your website's name, used for favicon meta tags
  site_name: 'Gerald',

  site_title: 'Buy Now Pay Later for Essential Household Bills',
  // Your website's description, used for favicon meta tags
  site_description:
    'Get up to $215 to cover your household bills. No credit check. No interest. Buy now pay later for your household bills without fear of overdraft or late fees.',

  // Your website's URL, used for sitemap
  site_url: 'https://joingerald.com',

  // Tracking IDs (leave blank to disable)
  trackers: {
    gtm: process.env.GTMTRACK_ID,
    hotjar: process.env.HOTJARID,
    intercom: process.env.INTERCOM_ID,
    mixpanel: process.env.MIXPANEL_ID,
    segment: process.env.SEGMENT_ID,
    pixel: process.env.PIXEL_ID,
  },

  // Source file for favicon generation. 512x512px recommended.
  favicon: path.join(ROOT, '/src/images/favicon.png'),

  // Local development URL
  dev_host: 'localhost',

  // Local development port
  port: process.env.PORT || 8000,

  // Advanced configuration, edit with caution!
  env: process.env.NODE_ENV,
  root: ROOT,
  paths: {
    config: 'config',
    src: 'src',
    dist: 'dist',
  },
  package: JSON.parse(fs.readFileSync(path.join(ROOT, '/package.json'), { encoding: 'utf-8' })),
};

module.exports = config;

/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const webpack = require('webpack');
const cssnano = require('cssnano');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = require('./site.config');
const { giveScriptInjectorPlugin, Snippets } = require('./plugins/make-script-injector');

const isProdEnvironment = config.env === 'production';
const isProdLikeEnvironment = ['stage', 'production'].includes(config.env);

// Hot module replacement
const hmr = new webpack.HotModuleReplacementPlugin();

// Optimize CSS assets
const optimizeCss = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: cssnano,
  cssProcessorPluginOptions: {
    preset: [
      'default',
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  },
  canPrint: true,
});

// Clean webpack
const clean = new CleanWebpackPlugin();

// Stylelint
// eslint-disable-next-line no-unused-vars
const stylelint = new StyleLintPlugin();

// Extract CSS
const cssExtract = new MiniCssExtractPlugin({
  filename: 'style.[contenthash].css',
});

// HTML generation
const paths = [];
const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html', {}).map((dir) => {
    const filename = path.basename(dir);

    if (filename !== '404.html') {
      paths.push(filename);
    }

    return new HTMLWebpackPlugin({
      filename,
      template: path.join(config.root, config.paths.src, filename),
      meta: {
        viewport: 'width=device-width, initial-scale=1',
        ...(isProdEnvironment ? null : { robots: 'noindex, nofollow, noimageindex, nosnippet' }),
      },
      ...(isProdLikeEnvironment
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : null),
    });
  });

// Favicons
const favicons = new FaviconsWebpackPlugin({
  logo: config.favicon,
  prefix: 'images/favicons/',
  favicons: {
    appName: config.site_name,
    appDescription: config.site_description,
    developerName: null,
    developerURL: null,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      windows: false,
      yandex: false,
    },
  },
});

// Sitemap
const sitemap = new SitemapPlugin({
  base: config.site_url,
  paths,
  options: {
    priority: 1,
  },
});

// Generate robots.txt
const robots = new RobotstxtPlugin({
  sitemap: `${config.site_url}/sitemap.xml`,
  host: config.site_url,
  policy: [
    isProdEnvironment
      ? {
          userAgent: '*',
          allow: '/',
        }
      : {
          userAgent: '*',
          disallow: '/',
        },
  ].filter(Boolean),
});

// Webpack bar
const webpackBar = new WebpackBar({
  color: '#00b766',
});

const injectEnv = giveScriptInjectorPlugin(Snippets.injectEnv(config.env));

// Trackers
const generateTrackerPlugins = () => {
  if (isProdEnvironment) {
    return [
      // Google Tag Manager
      config.trackers.gtm && giveScriptInjectorPlugin(Snippets.gtm(config.trackers.gtm)),
      // Hotjar
      config.trackers.hotjar && giveScriptInjectorPlugin(Snippets.hotjar(config.trackers.hotjar)),
      // Intercom
      config.trackers.intercom && giveScriptInjectorPlugin(Snippets.intercom(config.trackers.intercom)),
      // mixpanel
      config.trackers.mixpanel && giveScriptInjectorPlugin(Snippets.mixpanel(config.trackers.mixpanel)),
      // segment
      config.trackers.segment && giveScriptInjectorPlugin(Snippets.segment(config.trackers.segment)),
      // pixel
      config.trackers.pixel && giveScriptInjectorPlugin(Snippets.pixel(config.trackers.pixel)),
    ].filter(Boolean);
  }

  if (isProdLikeEnvironment) {
    return [
      config.trackers.segment && giveScriptInjectorPlugin(Snippets.segment(config.trackers.segment)),
      config.trackers.pixel && giveScriptInjectorPlugin(Snippets.pixel(config.trackers.pixel)),
    ].filter(Boolean);
  }

  return [];
};

const copyAssets = new CopyPlugin({
  patterns: [
    {
      from: path.join(config.root, config.paths.src, '/public/'),
      to: path.join(config.root, config.paths.dist),
    },
  ],
});

const HEADER = fs.readFileSync(`${__dirname}/header.html`);
const FOOTER = fs.readFileSync(`${__dirname}/footer.html`);

module.exports = [
  clean,
  new InterpolateHtmlPlugin(HTMLWebpackPlugin, {
    SITE_TITLE: config.site_title,
    SITE_DESCRIPTION: config.site_description,
    SITE_NAME: config.site_name,
    HEADER,
    FOOTER,
  }),
  copyAssets,
  // stylelint,
  cssExtract,
  ...generateHTMLPlugins(),

  new HtmlWebpackTagsPlugin({
    links: [
      // <!-- <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" /> -->
      {
        path: 'https://fonts.gstatic.com/',
        publicPath: false,
        attributes: {
          rel: 'preconnect',
          crossorigin: true,
        },
      },
      {
        path: 'https://fonts.gstatic.com/',
        publicPath: false,
        attributes: {
          rel: 'preconnect',
          crossorigin: true,
        },
      },
      {
        path: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
        publicPath: false,
        attributes: {
          rel: 'stylesheet',
        },
      },
      {
        path: 'https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600&display=swap',
        publicPath: false,
        attributes: {
          rel: 'stylesheet',
        },
      },
      {
        path: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
        publicPath: false,
        attributes: {
          rel: 'stylesheet',
        },
      },
    ],
  }),
  injectEnv,
  fs.existsSync(config.favicon) && favicons,
  isProdLikeEnvironment && optimizeCss,
  isProdLikeEnvironment && robots,
  isProdLikeEnvironment && sitemap,
  ...generateTrackerPlugins(),
  webpackBar,
  config.env === 'development' && hmr,
].filter(Boolean);

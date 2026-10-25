// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const appUrl = process.env.APP_URL || 'http://localhost:3000';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OA Duck Documentation',
  tagline: 'Practice with purpose.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: {
      // Avoid the optional SWC HTML native binding on Windows builds.
      swcHtmlMinimizer: false,
    },
  },

  // Set the production url of your site here
  url: process.env.DOCS_SITE_URL || 'http://localhost:3000',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'oa-duck',
  projectName: 'oaduck',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'OA Duck Docs',
        logo: {
          alt: 'OA Duck logo',
          src: 'img/oaduck.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'appSidebar',
            position: 'left',
          label: 'App guide',
          },
          {to: '/overview', label: 'Overview', position: 'left'},
          {to: '/getting-started', label: 'Getting started', position: 'left'},
          {to: '/architecture', label: 'Architecture', position: 'left'},
          {to: '/features', label: 'Features', position: 'left'},
          {to: '/api-reference', label: 'API', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Overview', to: '/overview'},
              {label: 'Getting started', to: '/getting-started'},
              {label: 'Product flow', to: '/product-flow'},
              {label: 'Features', to: '/features'},
              {label: 'Admin guide', to: '/admin-guide'},
            ],
          },
          {
            title: 'Engineering',
            items: [
              {label: 'Architecture', to: '/architecture'},
              {label: 'Data model', to: '/data-model'},
              {label: 'API reference', to: '/api-reference'},
              {label: 'Development', to: '/development'},
            ],
          },
          {
            title: 'App',
            items: [
              {label: 'OA Duck workspace', href: appUrl},
              {label: 'Practice', href: `${appUrl}/practice`},
              {label: 'Question library', href: `${appUrl}/questions`},
            ],
          },
          {
            title: 'Support',
            items: [
              {label: 'Contact the builder', href: 'mailto:hello@oaduck.dev'},
              {label: 'Security notes', to: '/security'},
              {label: 'Testing and debugging', to: '/testing-debugging'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OA Duck. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

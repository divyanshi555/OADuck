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
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

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
        blog: false,
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
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Overview', to: '/overview'},
              {label: 'Technology stack', to: '/technology-stack'},
              {label: 'Architecture', to: '/architecture'},
              {label: 'Project folder structure', to: '/project-structure'},
              {label: 'Database design', to: '/database-design'},
              {label: 'Authentication and authorization', to: '/authentication-authorization'},
              {label: 'API reference', to: '/api-reference'},
              {label: 'Question management', to: '/question-management'},
              {label: 'Assessment and practice engine', to: '/assessment-practice-engine'},
              {label: 'Secure assessment and violations', to: '/secure-assessment-violations'},
              {label: 'Judge0 code execution', to: '/judge0-code-execution'},
              {label: 'Duck Insight', to: '/duck-insight'},
              {label: 'Dashboard and progress tracking', to: '/dashboard-progress'},
              {label: 'Known limitations and future improvements', to: '/limitations-future-improvements'},
              {label: 'Environment variables and configuration', to: '/environment-configuration'},
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

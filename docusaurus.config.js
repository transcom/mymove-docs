const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// These Redirect lists for recently migated pages. These Redirects are here to
// help, but shouldn't be relied on indefinitely as they are client-side only
// and they increase the build time for the project.
const FrontendPages = require('./utils/redirect-frontend');
const ToolsPages    = require('./utils/redirect-tools');
const APIPages      = require('./utils/redirect-api');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MilMove Developer Portal',
  tagline: '',
  url: 'https://transcom.github.io',
  baseUrl: '/mymove-docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'USTransCom',
  projectName: 'mymove-docs',
  themeConfig: {
    navbar: {
      title: 'MilMove.dev',
      logo: {
        alt: 'MilMove Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'about/index',
          position: 'left',
          label: 'About',
        },
        {
            type: 'doc',
            docId: 'frontend/index',
            position: 'left',
            label: 'Frontend',
        },
        {
          type: 'doc',
          docId: 'backend/index',
          position: 'left',
          label: 'Backend',
        },
        {
            type: 'doc',
            docId: 'api/index',
            position: 'left',
            label: 'API',
        },
        {
            type: 'doc',
            docId: 'tools/index',
            position: 'left',
            label: 'Tools',
        },
        {
            type: 'doc',
            docId: 'dev/index',
            position: 'left',
            label: 'Docs',
        },
        {
            type: 'doc',
            docId: 'help/index',
            position: 'left',
            label: 'Help',
        },
        {
          href: 'https://github.com/transcom/mymove',
          label: 'mymove',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'About',
              to: '/docs/about',
            },
            {
              label: 'Getting Started',
              to: '/docs',
            },
            {
              label: 'Help',
              to: '/docs/help',
            },
            {
              label: 'Vault',
              to: '/docs/vault',
            },
            {
              label: 'Docusaurus Tutorial',
              to: '/docs/tutorial',
            },
          ],
        },
        {
          title: 'Contributing',
          items: [
            {
              label: 'Frontend',
              to: '/docs/dev/contributing/frontend',
            },
            {
              label: 'Backend',
              to: '/docs/dev/contributing/backend',
            },
            {
              label: 'Database',
              to: '/docs/dev/contributing/database',
            },
            {
              label: 'Testing',
              to: '/docs/dev/testing',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/transcom/mymove-docs',
            },
            {
              label: 'Docusaurus Official Docs',
              href: 'https://docusaurus.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} United States Transportation Command. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/transcom/mymove-docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            specUrl: 'https://raw.githubusercontent.com/transcom/mymove/master/swagger/prime.yaml',
            routePath: '/api/prime',
          },
          {
            specUrl: 'https://raw.githubusercontent.com/transcom/mymove/master/swagger/support.yaml',
            routePath: '/api/support',
          },
        ],
      }
    ],
  ],
  plugins: [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: (() => {
          let redirects = [];
          redirects.push(FrontendPages);
          redirects.push(ToolsPages);
          redirects.push(APIPages);
          return redirects.flat();
        })(),
      }
    ],
  ],
};

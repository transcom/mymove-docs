const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
            docId: 'dev/index',
            position: 'left',
            label: 'Docs',
        },
        {
            type: 'dropdown',
            position: 'left',
            label: 'APIs',
            items: [
              {
                label: 'Prime',
                to: '/api/prime',
              },
              {
                label: 'Support',
                to: '/api/support',
              },
            ],
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
  ],
};

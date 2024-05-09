const { themes } = require('prism-react-renderer');

// These Redirect lists for recently migated pages. These Redirects are here to
// help, but shouldn't be relied on indefinitely as they are client-side only
// and they increase the build time for the project.
const FrontendPages = require('./utils/redirect-frontend');
const BackendPages = require('./utils/redirect-backend');
const ToolsPages = require('./utils/redirect-tools');
const APIPages = require('./utils/redirect-api');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MilMove Developer Portal',
  tagline: '',
  url: 'https://transcom.github.io',
  baseUrl: '/mymove-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'USTransCom',
  projectName: 'mymove-docs',
  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: 'MilMove Documentation',
      logo: {
        alt: 'MilMove Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'getting-started/index',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'doc',
          docId: '/adrs',
          position: 'left',
          label: 'ADRs',
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
          docId: 'integrations/index',
          position: 'left',
          label: 'Integrations',
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
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Architecture Decision Records',
              to: '/docs/adrs',
            },
          ],
        },
        {
          title: 'Contributing',
          items: [
            {
              label: 'Frontend',
              to: '/docs/frontend',
            },
            {
              label: 'Backend',
              to: '/docs/backend',
            },
            {
              label: 'API',
              to: '/docs/api',
            },
            {
              label: 'Tools',
              to: '/docs/tools',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'MilMove Documentation GitHub',
              href: 'https://github.com/transcom/mymove-docs',
            },
            {
              label: 'MilMove GitHub',
              href: 'https://github.com/transcom/mymove',
            },
            {
              label: 'Docusaurus Official Docs',
              href: 'https://6130eb5cde15830007fdf57b--docusaurus-2.netlify.app/docs',
            },
          ],
        },
      ],
      // Truss contract ends in 2023. Do not show a date that surpasses 2023 that involves Truss.
      copyright: `Copyright ${Math.min(new Date().getFullYear(), 2024)}  U.S. Federal Government.`,
    },
    prism: {
      theme: themes.oceanicNext,
      darkTheme: themes.dracula,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/transcom/mymove-docs/edit/main/',
          remarkPlugins: [require('mdx-mermaid')],
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
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/admin.yaml',
            route: '/api/admin',
          },
          {
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/internal.yaml',
            route: '/api/internal',
          },
          {
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/ghc.yaml',
            route: '/api/ghc',
          },
          // Continue to support existing url for those that have bookmarked this link. We can route this to the oldest supported definition
          {
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/prime.yaml',
            route: '/api/prime',
          },
          {
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/prime.yaml',
            route: '/api/prime/v1',
          },
          {
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/prime_v2.yaml',
            route: '/api/prime/v2',
          },
          {
            spec: 'https://raw.githubusercontent.com/transcom/mymove/main/swagger/support.yaml',
            route: '/api/support',
          },
        ],
      },
    ],
  ],
  themes: [
    '@saucelabs/theme-github-codeblock',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexBlog: false,
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: (() => {
          let redirects = [];
          redirects.push(FrontendPages);
          redirects.push(BackendPages);
          redirects.push(ToolsPages);
          redirects.push(APIPages);
          return redirects.flat();
        })(),
      },
    ],
  ],
};

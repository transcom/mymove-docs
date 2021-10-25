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
            docId: 'frontend/index',
            position: 'left',
            label: 'Frontend',
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
        redirects: [
          {
            to: '/docs/frontend/testing/frontend',
            from: [
              '/docs/dev/contributing/frontend/frontend',
            ],
          },
          {
            to: '/docs/frontend/testing/how-to-run-frontend-test-coverage-reports',
            from: [
              '/docs/dev/testing/running-tests/How-to-run-Frontend-test-coverage-reports',
            ],
          },
          {
            to: '/docs/frontend/testing/unit-test-react-components',
            from: [
              '/docs/dev/testing/writing-tests/unit-test-react-components',
            ],
          },
          {
            to: '/docs/frontend/testing/how-to-view-a-move-or-payment-request-in-the-office-app-as-a-too-or-tio',
            from: [
              '/docs/dev/getting-started/How-to-view-a-move-or-payment-request-in-the-office-app-as-a-TOO-or-TIO',
            ],
          },
          {
            to: '/docs/frontend/testing/writing-frontend-tests-for-milmove',
            from: [
              '/docs/dev/testing/writing-tests/Writing-Frontend-Tests-for-MilMove',
            ],
          },
          {
            to: '/docs/frontend/testing/writing-frontend-tests-enzyme-and-react-testing-library',
            from: [
              '/docs/dev/testing/writing-tests/Writing-Frontend-Tests-Enzyme-and-React-Testing-Library',
            ],
          },
          {
            to: '/docs/frontend/testing/writing-tests-using-react-testing-library-and-jest',
            from: [
              '/docs/dev/testing/writing-tests/Writing-Tests-Using-React-Testing-Library-and-Jest',
            ],
          },
          {
            to: '/docs/frontend/guides/guide-to-implementing-ui',
            from: [
              '/docs/dev/contributing/frontend/Guide-to-Implementing-UI',
            ],
          },
          {
            to: '/docs/frontend/guides/access-swagger-endpoints-from-react',
            from: [
              '/docs/dev/contributing/frontend/access-swagger-endpoints-from-react',
            ],
          },
          {
            to: '/docs/frontend/guides/create-a-form-using-formik',
            from: [
              '/docs/dev/contributing/frontend/Create-a-Form-Using-Formik',
            ],
          },
          {
            to: '/docs/frontend/guides/display-dates-and-times',
            from: [
              '/docs/dev/contributing/frontend/display-dates-and-times',
            ],
          },
          {
            to: '/docs/frontend/guides/store-data-in-redux',
            from: [
              '/docs/dev/contributing/frontend/store-data-in-redux',
            ],
          },
          {
            to: '/docs/frontend/guides/store-ui-state-in-redux',
            from: [
              '/docs/dev/contributing/frontend/store-ui-state-in-redux',
            ],
          },
          {
            to: '/docs/frontend/guides/icons',
            from: [
              '/docs/dev/contributing/frontend/Icons',
            ],
          },
          {
            to: '/docs/frontend/guides/react-forms-using-formik',
            from: [
              '/docs/dev/contributing/frontend/React-forms-using-Formik',
            ],
          },
          {
            to: '/docs/frontend/setup/designers-guide-to-setting-up-app-locally',
            from: [
              '/docs/dev/getting-started/Designers-guide-to-setting-up-app-locally',
            ],
          },
          {
            to: '/docs/frontend/setup/run-storybook',
            from: [
              '/docs/dev/tools/run-storybook',
            ],
          },
          {
            to: '/docs/api/guides/api-errors',
            from: [
              '/docs/dev/contributing/backend/API-Errors',
            ],
          },
          {
            to: '/docs/api/guides/api-programming-guide',
            from: [
              '/docs/dev/contributing/backend/API-Programming-Guide',
            ],
          },
          {
            to: '/docs/api/guides/api-style-guide',
            from: [
              '/docs/dev/contributing/backend/API-Style-Guide',
            ],
          },
          {
            to: '/docs/api/guides/guide-to-creating-an-endpoint',
            from: [
              '/docs/dev/contributing/backend/Guide-to-Creating-an-Endpoint',
            ],
          },
          {
            to: '/docs/api/guides/how-to-deprecate-endpoints',
            from: [
              '/docs/dev/versioning/How-to-deprecate-endpoints',
            ],
          },
          {
            to: '/docs/api/testing/acceptance-testing-prime-api-endpoints',
            from: [
              '/docs/dev/testing/running-tests/Acceptance-Testing-Prime-API-Endpoints',
            ],
          },
          {
            to: '/docs/api/testing/end-to-end-testing-playing-the-prime',
            from: [
              '/docs/dev/testing/running-tests/End-to-End-Testing-Playing-the-Prime',
            ],
          },
          {
            to: '/docs/api/testing/how-to-test-the-prime-api',
            from: [
              '/docs/dev/getting-started/How-to-Test-the-Prime-API',
            ],
          },
          {
            to: '/docs/api/docs/push-notifications-to-prime',
            from: [
              '/docs/dev/contributing/backend/Push-Notifications-to-Prime',
            ],
          },
          {
            to: '/docs/tools/dependabot/manage-dependabot',
            from: [
              '/docs/dev/versioning/manage-dependabot',
            ],
          },
          {
            to: '/docs/tools/dependabot/dependency-update-process-with-dependabot',
            from: [
              '/docs/dev/versioning/Dependency-Update-Process-With-Dependabot',
            ],
          },
        ],
      }
    ],
  ],
};

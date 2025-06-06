/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// Break out the ADR description for the category page to make it easier to
// edit. README: There's not way to include HTML or render this as Markdown, so
// make sure it's plain text.
const adrDesc = `
  For new ADRs, please use the template in the sidebar.

  This list contains all of the architectural decision records for the MilMove
  client and server application.
`;

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  gettingStartedSidebar: [
    {
      type: 'autogenerated',
      dirName: 'getting-started',
    },
  ],
  adrsSidebar: [
    {
      type: 'doc',
      id: 'guides/adrs/README',
    },
    {
      type: 'doc',
      id: 'guides/adrs/template',
    },
    {
      type: 'category',
      label: '📦 Architecture Decision Records',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'MilMove ADRs',
        description: adrDesc,
        slug: '/adrs',
        keywords: ['adrs'],
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'adrs',
        },
      ],
    },
  ],
  frontendSidebar: [
    {
      type: 'autogenerated',
      dirName: 'frontend',
    },
  ],
  backendSidebar: [
    {
      type: 'autogenerated',
      dirName: 'backend',
    },
  ],
  integrationsSidebar: [
    {
      type: 'autogenerated',
      dirName: 'integrations',
    },
  ],
  apiSidebar: [
    'api/index',
    {
      type: 'category',
      label: 'Swagger Documentation',
      items: [
        {
          type: 'link',
          label: 'Admin',
          href: '/api/admin',
        },
        {
          type: 'link',
          label: 'Internal',
          href: '/api/internal',
        },
        {
          type: 'link',
          label: 'GHC',
          href: '/api/ghc',
        },
        {
          type: 'link',
          label: 'Prime V1',
          href: '/api/prime/v1',
        },
        {
          type: 'link',
          label: 'Prime V2',
          href: '/api/prime/v2',
        },
        {
          type: 'link',
          label: 'Prime V3',
          href: '/api/prime/v3',
        },
        {
          type: 'link',
          label: 'Support',
          href: '/api/support',
        },
        {
          type: 'link',
          label: 'PPTAS',
          href: '/api/pptas',
        }
      ],
    },
    {
      type: 'category',
      label: 'Docs',
      items: [
        {
          type: 'link',
          label: 'Prime API Deliverable',
          href: 'https://github.com/transcom/prime_api_deliverable',
        },
        'api/docs/push-notifications-to-prime',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/guides',
        },
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api/testing',
        },
      ],
    },
  ],
  toolsSidebar: [
    'tools/index',
    {
      type: 'category',
      label: 'CI/CD',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/cicd',
        },
      ],
    },
    {
      type: 'category',
      label: 'Dockerfile',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/dockerfile',
        },
      ],
    },
    {
      type: 'category',
      label: 'Docusaurus',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/docusaurus',
        },
      ],
    },
    {
      type: 'category',
      label: 'Feature Flags',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/feature-flags',
        },
      ],
    },
    {
      type: 'category',
      label: 'GitHub',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/github',
        },
      ],
    },
    {
      type: 'category',
      label: 'Locust',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/locust',
        },
      ],
    },
    {
      type: 'category',
      label: 'Mockery',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/mockery',
        },
      ],
    },
    {
      type: 'category',
      label: 'Useful VSCode Tools',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/playwright',
        },
      ],
    },
    {
      type: 'category',
      label: 'Postman',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/postman',
        },
      ],
    },
    {
      type: 'category',
      label: 'SchemaSpy',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/schemaspy',
        },
      ],
    },
    {
      type: 'category',
      label: 'Telemetry',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/telemetry',
        },
      ],
    },
    {
      type: 'category',
      label: 'Logos',
      items: [
        {
          type: 'autogenerated',
          dirName: 'tools/logos',
        },
      ],
    },
  ],
  backendSidebar: [
    {
      type: 'autogenerated',
      dirName: 'backend',
    },
  ],
  helpSidebar: [
    {
      type: 'autogenerated',
      dirName: 'help',
    },
  ],
  vaultSidebar: [
    {
      type: 'autogenerated',
      dirName: 'vault',
    },
  ],
};

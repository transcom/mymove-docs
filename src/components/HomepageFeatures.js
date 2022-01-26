import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import config from '../../docusaurus.config'

const FeatureList = [
  {
    title: 'Uses Markdown for documentation',
    description: (
      <>
        The MilMove Developer Portal uses Markdown for documentation which is
        already widely used for other kinds of project documentation.
      </>
    ),
    callout: (
      <>
        <a href="/mymove-docs/docs/tools/docusaurus/docusaurus"> Read about how
        to contribute to this documentation in our Tools section.</a>
      </>
    ),
  },
  {
    title: 'Focused on developer experience',
    description: (
      <>
        The MilMove Developer Portal lets contributors focus on documentation.
        Docusaurus builds and manages the documentation while giving readers
        the ability to search and integrate other data sources besides
        Markdown.
      </>
    ),
    callout: (
      <>
        <a href="https://github.com/transcom/mymove-docs/actions">
          Checkout the GitHub Actions that power deployment and integrations
          for the MilMove Developer Portal
        </a>
      </>
    ),
  },
  {
    title: 'Powered by Docusaurus',
    description: (
      <>
        Extend or customize your the MilMove Developer Portal layout and
        integrations by using React. Docusaurus can be extended while reusing
        the same header and footer.
      </>
    ),
    callout: (
      <>
        <a href="https://6130eb5cde15830007fdf57b--docusaurus-2.netlify.app/community/resources#community-plugins">
          Here's a list of Community Plugins that work with Docusaurus
          {config.customFields.versionOfDocusaurus}
        </a>
      </>
    ),
  },
];

function Feature({title, description, callout}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{callout}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

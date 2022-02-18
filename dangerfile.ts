import { danger, warn, fail } from 'danger';

const jiraIssue = require('danger-plugin-jira-issue').default;

const githubChecks = () => {
  if (danger.github) {
    if (danger.github.pr.body.length < 10) {
      warn('Please include a description of your PR changes.');
    }
  }
  jiraIssue({
    key: 'MB',
    url: 'https://dp3.atlassian.net/browse',
    location: 'title',
  });
};

const fileChecks = () => {
  const allFiles = danger.git.modified.files.concat(danger.git.created_files);

  const legacyFiles = danger.git.fileMatch('docs/dev/**/*', 'docs/vault/**/*');

  if (legacyFiles.created) {
    fail("Files under docs/dev and/or docs/vault should not be created. Please relocate the documentation to a more appropriate place.");
  }

  if (legacyFiles.modified) {
    warn("Files under docs/dev and/or docs/vault should not be modified. Please relocate the documentation to a more appropriate place.");
  }

  // Request update of yarn.lock if package.json changed but yarn.lock isn't
  const packageChanged = allFiles.includes('package.json');
  const lockfileChanged = allFiles.includes('yarn.lock');
  if (packageChanged && !lockfileChanged) {
    const message = 'Changes were made to package.json, but not to yarn.lock';
    const idea = 'Perhaps you need to run `yarn install`?';
    warn(`${message} - <i>${idea}</i>`);
  }
};

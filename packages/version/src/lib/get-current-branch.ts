import log from 'npmlog';

import { execSync } from '@ws-conventional-version-roller/core';

export function getCurrentBranch(opts, gitDryRun = false) {
  log.silly('currentBranch', '');
  const branch = execSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], opts, gitDryRun);
  log.verbose('currentBranch', branch);

  return gitDryRun ? 'main' : branch;
}

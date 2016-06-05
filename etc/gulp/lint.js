import nodeShell from '../tools/nodeShell';

const LINT_BASE = 'eslint ./**/*.{js,jsx}';
const FIX = ' --fix';

export const lintFix = nodeShell(LINT_BASE + FIX);
export const lint = nodeShell(LINT_BASE);

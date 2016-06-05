import nodeShell from '../tools/nodeShell';

const FIX = ' --fix';
export const lintFix = nodeShell(LINT_BASE + FIX);

const LINT_BASE = 'eslint ./**/*.{js,jsx}';
export default nodeShell(LINT_BASE);

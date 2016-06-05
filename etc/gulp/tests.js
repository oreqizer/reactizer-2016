import nodeShell from '../tools/nodeShell';

export const test = nodeShell('jest --verbose');

export const testCoverage = nodeShell('jest --coverage');
export const testWatch = nodeShell('jest --watch=all');

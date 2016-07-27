import nodeShell from '../tools/nodeShell';

const NATIVE_BASE = 'node node_modules/react-native/local-cli/cli.js';

export const ios = nodeShell(`${NATIVE_BASE} run-ios`, true);
export const android = nodeShell(`${NATIVE_BASE} run-android`, true);
export const native = nodeShell(`${NATIVE_BASE} start`, true);
export const nativeClean = nodeShell(`${NATIVE_BASE} start --reset-cache`, true);

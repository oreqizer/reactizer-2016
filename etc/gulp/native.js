import nodeShell from '../tools/nodeShell';

const NATIVE_BASE = 'node node_modules/react-native/local-cli/cli.js';

export const ios = nodeShell(`${NATIVE_BASE} run-ios`, { raw: true });
export const android = nodeShell(`${NATIVE_BASE} run-android`, { raw: true });
export const native = nodeShell(`${NATIVE_BASE} start`, { raw: true });

export const nativeClean = nodeShell(`${NATIVE_BASE} start --reset-cache`, { raw: true });

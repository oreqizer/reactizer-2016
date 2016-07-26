import { readJsonSync } from 'fs-extra';
import { join } from 'path';

export default function fetchAssetInfo() {
  return readJsonSync(join(__dirname, '../../webpack-assets.json'));
}

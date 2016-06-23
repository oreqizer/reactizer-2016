import fs from 'fs';
import { join } from 'path';

import { output } from '../config';

export default function fetchAssetInfo() {
  const assets = JSON.parse(fs
    .readFileSync(join(__dirname, '../../../', output, 'webpack-assets.json')));

  return assets;
}

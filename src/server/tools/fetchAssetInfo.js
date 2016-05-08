import fs from 'fs';
import { join } from 'path';

export default function () {
  const assets = JSON.parse(fs
    .readFileSync(join(__dirname, '../../../data/webpack-assets.json')));

  return assets;
}

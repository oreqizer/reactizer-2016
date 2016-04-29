import fs from 'fs';
import path from 'path';
import { DATA } from '../../etc/config/env';

export default function () {
  const assets = JSON.parse(fs
      .readFileSync(path.join(__dirname, '../../data/webpack-assets.json')));

  return assets;
}

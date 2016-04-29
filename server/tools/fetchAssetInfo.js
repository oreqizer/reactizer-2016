import fs from 'fs';
import path from 'path';

export default function () {
  const assets = JSON.parse(fs
      .readFileSync(path.join(__dirname, '../../data/webpack-assets.json')));

  return assets;
}

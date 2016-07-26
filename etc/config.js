import { join } from 'path';

const OUTPUTS = {
  TMP: '.tmp',
  DIST: 'dist',
};

const production = process.env.NODE_ENV === 'production';

const output = join(__dirname, '../', production ? OUTPUTS.DIST : OUTPUTS.TMP);

export default {
  production,
  output,
};

import { join } from 'path';

const production = process.env.NODE_ENV === 'production';

const output = join(__dirname, '../', production ? 'dist' : '.tmp');

export default {
  production,
  output,
};

import { join } from 'path';

const production = process.env.NODE_ENV === 'production';

export default {
  production,
  output: join(__dirname, '../', production ? 'dist' : '.tmp'),
};

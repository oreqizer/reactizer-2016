const OUTPUTS = {
  TMP: '.tmp',
  DIST: 'dist',
};

const production = process.env.NODE_ENV === 'production';

const output = production ? OUTPUTS.DIST : OUTPUTS.TMP;

export default {
  production,
  output,
};

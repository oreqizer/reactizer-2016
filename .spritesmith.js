module.exports = {
  src: ['client/assets/sprites/*.{png,gif,jpg}'],
  dest: 'client/assets/images/sprite.png',
  destCss: 'client/css/sprite.styl',
  imgPath: '/images/sprite.png',
  algorithm: 'binary-tree',
  cssFormat: 'stylus',
  cssOpts: {
    variableNameTransforms: ['dasherize']
  },
  padding: 2,
  cssVarMap: function (sprite) {
    sprite.name = `sprite-${sprite.name}`
  }
}

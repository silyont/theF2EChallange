module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/2019-f2e-week1' : '/',

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule.use('html-loader').loader('html-loader')
  },
}

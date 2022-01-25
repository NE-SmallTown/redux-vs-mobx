const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  future: {
    webpack5: true,
  },
  basePath: '/redux-vs-mobx',
  assetPrefix: '/redux-vs-mobx/'
};

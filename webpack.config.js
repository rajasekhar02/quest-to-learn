const TerserPlugin = require('terser-webpack-plugin');
const reactScriptWebpack = require('react-scripts/config/webpack.config');
module.exports = function (webpackEnv) {
  const webpackReactScriptConfigJSON = reactScriptWebpack(webpackEnv);
  return {
    ...webpackReactScriptConfigJSON,
    // output: {
    //   path: `${__dirname}/docs/build`,
    //   publicPath: '/build/',
    // },
  };
};

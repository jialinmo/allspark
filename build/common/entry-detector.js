/**
 * 项目页面打包 
 * @return [html-webpack-plguin]
 * creator jialinmo 2020/03/10
 */
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pageTitleList = {
  'index': '主页',
  'login': '登陆页'
};
const entryDetector = (() => {
  const entry = {};
  let htmlWebpackPlugins = [];

  const entryfiles = glob.sync(path.join(__dirname, '../../src/pages/*/index.js'));
  Object
    .keys(entryfiles)
    .map((index) => {
      const entryfile = entryfiles[index];
      const match = entryfile.match(/src\/pages\/(.*)\/index.js/);
      const pageName = match && match[1];
      entry[pageName] = entryfile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `../../src/pages/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify: {
            html: true,
            collapseWhitespace: false,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
          title: pageTitleList[pageName],
        })
      );
    });
  return {
    entry,
    htmlWebpackPlugins
  }
})();

module.exports = {
  entryDetector,
};
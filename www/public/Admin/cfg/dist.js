'use strict';

let path = require('path'); //nodejs的一個函數。可以獲取當前目錄
let webpack = require('webpack');

let htmlWebpackPlugin = require('html-webpack-plugin'); //引入打包後自動識別並加載打包後的文件的插件
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  //定義打包的入口文件。也可以是數組形式，注意:目前只是把所有文件都打包成一個文件。要打包成不同的文件需要重新配置
  entry: path.join(__dirname, '../src/index.ts'),
  //覆蓋掉base.js全局配置裏面的打包後的目錄和文件名
  output: {
    path: path.join(__dirname, '../dist'), //打包後的目錄地址
    filename: 'assets/bundle-[chunkhash].js', //指定具體目錄加文件名加chunkhash哈希值，注意：這個和hash哈希值不一樣。每次打包會產生一個新的hash哈希值，而這個chunkhash哈希值可以認爲是每個文件的版本號或者MD5加密串，只有當文件修改後，這個字符串才會改變。這個有利於做靜態資源緩存
    // publicPath: defaultSettings.publicPath,     //本來這個路徑是繼承自defaults.js文件裏面的。但是跟我當前的路徑有重疊，所以改了
    publicPath: 'http://www.zblog.cc/public/Admin/dist/', //指定項目正式上線後的路徑
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    //這是加載單個文件的配置。如果有多個文件需要加載配置，這個對象可以創建多份
    new htmlWebpackPlugin({ //配置自動識別並加載打包後的文件名
      template: './src/index.html', //指定我們的原模板文件路徑，因爲在我們的運行環境有個上下的概戀，我們的配置文件是加載在根目錄下運行的，所以這個上下文就是根目錄
      // filename: 'index-[hash].html'    //指定壓縮後的文件名加上哈希值，但是感覺沒什麼實際意義或用處
      filename: 'Index-index.html', //加上Index前綴是爲了配合thinkphp框架模板結構
      inject: 'body', //可以指定生成的腳本是放在hdad下面還是body下面
      // date: new Date(),                //還可以向頁面傳值
      // minify: {                           //當項目要正式上線，使用這個參數對html文件進行壓縮
      //   removeComments: true,             //去掉注釋
      //   collapseWhitespace: true,         //去掉空格，使整個文件一行顯示
      // }
    }),
  ],
  postcss: [ //這個是對應defaults.js文件處理css文件postcss-loader插件的補充(自裝)
    require('autoprefixer')({ //引用autoprefixer這個已經自已安裝好的插件，添加廠商前綴(自裝)
      broswers: ['last 3 versions'] //指定只添加瀏覽器最後(也就是最新)3個版本的前綴
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths, [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
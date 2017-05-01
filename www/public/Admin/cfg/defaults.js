/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 * 資源文件處理
 */
function getDefaultModules() {
  return {
    preLoaders: [{
      test: /\.(js|jsx)$/, //匹配以.js/.jsx結尾的文件
      include: srcPath, //指定需要打包或處理的文件目錄
      loader: 'eslint-loader', //使用eslint-loader插件處理
      exclude: path.resolve(__dirname, 'node_modules'), //注意：這是必須是絕對路徑。指定不需要解析的文件或目錄。比如第三方框架，或者已經解析過的文件，這樣節約時間
    }],
    loaders: [{
      test: /\.css$/, //匹配以.css結尾的文件
      loader: 'style-loader!css-loader!postcss-loader', //處理css的插件，注意這個順序不能亂,postcss-loader用來對css做編譯前的處理。常見的是加廠商前綴等，這個插件還有其它很多好玩的功能，css-loader將css文件當做模塊加載處理。因爲webpack只支持js文件。其它文件類型都要經過插件處理。style-loader讀取css文件並將其加載到頁面中
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    }, {
      test: /\.scss/,
      //outputStyle=expanded,這是設置scss輸出格式。一共有四種格式：expanded默認格式。也就是和平常的css一樣。nested根據嵌套關系。縮進我們的css樣式。compact將所有有關系的類名縮進到一行顯示，這樣可以使我們更關注類名之間的關系。compressed將代碼壓縮成一行顯示。項目上線時會使用的格式
      loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.less/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.styl/,
      loader: 'style-loader!css-loader!stylus-loader'
    }, {
      test: /\.(jpe?g|gif|svg|woff|woff2|eot|ttf)$/i,
      // loader: 'url-loader',
      // query: {
      //   limit: 2,                     //這個參數意思，如果處理的圖片或文件超過這裏指定的大小。就使用url地址引用。如果小於這個值，就把它轉成base64的編碼進行加載
      //   name: '[name]-[hash:5].[ext]'     //指定打包後的文件名，hash:5截取5位哈希值
      // }
      //以數組的形式加載多個loaders
      loaders: [
        'url-loader?limit=1024&name=images/[name]-[hash:5].[ext]',
        // 'image-webpack', //image-webpack壓縮模塊。注意，這個壓縮模塊只適合壓縮png圖片。壓縮其它圖片會報錯。由於webpack的執行順序是從右往左。所以是先壓縮再判斷大小的
      ]
    }, {
      test: /\.png$/i, //本來這個png配置應該是和上面放在一起的。但是因爲下面的image-webpack壓縮模塊，只能壓縮png圖片。其它壓縮爲報錯，然後又嘗試了其它方法，同時壓縮png/jpg圖片的方法，但是都報錯了。後來想想。有其它工具/方法是可以壓縮圖片的，所以沒有必要在這裏糾結。可以把圖片在其它位置壓縮後再上傳也可以
      loaders: [
        'url-loader?limit=1024&name=images/[name]-[hash:5].[ext]',
        'image-webpack', //image-webpack壓縮模塊。注意，這個壓縮模塊只適合壓縮png圖片。壓縮其它圖片會報錯。由於webpack的執行順序是從右往左。所以是先壓縮再判斷大小的
      ]
    }, {
      test: /\.(mp4|ogg|svg)$/,
      loader: 'file-loader'
    }, {
      test: /\.ts?$/,
      loader: 'ts-loader'
    }, {
      test: /\.json$/, //加載json文件
      loader: 'json-loader'
    }]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
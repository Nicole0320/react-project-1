var path = require('path');

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
  // plugins: [
  // new UglifyJSPlugin({
  //   mangle: {
  //     except: ['$super', '$', 'exports', 'require']
  //     //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
  //   },
  //   compress: {
  //     warnings: false
  //   }
  // })
  // ]
};

//注释部分为压缩插件

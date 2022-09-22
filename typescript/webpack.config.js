const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",  // 輸入設置：從哪裏抓檔案來打包
  output: { // 輸出設置
    filename: "bundle.js",  // 打包成什麼檔
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",  // 打包後的路徑：打包檔由 webpack虛擬伺服器暫存，並未真實儲存在路徑上（打開 dist資料夾下是看不到的
  },
  devServer: {  // 好像 webpack 5以上要加的，開伺服器指令也要改用"webpack server"
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  devtool: "inline-source-map", // "inline-source-map":建立.map檔(方便debug)；false:包成最小的檔案(天書)
  module: { // 告訴我什麼檔要打包
    rules: [
      {
        test: /\.ts$/,  // .ts結尾的檔要打包
        use: "ts-loader", // 用"ts-loader"的方式打包
        exclude: /node_modules/,  // 這個不要包
      },
    ],
  },
  resolve: {  // module在 import檔案時，路徑結尾不用寫要什麼檔，告訴我找哪些我一次幫你找
    extensions: [".ts", ".js"],
  },
};

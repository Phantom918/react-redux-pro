const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var buildPath = path.resolve(__dirname, "build");
var nodemodulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: __dirname + "/app/index.js", // 唯一入口文件
    output: {
        path: __dirname + "/build", // 打包后文件存放的地方
        filename: "bundle.js" // 打包后的文件名称
        //filename: "bundle[name]-[hash].js" // name hash 缓存
    },
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./build", // 本地服务器要加载页面所在的目录
        stats: { colors: true }, //终端中输出结果为彩色
        port: 8080, // 监听端口，默认也是8080
        inline: true, // 实时刷新
        historyApiFallback: true, // 不跳转
        hot: true
    },
    module: {
        rules: [{
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }],
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(), // 压缩js代码
        new ExtractTextPlugin("style.css")//分离CSS和JS文件
        //new ExtractTextPlugin("style-[name]-[hash].css")//分离CSS和JS文件
    ],

}
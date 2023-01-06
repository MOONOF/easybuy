const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    // open: true,
    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    },

    devServer: {
        open: true,          // 启动服务自动打开浏览器
        host: 'localhost',      //本地服务器的域名(vue项目的域名)
        port: 8080,             //本地服务器的端口(vue项目的端口)
        proxy: {
            "/api": {                       // 自定义字段
                target: 'http://localhost:5000',      //目标服务器的端口(后端服务器)
                changeOrigin: true,           //是否需要替换路径
                pathRewrite: {
                    "^/api": ""              // 自定义字段替换值
                }
            }
        }
    }


}
var path = require('path');
export default {
    proxy: {
        '/api': {
            target: 'http://47.100.79.170/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    },
    disableCSSModules: true,
    extraBabelPlugins: [
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": "css" }]
    ]
}

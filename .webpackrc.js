var path = require('path');
export default {
    proxy: {
        '/api': {
            target: 'http://seapeng.com/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    },
    disableCSSModules: false,
    extraBabelPlugins: [
        ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": "css" }]
    ]
}

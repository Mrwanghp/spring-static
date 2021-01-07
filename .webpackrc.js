var path = require("path");
export default {
  proxy: {
    "/api": {
      target: "http://seapeng.com/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  // env: {
  //   development: {
  //     extraBabelPlugins: ["dva-hmr"],
  //   },
  // },
  disableCSSModules: false,
  extraBabelPlugins: [
    [
      "import",
      { libraryName: "antd-mobile", libraryDirectory: "es", style: "css" },
    ],
  ],
  //   ignoreMomentLocale: true,
  //   disableDynamicImport: true,
  //   publicPath: '/',
  //   hash: true,
  //   commons: [
  //     {
  //       names: [
  //         'antd-mobile',
  //         'components',
  //         'pages'
  //       ],
  //       minChunks: Infinity
  //     }
  //   ],
};

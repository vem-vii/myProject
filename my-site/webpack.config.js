const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "production") {
    module.exports = {
        plugins: [new BundleAnalyzerPlugin()],
        // externals: {
        //     devtool: "none",
        //     // 使用cdn上的资源不对本地下列进行打包
        //     vue: "Vue",
        //     vuex: "Vuex",
        //     "vue-router": "VueRouter",
        //     axios: "axios",
        // },
    };
} else {
    module.exports = {};
}
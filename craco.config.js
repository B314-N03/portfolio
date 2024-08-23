const cracoConfig = {
    webpack: {
        configure: (webpackConfig) => {
            // Remove source-map-loader entirely
            webpackConfig.module.rules = webpackConfig.module.rules.filter(
                (rule) => !(rule.use && rule.use.some((loader) => loader.loader && loader.loader.includes('source-map-loader')))
            );

            return webpackConfig;
        },
    },
};

module.exports = cracoConfig;

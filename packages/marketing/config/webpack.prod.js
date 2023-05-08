const { merge } = require('webpack-merge');
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const productConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/marketing/latest/'
    },
    plugins: [
        new ModuleFederation({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/boostrap'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, productConfig);

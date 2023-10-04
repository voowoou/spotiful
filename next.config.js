const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['@'] = path.resolve(__dirname); // Добавляем алиас '@' как корневую папку проекта

    return config;
  },
};

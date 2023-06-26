const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: false,
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(webm|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      }
    );

    return config;
  },
};

module.exports = nextConfig;

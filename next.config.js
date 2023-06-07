const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp4$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/videos/',
          publicPath: '/_next/static/videos/',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;

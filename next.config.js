const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withBundleAnalyzer], {
  experimental: {
    optimizePackageImports: [
      '@material-ui/core',
      '@material-ui/icons',
      '@legion-ui/core',
      '@legion-ui/dates',
    ],
  },
  transpilePackages: ['crypsi.js'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://*.neucentrix.co.id https://*.telkom.co.id https://*.mycarrier.co.id;",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Expect-CT",
            value: "max-age=86400, enforce",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: [
      'minio-assurance.telkomdigitalsolution.co',
      'minio-assurance-staging.telkomdigitalsolution.co',
      'storage-assurance-dev.mytens.id',
      'storage-assurance-staging.mytens.id',
      'i.ibb.co',
      's3.ap-southeast-3.amazonaws.com',
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        });
        return config;
    },
    async headers() {
        return [
          {
            source: "/api/:path*", // Apply to all API routes
            headers: [
              {
                key: "Access-Control-Allow-Credentials",
                value: "true",
              },
              {
                key: "Access-Control-Allow-Origin",
                value: "*", // You can restrict to a specific origin here if needed
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS", // Added OPTIONS for preflight requests
              },
              {
                key: "Access-Control-Allow-Headers",
                value:
                  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            ],
          },
        ];
      },
};

export default nextConfig;

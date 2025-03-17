const withNextIntl = require('next-intl/plugin')('./public/i18n/index.ts')

const isProd = process.env.NEXT_PUBLIC_ENV === "prod";
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['pdfjs-dist', 'react-pdf'],
    compiler: {
        // 生产环境移除 console.log
        removeConsole: isProd,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals = [...config.externals, 'canvas'];
        }
        return config;
    },
    // images: {
    //     domains: ["",""],
    // },
}

module.exports = withNextIntl(nextConfig)

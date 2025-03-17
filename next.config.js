const withNextIntl = require('next-intl/plugin')('./public/i18n/index.ts')

const isProd = process.env.NEXT_PUBLIC_ENV === "prod";
/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // 生产环境移除 console.log
        removeConsole: isProd,
    },
    // images: {
    //     domains: ["",""],
    // },
}

module.exports = withNextIntl(nextConfig)

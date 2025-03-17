/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: true, // 是否生成 robots.txt
    // 可选配置项，如更改输出文件路径、优先级、频率等
};
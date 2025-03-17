// header
export const languages = [
    {key: "en", label: "🇺🇸 English"},
    {key: "zh", label: "🇨🇳 中文简体"},
    {key: "tc", label: "🇨🇳 繁體中文"},
    {key: "ja", label: "🇯🇵 日本語"},
];

// h5-header
export const drawerLang = [
    {name: "🇺🇸 English", href: "#", lang: "en", setLang: true},
    {name: "🇨🇳 中文简体", href: "#", lang: "zh", setLang: true},
    {name: "🇨🇳 繁體中文", href: "#", lang: "tc", setLang: true},
    {name: "🇯🇵 日本語", href: "#", lang: "ja", setLang: true},
]

// pages
export type Locale = "zh" | "tc" | "en" | "ja";

// middleware.ts
export const locales = ['en', 'zh', 'tc', 'ja']
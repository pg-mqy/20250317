// middleware.ts
import createMiddleware from 'next-intl/middleware'
import {locales} from "@/app/shared/constans/languages";

const defaultLocale = 'en'

export default createMiddleware({
    locales,
    defaultLocale, // 保持固定默认值
    localePrefix: 'always'
})

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}
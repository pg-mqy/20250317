import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import {locales} from "@/app/shared/constans/languages";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale
    if (!locale || !locales.includes(locale)) notFound()

    return {
        locale,
        messages: (await import(`./${locale}.json`)).default
    }
})

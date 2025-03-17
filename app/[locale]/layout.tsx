import '../globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {Locale} from "@/app/shared/constans/languages";
import 'antd/dist/reset.css';

export const metadata = {
    title: 'Rotate Editor',
    description: 'A powerful editor with rotation capabilities.',
    icons: {
        icon: '/favicon.ico',
    },
    keywords: ['editor', 'rotate editor', 'text editing', 'image rotation'],
    openGraph: {
        title: 'Rotate Editor - The Ultimate Rotation Tool',
        description: 'Easily rotate text and images with precision.',
        url: 'https://vercel.com/paojiaos-projects/20250317',
        type: 'website',
        images: [
            {
                url: '/favicon.ico',
                width: 1200,
                height: 630,
                alt: 'Rotate Editor Preview',
            }
        ]
    },
}


export default async function RootLayout({children, params: {locale}}: {
    children: React.ReactNode
    params: { locale: Locale }
}) {

    // 加载语言文件
    let messages
    try {
        messages = (await import(`../../public/i18n/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <html lang={locale}>
        <body className="bg-light text-dark dark:bg-dark dark:text-light">
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="Asia/Shanghai"
        >
            <Navbar/>
            <div>{children}</div>
            <Footer/>
        </NextIntlClientProvider>
        </body>
        </html>
    )
}

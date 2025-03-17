import '../globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {Locale} from "@/app/shared/constans/languages";
import 'antd/dist/reset.css';

export const metadata = {
    title: 'Rotate Editor',
    description: 'Rotate Editor',
    icons: {
        icon: '/favicon.ico',
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

import Link from "next/link";
import {useTranslations} from "next-intl";

export default function NotFound() {
    const t = useTranslations("404");
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="px-5 py-16 md:px-10 md:py-20">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
                        alt="" className="mx-auto rounded-full mb-8 inline-block h-56 w-56 flex-none object-cover"/>
                    <h1 className="mb-4 text-4xl font-bold md:text-6xl">404</h1>
                    <Link href="/"
                          className="inline-block items-center rounded-md bg-black px-8 py-4 text-center font-semibold">
                        {t('404_title')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

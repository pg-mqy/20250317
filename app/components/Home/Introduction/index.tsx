import {useTranslations} from "next-intl";

export function Introduction() {
    const t = useTranslations("Home");
    return (
        <div className="mx-auto w-full max-w-7xl pt-24">
            <div className="flex flex-col items-center">
                <h2 className="text-center text-3xl font-bold md:text-5xl">
                    {t("Introduction_title")}
                </h2>
                <p className="text-center text-sm text-gray-500 sm:text-base">
                    {t("Introduction_description")}
                </p>
            </div>
        </div>
    );
}


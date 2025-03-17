import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { useLocale } from 'next-intl';
import Image from "next/image";
import {drawerLang} from "@/app/shared/constans/languages";
import SwitchTheme from "@/app/components/SwitchTheme";

interface MenuItem {
    name: string;
    href: string;
    iconSrc?: string;
    externalSite?: boolean;
    lang?: string;
    setLang?: boolean;
}

interface NavItem {
    name: string;
    href: string;
    subItems: MenuItem[];
    externalSite?: boolean;
}

const navigation: NavItem[] = [
    {
        name: "Language",
        href: "#",
        subItems: drawerLang
    },
];

const MenuItem = ({ item }: { item: NavItem }) => {

    const locale = useLocale();
    const t = useTranslations('Header');
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        // 修改条件判断，使用更精确的匹配
        if (item.subItems.length > 0) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
        }
    };

    const getNewPath = (locale: string) => {
        const pathSegments = pathname.split('/')
        pathSegments[1] = locale
        return pathSegments.join('/')
    };

    return (
        <div className="border-b border-white/10">
            <div
                onClick={handleClick}
                className="flex items-center justify-between p-4 cursor-pointer group hover:bg-white/5 transition-colors"
            >
                <div className="flex-1">
                    {item.externalSite ? (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 group-hover:text-white transition-colors block w-full"
                        >
                            {t(`${item.name}`)}
                        </a>
                    ) : (
                        item.subItems.length > 0 ? (
                            <span className={"text-white/80 group-hover:text-white transition-colors block w-full"}>
                                {t(`${item.name}`)}
                            </span>
                        ) : (
                            <Link href={item.href} className="text-white/80 group-hover:text-white transition-colors block w-full">
                                {t(`${item.name}`)}
                            </Link>
                        )
                    )}
                </div>
                {/*{item.subItems.length > 0 && (*/}
                {/*    <ChevronDownIcon*/}
                {/*        className={`w-5 h-5 text-white/60 transition-transform duration-200 group-hover:text-white*/}
                {/*            ${isOpen ? 'rotate-180' : 'rotate-0'}`}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
            {item.subItems.length > 0 && (
                <div className={`overflow-hidden transition-all duration-200 ease-in-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 py-2 bg-white/5">
                        {item.subItems.map((subItem, index) => (
                            <div key={index} className="py-3">
                                {subItem.setLang ? (
                                    <a
                                        href={getNewPath(subItem.lang as string)}
                                        className="block"
                                    >
                                        <div className={`${subItem.lang === locale ? 'text-lightblue' : 'bg-blue-500 text-white/70 hover:text-white transition-colors'}`}>{subItem.name}</div>
                                    </a>
                                ) : subItem.externalSite ? (
                                    <a
                                        href={subItem.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                                    >
                                        <span>{t(`${subItem.name}`)}</span>
                                    </a>
                                ) : (
                                    <Link
                                        href={subItem.href}
                                        className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                                    >
                                        <span className="flex items-center">
                                            {subItem.iconSrc && <Image className="mr-2" src={subItem.iconSrc} alt={item.name} width={24} height={24} />}
                                            {t(`${subItem.name}`)}
                                        </span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const DrawerData = () => {
    return (
        <div className="flex flex-col">
            {navigation.map((item, index) => (
                <MenuItem key={index} item={item} />
            ))}
        </div>
    );
};

export default DrawerData;

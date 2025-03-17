'use client';
import React from 'react';
import {Popover} from 'antd';
import {languages} from "@/app/shared/constans/languages";
import {useLocale} from "next-intl";
import {usePathname} from "next/navigation";
import {GlobalOutlined} from '@ant-design/icons';

const SwitchLanguages = () => {
    const locale = useLocale();
    const pathname = usePathname();

    const getNewPath = (locale: string) => {
        const pathSegments = pathname.split('/');
        pathSegments[1] = locale;
        return pathSegments.join('/');
    };

    const content = (
        <div className="text-center">
            {languages.map(({key, label}) => (
                <div
                    key={key}
                    onClick={() => window.location.href = getNewPath(key)}
                    className={`block py-2 px-3 ${key === locale ? 'text-lightblue' : 'bg-blue-500'} rounded hover:bg-white/10 cursor-pointer`}
                >
                    <div>{label}</div>
                </div>
            ))}
        </div>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            placement="bottom"
        >
            <GlobalOutlined className='w-6 h-6 cursor-pointer text-2xl'/>
        </Popover>
    );
};

export default SwitchLanguages;

'use client';
import React, {useState, useEffect} from 'react';
import {MoonOutlined, SunOutlined} from "@ant-design/icons";

const SwitchTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <div className='cursor-pointer' onClick={toggleTheme}>
            {isDarkMode ?
                <SunOutlined className='w-6 h-6 cursor-pointer text-2xl'/>
                :
                <MoonOutlined className='w-6 h-6 cursor-pointer text-2xl'/>
            }
        </div>
    );
};

export default SwitchTheme;

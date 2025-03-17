import React, {ReactNode, useEffect} from "react";

import Link from "next/link";
import {CloseOutlined} from "@ant-design/icons";
import SwitchTheme from "@/app/components/SwitchTheme";
import Image from "next/image";

interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({children, isOpen = false, setIsOpen}: DrawerProps) => {
    useEffect(() => {
        return () => {
            if (isOpen) setIsOpen(false);
        };
    }, []);

    return (
        <main
            className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out w-full
                ${isOpen
                ? "transition-opacity opacity-100 duration-500 translate-x-0 pointer-events-auto"
                : "transition-all delay-500 opacity-0 translate-x-full pointer-events-none"}`}
        >
            <section
                className={`w-340px max-w-sm right-0 absolute bg-light dark:bg-dark h-screen shadow-xl 
                    transition-all duration-500 ease-in-out transform w-full
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <article className="relative w-340px max-w-lg pb-10 flex flex-col space-y-6 h-full">
                    <header className="px-4 py-4 flex items-center justify-between">
                        <div className="flex flex-shrink-0 items-center gap-4 text-2xl">
                            <Link href={'/'}>
                                <Image src='/logo.svg' alt='logo' width={60} height={60}/>
                            </Link>
                            <Link href={'/'}>
                                Rotate PDF
                            </Link>
                        </div>
                        <CloseOutlined className="cursor-pointer text-2xl" onClick={() => setIsOpen(false)}/>
                    </header>
                    <div>
                        {children}
                    </div>
                </article>
            </section>
            <section
                className="w-screen h-full cursor-pointer"
                onClick={() => setIsOpen(false)}
            ></section>
        </main>
    );
}

export default Drawer;

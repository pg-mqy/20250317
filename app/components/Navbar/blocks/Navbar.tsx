import React, {useEffect} from 'react';
import Drawer from "./Drawer";
import DrawerData from "./DrawerData";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SwitchTheme from "@/app/components/SwitchTheme";
import SwitchLanguages from "@/app/components/SwitchLanguages";
import {AlignRightOutlined} from "@ant-design/icons";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);


    return (
        <div className="mx-auto p-3 md:p-4 lg:px-8 navbar bg-light dark:bg-dark">
            <div className="relative flex h-12 sm:h-20 items-center">
                <div className="flex flex-1 items-center justify-between">
                    {/* LOGO */}
                    <div className="flex flex-shrink-0 items-center gap-8 text-2xl">
                        <Link href={'/'}>
                            <Image src='/logo.svg' alt='logo' width={60} height={60}/>
                        </Link>
                    </div>
                    <div className='hidden lg:flex items-center gap-8'>
                        <SwitchTheme/>
                        <SwitchLanguages/>
                    </div>

                    {/* Mobile menu button */}
                    <div className='block cursor-pointer lg:hidden'>
                        <AlignRightOutlined className="text-2xl" aria-hidden="true" onClick={() => setIsOpen(true)}/>
                    </div>

                    {/* Mobile menu drawer */}
                    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                        <DrawerData/>
                    </Drawer>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

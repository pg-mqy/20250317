const Footer = () => {
    const menuLinks = ["About", "Features", "Works", "Support", "Help"];
    const socialIcons = [
        "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945b4ae6cf7b_Vector-1.svg",
        "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945560e6cf77_Vector.svg",
        "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a940535e6cf7a_Vector-3.svg",
        "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9433a9e6cf88_Vector-2.svg",
    ];

    return (
        <footer className="block">
            <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
                <div className="flex flex-col items-center">
                    {/* Logo */}
                    <a href="#" className="mb-8 inline-block text-black">
                        <img src="/logo.svg" alt="Logo" className="inline-block max-h-24" />
                    </a>

                    {/* Menu Links */}
                    <div className="text-center font-semibold">
                        {menuLinks.map((link, index) => (
                            <FooterLink key={index} label={link} />
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mb-8 mt-8 border-b border-gray-300 w-48"></div>

                    {/* Social Icons */}
                    <div className="mb-12 grid grid-cols-4 gap-8 max-w-52 mx-auto">
                        {socialIcons.map((icon, index) => (
                            <SocialIcon key={index} icon={icon} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterLink = ({ label }: { label: string }) => (
    <a href="#" className="inline-block px-6 py-2 font-normal text-black transition hover:text-blue-600">
        {label}
    </a>
);

const SocialIcon = ({ icon }: { icon: string }) => (
    <a href="#" className="mx-auto flex flex-col items-center justify-center text-black">
        <img src={icon} alt="Social Icon" className="inline-block" />
    </a>
);

export default Footer;

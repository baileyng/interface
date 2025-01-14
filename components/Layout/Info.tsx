import ImgAvatar from "assets/images/avatar.png";
import ICChevronDown from "assets/svg/chevron-down.svg";
import ICChevronRight from "assets/svg/chevron-right.svg";
import ICChevronLeft from "assets/svg/chevron-left.svg";
import ICDrop from "assets/svg/drop.svg";
import ICMoon from "assets/svg/moon.svg";
import ICSearch from "assets/svg/search.svg";
import ICSun from "assets/svg/sun.svg";
import ICStake from "assets/svg/stake.svg";
import ICToken from "assets/svg/token.svg";
import ICHomeTrendUp from "assets/svg/home-trend-up.svg";
import AddressMenu from "components/AddressMenu";
import Input from "components/Input";
import { useScreenSize } from "hooks/useScreenSize";
import Image from "components/Image";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import ImgLogo from "public/images/m-logo.png";
import React, { useCallback, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Avatar from "components/Avatar";
type NavLinkProps = {
    active: boolean;
    collapsed?: boolean;
    name: string;
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
} & LinkProps;
const SwitchThemeBtn = () => {
    const [dark, setDark] = useState(true);
    return (
        <button
            role="switch"
            aria-checked={dark}
            className="relative w-20 flex items-center mt-[1.125rem] mb-3"
            onClick={() => setDark((val) => !val)}
        >
            <svg
                // width="80"
                // height="27"
                viewBox="0 0 80 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13 27H67L80 13.4415L67 0H13L0 13.4415L13 27Z"
                    fill="#7B61FF"
                    fillOpacity="0.2"
                />
            </svg>
            <div className="absolute w-6 h-6 left-3 flex items-center justify-center">
                <div
                    className="absolute w-full h-full rotate-45 bg-ash-purple-500"
                    style={{
                        boxShadow: "0px 4px 20px #7B61FF",
                        opacity: dark ? "1" : "0",
                    }}
                ></div>
                <ICMoon
                    className={`relative w-3.5 h-3.5 ${
                        dark ? "text-white" : "text-ash-purple-500"
                    }`}
                />
            </div>
            <div className="absolute w-6 h-6 right-3 flex items-center justify-center">
                <div
                    className="absolute w-full h-full rotate-45 bg-ash-purple-500"
                    style={{
                        boxShadow: "0px 4px 20px #7B61FF",
                        opacity: !dark ? "1" : "0",
                    }}
                ></div>
                <ICSun
                    className={`relative w-3.5 h-3.5 ${
                        !dark ? "text-white" : "text-ash-purple-500"
                    }`}
                />
            </div>
        </button>
    );
};
const NavLink = ({
    active,
    collapsed,
    name,
    Icon,
    ...linkProps
}: NavLinkProps) => {
    return (
        <Link {...linkProps}>
            <a>
                <div
                    className={`flex items-center relative py-3 font-bold text-sm ${
                        active ? "text-white" : "text-ash-gray-500"
                    } ${collapsed ? "pr-4 justify-center" : ""}`}
                >
                    <Icon
                        className={`inline w-5 h-5 ${
                            active ? "text-pink-600" : ""
                        }`}
                    />
                    {!collapsed && <span className="ml-4">{name}</span>}
                    <span
                        className={`w-0.5 h-5 absolute right-0 ${
                            active ? "bg-pink-600" : "bg-transparent"
                        }`}
                    ></span>
                </div>
            </a>
        </Link>
    );
};
const MNavLink = ({ active, name, Icon, ...linkProps }: NavLinkProps) => {
    return (
        <li className={`flex-1`}>
            <Link {...linkProps}>
                <a>
                    <div
                        className={`h-[4.5rem] flex flex-col items-center justify-center text-center
                                    ${
                                        active
                                            ? "text-white"
                                            : "text-ash-gray-500"
                                    }`}
                    >
                        <Icon
                            className={`w-5 h-5 mb-1 ${
                                active ? "text-pink-600" : ""
                            }`}
                        />
                        <div className="font-bold text-2xs">{name}</div>
                    </div>
                </a>
            </Link>
        </li>
    );
};
function InfoLayout({ children }: any) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const screenSizes = useScreenSize();
    const router = useRouter();

    const isActive = useCallback(
        (path: string, exact = false) =>
            exact ? router.pathname === path : router.route.startsWith(path),
        [router]
    );
    useEffect(() => {
        setOpenSidebar(screenSizes.lg);
    }, [screenSizes.lg]);
    // desktop
    if (!screenSizes.msm) {
        return (
            <div className="flex overflow-x-hidden">
                <div className="fixed z-10">
                    <Transition
                        show={openSidebar}
                        enter="transition duration-200 ease"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                    >
                        {openSidebar && !screenSizes.lg && (
                            <div
                                className="bg-black/30 fixed inset-0 backdrop-blur-md"
                                onClick={() => setOpenSidebar(false)}
                            ></div>
                        )}
                    </Transition>
                    <aside
                        className={`shrink-0 fixed top-0 left-0 h-screen bg-ash-dark-600 py-9 flex flex-col z-10 transition-all ${
                            openSidebar
                                ? "w-52 xl:w-60 pl-4 xl:pl-12"
                                : "w-18 pl-4"
                        }`}
                    >
                        <button
                            className="absolute right-0 translate-x-2 w-6 h-6 rounded-full flex items-center justify-center bg-ash-dark-500"
                            onClick={() => setOpenSidebar((val) => !val)}
                        >
                            {openSidebar ? (
                                <ICChevronLeft className="w-2 h-2" />
                            ) : (
                                <ICChevronRight className="w-2 h-2" />
                            )}
                        </button>
                        <Link href="/swap">
                            <a>
                                <div
                                    className={`relative shrink-0 mb-5 ${
                                        openSidebar ? "w-14 h-14" : "w-10 h-10"
                                    }`}
                                >
                                    <Image
                                        src={ImgLogo}
                                        alt="ashswap logo"
                                        layout="fill"
                                        objectFit="contain"
                                    ></Image>
                                </div>
                            </a>
                        </Link>
                        <div className="grow overflow-auto">
                            <ul>
                                <li>
                                    <NavLink
                                        href={{ pathname: "/info" }}
                                        name="Overview"
                                        Icon={ICHomeTrendUp}
                                        collapsed={!openSidebar}
                                        active={isActive("/info", true)}
                                    />
                                </li>
                                <li>
                                    <NavLink
                                        href="/info/tokens"
                                        name="Tokens"
                                        Icon={ICToken}
                                        collapsed={!openSidebar}
                                        active={isActive("/info/tokens", false)}
                                    />
                                </li>
                                <li>
                                    <NavLink
                                        href="/info/pools"
                                        name="Pools"
                                        Icon={ICDrop}
                                        collapsed={!openSidebar}
                                        active={isActive("/info/pools", false)}
                                    />
                                </li>
                                <li>
                                    <NavLink
                                        href="/info/stake"
                                        name="Stake"
                                        Icon={ICStake}
                                        collapsed={!openSidebar}
                                        active={isActive("/info/stake", false)}
                                    />
                                </li>
                                {/* <li>
                                <NavLink
                                    href="/info/wallet"
                                    name="Wallets"
                                    Icon={ICWallet}
                                    active={isActive("/info/wallet", false)}
                                />
                            </li> */}
                                {/* <li>
                                <NavLink
                                    href="/info/transactions"
                                    name="Trans"
                                    Icon={ICRepeat}
                                    active={isActive(
                                        "/info/transactions",
                                        true
                                    )}
                                />
                            </li> */}
                            </ul>
                        </div>
                        {/* <div className="shrink-0 flex flex-col space-y-2">
                        <div className="text-ash-gray-500 text-xs mb-8">
                            <span className="inline-block rounded-full bg-ash-green-500 w-2 h-2 mr-2"></span>
                            <span>Updated 4 mins ago</span>
                        </div>
                        <div className="text-ash-gray-500 text-xs">
                            Trans count (24H): 77,312
                        </div>
                        <div className="text-ash-gray-500 text-xs">
                            Fees (24H): $1,52M
                        </div>
                        <div className="text-ash-gray-500 text-xs">
                            Wallet count (24H): 21
                        </div>
                    </div> */}
                    </aside>
                </div>

                <div
                    className={`grow px-4 lg:px-9 lg:py-6 relative overflow-x-hidden mr-32 ${
                        openSidebar ? "ml-18 lg:ml-52 xl:ml-60" : "ml-18"
                    }`}
                >
                    {/* <div className="fixed top-6 right-[10.25rem] z-20">
                        <Input
                            backgroundClassName="bg-ash-dark-700/70 h-12 px-5"
                            className="text-white text-2xs"
                            suffix={<ICSearch />}
                            placeholder="Search token, pair"
                        />
                    </div> */}
                    {children}
                </div>
                <aside className="shrink-0 fixed top-0 right-0 h-screen overflow-auto w-32 bg-ash-dark-600 px-4 py-6 text-white">
                    <div className="bg-ash-dark-400 p-2 flex flex-col mb-4">
                        {/* <Image
                            src={ImgAvatar}
                            alt="avatar"
                            width={32}
                            height={32}
                        />
                        
                        <div className="mt-2 flex items-center justify-between font-bold text-xs w-full">
                            <span>4a51...PHFA</span>
                            <ICChevronDown className="inline w-2 h-2" />
                        </div> */}
                        <AddressMenu
                            connectBtn={(connect) => {
                                return (
                                    <button
                                        className="text-xs w-full py-2 font-bold text-white"
                                        onClick={() => connect()}
                                    >
                                        Connect
                                    </button>
                                );
                            }}
                            dropdownBtn={(address, setMDrawer) => {
                                return (
                                    <button
                                        className="flex flex-col items-center"
                                        onClick={() =>
                                            screenSizes.isMobile &&
                                            setMDrawer(true)
                                        }
                                    >
                                        <Avatar
                                            src={ImgAvatar}
                                            alt="avatar"
                                            className="w-8 h-8"
                                        />

                                        <div className="mt-2 flex items-center justify-between font-bold text-xs w-full">
                                            <span className="mr-2">
                                                {address?.slice(0, 4) +
                                                    "..." +
                                                    address?.slice(
                                                        address.length - 4
                                                    )}
                                            </span>
                                            <ICChevronDown className="inline w-2 h-2" />
                                        </div>
                                    </button>
                                );
                            }}
                        />

                        {/* <SwitchThemeBtn /> */}
                    </div>
                    {/* <button className="bg-ash-dark-400 h-10 w-full flex items-center justify-center">
                        <ICStar className="inline text-[#FFC10D] w-4 h-4 mr-3" />
                        <span className="text-xs font-bold">Saved</span>
                    </button> */}
                </aside>
            </div>
        );
    }
    // mobile
    return (
        <div>
            <header className="sticky top-0 left-0 right-0 z-20 w-full h-[4.5rem] flex items-center justify-between px-6 text-white bg-ash-dark-400">
                <div className="mr-5 shrink-0">
                    <Link href="/swap">
                        <a>
                            <Image
                                src={ImgLogo}
                                alt="ash logo"
                                width={28}
                                height={42}
                            />
                        </a>
                    </Link>
                </div>
                <div className="grow flex items-center space-x-1 overflow-hidden">
                    <Input
                        backgroundClassName="bg-ash-dark-700/70"
                        className="text-white text-2xs h-10 px-4 grow overflow-hidden"
                        suffix={<ICSearch />}
                        placeholder="Search token, pair"
                        size={5}
                    />
                    {/* <button className="bg-ash-dark-600 h-10 w-24 flex items-center justify-center shrink-0">
                        <ICStar className="inline text-[#FFC10D] w-4 h-4 mr-3" />
                        <span className="text-2xs font-bold">Saved</span>
                    </button> */}
                    <div>
                        <AddressMenu
                            connectBtn={(connect) => {
                                return (
                                    <button
                                        className="text-2xs w-full py-2 px-4 font-bold text-white bg-pink-600 h-10"
                                        onClick={() => connect()}
                                    >
                                        Connect
                                    </button>
                                );
                            }}
                            dropdownBtn={(address, setMDrawer) => {
                                return (
                                    <button
                                        className="flex items-center bg-ash-dark-600 h-10 px-3 shrink-0"
                                        onClick={() =>
                                            screenSizes.isMobile &&
                                            setMDrawer(true)
                                        }
                                    >
                                        <Avatar
                                            src={ImgAvatar}
                                            alt="account avatar"
                                            className="w-3.5 h-3.5"
                                        />
                                        <ICChevronDown className="inline w-2 h-2 ml-2.5" />
                                    </button>
                                );
                            }}
                        />
                    </div>
                </div>
            </header>
            <div className="pb-[4.5rem]">{children}</div>
            <nav className="fixed bottom-0 left-0 right-0 w-full text-white bg-black/40 backdrop-blur-xl">
                <ul className="flex">
                    <MNavLink
                        href={{ pathname: "/info" }}
                        name="Overview"
                        Icon={ICHomeTrendUp}
                        active={isActive("/info", true)}
                    />
                    <MNavLink
                        href="/info/tokens"
                        name="Tokens"
                        Icon={ICToken}
                        active={isActive("/info/tokens", true)}
                    />
                    <MNavLink
                        href="/info/pools"
                        name="Pools"
                        Icon={ICDrop}
                        active={isActive("/info/pools", true)}
                    />
                    <MNavLink
                        href="/info/stake"
                        name="Stake"
                        Icon={ICStake}
                        active={isActive("/info/stake", true)}
                    />
                    {/* <MNavLink
                        href="/info/wallet"
                        name="Wallets"
                        Icon={ICWallet}
                        active={isActive("/info/wallet", true)}
                    />
                    <MNavLink
                        href="/info/transactions"
                        name="Trans"
                        Icon={ICRepeat}
                        active={isActive("/info/transactions", true)}
                    /> */}
                </ul>
            </nav>
        </div>
    );
}

export default InfoLayout;

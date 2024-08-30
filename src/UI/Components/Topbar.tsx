/** eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import "@/UI/Style/sidebar.css";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { FiHelpCircle, FiMenu, FiSettings } from "react-icons/fi";
import Link from "next/link";

const Topbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // state for the sidebar

    return (
        <div>
            {/* Hamburger button (for mobile devices only) */}
            <nav className="md:hidden fixed top-0 right-0 m-4 z-50">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <FiMenu size={24} className="text-white" />
                </button>
            </nav>

            {/* Sidebar that appears from the right */}
            <Sidebar
                collapsed={!isOpen}
                breakPoint="sm"
                toggled={isOpen}
                className={`${!isOpen ? "hidden" : ""}`}
            >
                <Menu>
                    <MenuItem
                        component={<Link href="/support" />}
                        icon={<FiHelpCircle />}
                    >
                        Support
                    </MenuItem>
                    <MenuItem
                        component={<Link href="/settings" />}
                        icon={<FiHelpCircle />}
                    >
                        Settings
                    </MenuItem>
                    <MenuItem
                        component={<Link href="/subscribe" />}
                        icon={<FiHelpCircle />}
                    >
                        Subscribe
                    </MenuItem>
                </Menu>
            </Sidebar>

            {/* Desktop top bar when not on mobile device */}
            <div className="hidden md:flex">
                <div className="fixed top-0 left-0 right-0 bg-[#1B1B1B] p-4">
                    <div className="flex items-center py-3 ml-5">
                        {/* Text of NoteGenius with green background */}
                        <div className="relative flex place-items-center before:absolute before:h-[20px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[20px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-500 after:via-green-600 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-100 after:dark:to-green-900 after:to-green-600 after:dark:opacity-100 before:lg:h-[20px] z-[-1]">
                            <div className="relative text-white text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                                NoteGenius
                            </div>
                        </div>

                        {/* Navigation components inside top bar */}
                        <nav
                            className="hidden md:flex"
                            style={{ marginLeft: "auto" }}
                        >
                            <ul className="flex space-x-4 text-xl underline">
                                <li>
                                    <a
                                        href="/support"
                                        className="text-white px-4 flex"
                                    >
                                        <img
                                            src="/support.png"
                                            alt="Support"
                                            className="h-8 w-8 mr-2 -mt-0.5"
                                        />
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/subscribe"
                                        className="text-white px-4 flex"
                                    >
                                        <img
                                            src="/subscribe.webp"
                                            alt="Subscribe"
                                            className="h-10 w-10 mr-2 -mt-1.5"
                                        />
                                        Subscribe
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/settings"
                                        className="text-white px-4 flex"
                                    >
                                        <img
                                            src="/settings.png"
                                            alt="Settings"
                                            className="h-8 w-8 mr-2 -mt-0.5"
                                        />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;

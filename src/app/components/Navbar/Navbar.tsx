"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../../../public/icons/GHF-LOGO.png";
import Menu from "../../../../public/icons/menu.svg";
import CloseMenu from "../../../../public/icons/close-menu.svg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="bg-black flex items-center justify-between py-3 px-6 md:px-14 relative">
      <div className="logo w-[130px] md:w-[180px]">
        <Image className="w-full h-full" src={Logo} alt="Logo" />
      </div>

      <nav className="hidden md:block">
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li
              key={item.path}
              className={
                pathName === item.path
                  ? "border-b-2 text-white border-white"
                  : "text-gray-400 hover:text-white"
              }
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden md:block">
        <button className="bg-[#c4a54a] hover:bg-[#d1b358] text-white font-medium px-4 md:px-6 py-1 md:py-1.5 rounded-[12px]">
          Donate
        </button>
      </div>

      <button
        className="md:hidden bg-[#c4a54a] border-2 border-[#fff] rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={isOpen ? CloseMenu : Menu}
          alt="Menu Toggle"
          width={30}
          height={30}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full z-30 bg-black border-t border-gray-700 md:hidden shadow-lg"
          >
            <ul className="flex flex-col items-center py-6 space-y-5">
              {navItems.map((item) => (
                <li
                  key={item.path}
                  className={
                    pathName === item.path
                      ? "border-b-2 text-white border-white"
                      : "text-gray-400 hover:text-white"
                  }
                >
                  <Link href={item.path} onClick={() => setIsOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button className="bg-[#c4a54a] hover:bg-[#d1b358] text-white font-medium px-6 py-2 rounded-[12px]">
                  Donate
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

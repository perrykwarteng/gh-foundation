"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../../../../public/icons/GHF-LOGO.png";
import Menu from "../../../../public/icons/menu.svg";
import CloseMenu from "../../../../public/icons/close-menu.svg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About" },
    { name: "Projects", path: "/projects" },
    { name: "News", path: "/news" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="bg-[#0e372d] flex items-center justify-between py-3 px-6 md:px-14 relative">
      <div className="logo w-[130px] md:w-[180px]">
        <Link href="/">
          <Image className="w-full h-full" src={Logo} alt="Logo" />
        </Link>
      </div>

      <nav className="hidden md:block">
        <ul className="flex items-center space-x-6">
          {navItems.map((item) =>
            item.name === "About" ? (
              <li
                key={item.name}
                className="relative group"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <div
                  className={`flex items-center gap-1 cursor-pointer ${
                    pathName === "/about"
                      ? "border-b-2 text-white border-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      aboutOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-40 bg-[#0e372d] border border-gray-700 shadow-lg rounded-md flex flex-col z-50"
                    >
                      <li>
                        <Link
                          href="/about"
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-[#145b47] rounded-t-md"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/team"
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-[#145b47]"
                        >
                          Our Team
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/gallery"
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-[#145b47] rounded-b-md"
                        >
                          Gallery
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li
                key={item.name}
                className={
                  pathName === item.path
                    ? "border-b-2 text-white border-white"
                    : "text-gray-400 hover:text-white"
                }
              >
                <Link href={item.path ?? "#"}>{item.name}</Link>
              </li>
            )
          )}
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
              {navItems.map((item) =>
                item.name === "About" ? (
                  <li key={item.name} className="flex flex-col items-center">
                    <button
                      onClick={() => setAboutMobileOpen(!aboutMobileOpen)}
                      className={`flex items-center gap-1 ${
                        pathName === "/about"
                          ? "border-b-2 text-white border-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          aboutMobileOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {aboutMobileOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col mt-2 space-y-2"
                        >
                          <li>
                            <Link
                              href="/about"
                              onClick={() => setIsOpen(false)}
                              className="text-gray-400 hover:text-white"
                            >
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/team"
                              onClick={() => setIsOpen(false)}
                              className="text-gray-400 hover:text-white"
                            >
                              Our Team
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/gallery"
                              onClick={() => setIsOpen(false)}
                              className="text-gray-400 hover:text-white"
                            >
                              Gallery
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li
                    key={item.name}
                    className={
                      pathName === item.path
                        ? "border-b-2 text-white border-white"
                        : "text-gray-400 hover:text-white"
                    }
                  >
                    <Link
                      href={item.path ?? "#"}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
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

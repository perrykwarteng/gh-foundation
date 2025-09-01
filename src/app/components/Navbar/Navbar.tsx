"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../../../public/icons/GHF-LOGO.png";
import Image from "next/image";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <header className="bg-black flex items-center justify-between py-3 px-6 md:px-14">
      <div className="logo w-[130px] md:w-[180px]">
        <Image className="w-full h-full" src={Logo} alt="Logo" />
      </div>
      <div className="nav">
        <nav>
          <ul className="flex items-center space-x-6">
            <li
              className={
                pathName === "/"
                  ? "border-b-2 text-white border-white"
                  : "text-gray-400"
              }
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={
                pathName === "/about"
                  ? "border-b-2 text-white border-white"
                  : "text-gray-400"
              }
            >
              <Link href="/about">About</Link>
            </li>
            <li
              className={
                pathName === "/projects"
                  ? "border-b-2 text-white border-white"
                  : "text-gray-400"
              }
            >
              <Link href="/projects">Projects</Link>
            </li>
            <li
              className={
                pathName === "/gallery"
                  ? "border-b-2 text-white border-white"
                  : "text-gray-400"
              }
            >
              <Link href="/gallery">Gallery</Link>
            </li>
            <li
              className={
                pathName === "/contact"
                  ? "border-b-2 text-white border-white"
                  : "text-gray-400"
              }
            >
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="btn">
        <button className="bg-[#c4a54a] hover:bg-[#d1b358] text-white font-medium px-4 py-1 rounded-[12px]">
          Donate
        </button>
      </div>
    </header>
  );
}

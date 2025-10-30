import Image from "next/image";
import Logo from "../../../../public/icons/GHF-LOGO.png";
import Facebook from "../../../../public/icons/Facebook.svg";
import X from "../../../../public/icons/X.svg";
import Instagram from "../../../../public/icons/Instagram.svg";
import Tiktok from "../../../../public/icons/tiktok.png";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date(Date.now()).getFullYear();

  return (
    <>
      <footer className="bg-black py-10 px-6 md:px-14">
        <div className="flex flex-col gap-3.5 md:flex-row  md:items-start md:justify-between ">
          <div className="Info">
            <div className="w-[150px] md:w-[180px]">
              <Image src={Logo} alt="" />
            </div>
            <p className="text-white mt-2">
              Golden Height Foundation is more than a charity, it is a movement
              <br />
              of empathy, hope and action. By supporting children and empowering
              <br />
              women, we aim to build stronger families and brighter <br />
              communities where everyone can rise beyond limits, toward <br />{" "}
              golden heights.
            </p>
            <div className="mt-2">
              <p className="text-gray-400">
                <strong className="text-white">Momo number:</strong>(+233) 55
                685 3499
              </p>
              <p className="text-gray-400 mt-1">
                <strong className="text-white">Address: </strong>P O Box UC 171,
                University of Cape Coast,
                <br />
                Cape Coast
              </p>
              <p className="text-gray-400 mt-1">
                <strong className="text-white">Our Office: </strong>De Rosetta
                Premises, Forecourt Valco Hall
                <br /> University of Cape Coast, Cape Coast
              </p>
            </div>
          </div>
          <div className="About">
            <h3 className="text-white text-[25px] font-semibold">About Us</h3>
            <ul className="flex flex-col gap-1.5 mt-2.5">
              <Link className="text-gray-300 hover:text-white" href="">
                About Us
              </Link>
              <Link href="" className="text-gray-300 hover:text-white">
                Volunteers
              </Link>
              <Link href="" className="text-gray-300 hover:text-white">
                Partners
              </Link>
              <Link href="" className="text-gray-300 hover:text-white">
                Partners Contact Us
              </Link>
            </ul>
          </div>
          <div className="Useful links">
            <h3 className="text-white text-[25px] font-semibold">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-1.5 mt-2.5">
              <Link className="text-gray-300 hover:text-white" href="">
                F.A.Q
              </Link>
              <Link href="" className="text-gray-300 hover:text-white">
                News
              </Link>
              <Link href="" className="text-gray-300 hover:text-white">
                Terms of Use
              </Link>
              <Link href="" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
            </ul>
          </div>
          {/* <div className="">
            <h3 className="text-white text-[25px] font-semibold">Projects</h3>
            <div className="mt-2.5">
              <Image src={Project} alt="Projects" />
            </div>
          </div> */}
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-10">
          <div className="flex items-center gap-4">
            <Link
              href="https://www.web.facebook.com/profile.php?id=100075729007289"
              target="_blank"
            >
              <Image
                src={Facebook}
                alt="Facebook Icon"
                className="opacity-50 hover:opacity-100 transition-all duration-100"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/golden-height-foundation/about/"
              target="_blank"
              className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
            >
              <Linkedin className="text-black w-3.5 h-3.5" />
            </Link>

            <Link
              href="https://x.com/Goldenheight_gh?t=LViynigxig2P7iVUDZc_tg&s=08"
              target="_blank"
            >
              <Image
                src={X}
                alt="X Icon"
                className="opacity-50 hover:opacity-100 transition-all duration-100"
              />
            </Link>
            <Link
              href="https://www.instagram.com/goldenheightfoundation/"
              target="_blank"
            >
              <Image
                src={Instagram}
                alt="Instagram Icon"
                className="opacity-50 hover:opacity-100 transition-all duration-100"
              />
            </Link>
            <Link
              href="https://www.tiktok.com/@golden.height.fou?_t=ZM-9006aRS1mWq&_r=1"
              target="_blank"
              className="bg-white w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-all duration-100"
            >
              <Image
                src={Tiktok}
                alt="Instagram Icon"
                className="w-3.5 h-3.5"
              />
            </Link>
          </div>
          <p className="text-gray-300 text-[13px]">
            © Copyright Golden Height Foundation {year}. Design by{" "}
            <Link href="">Future Script</Link>
          </p>
        </div>
      </footer>
    </>
  );
}

import Image from "next/image";
import Logo from "../../../../public/icons/GHF-LOGO.png";
import Project from "../../../../public/icons/Igms.svg";
import Facebook from "../../../../public/icons/Facebook.svg";
import X from "../../../../public/icons/X.svg";
import Instagram from "../../../../public/icons/Instagram.svg";
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
              Tincidunt luctus porta amet lectus at ultricies nec sed non.{" "}
              <br />
              Sed sit egestas enim consectetur donec faucibus
            </p>
            <div className="mt-2">
              <p className="text-gray-400">
                <strong className="text-white">Phone:</strong> (610) 366-7883
              </p>
              <p className="text-gray-400 mt-1">
                <strong className="text-white">Address: </strong> 8911
                Tanglewood Ave. <br /> Capitol Heights, MD 20743
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
          <div className="">
            <h3 className="text-white text-[25px] font-semibold">Projects</h3>
            <div className="mt-2.5">
              <Image src={Project} alt="Projects" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-10">
          <div className="flex items-center gap-4">
            <Link href="#">
              <Image
                src={Facebook}
                alt="Facebook Icon"
                className="opacity-50 hover:opacity-100 transition-all duration-100"
              />
            </Link>

            <Link href="#">
              <Image
                src={X}
                alt="X Icon"
                className="opacity-50 hover:opacity-100 transition-all duration-100"
              />
            </Link>

            <Link href="#">
              <Image
                src={Instagram}
                alt="Instagram Icon"
                className="opacity-50 hover:opacity-100 transition-all duration-100"
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

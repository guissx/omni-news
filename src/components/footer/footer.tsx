import Link from "next/link";
import Logo from "../logo/logo";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  return (
    <footer className="bg-white mt-16 shadow-top flex-col gap-6 shadow-2xl flex justify-between items-center z-50 relative bottom-0 w-full px-24 pb-8 pt-12">
      <div className="flex gap-8 flex-col lg:flex-row lg:justify-between items-center w-full">
        <div className="flex self-center lg:place-self-start">
          <Logo></Logo>
        </div>
        <div className="flex place-self-start flex-col gap-6 mt-1">
          <h1 className="text-xl">Contact</h1>
          <p className="text-sm">+55 11 91236-5678</p>
          <p className="text-sm">omninews@gmail.com</p>
        </div>

        <div className="flex place-self-start flex-col gap-6 mt-1">
          <h1 className="text-xl">Adress</h1>
          <p className="text-sm">Rua das Flores, 123</p>
        </div>
        <ul className="flex gap-6 orbitron-text text-xl flex-col mt-1 place-self-start">
          <li>
            <Link
              href="/"
              className="relative hover:text-red-500 transition-colors group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/contactPage"
              className="relative hover:text-red-500 transition-colors group"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/aboutPage"
              className="relative hover:text-red-500 transition-colors group"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>
      <span className="text-gray-600 text-sm text-center">
        © {currentYear} Omni News. All rights reserved.
      </span>
    </footer>
  );
}

'use client'
import { useTheme } from "next-themes";
import DarkToggle from "./darktoggle";
import Link from "next/link";
import Image from "next/image";

const Header = () => {

    const { theme } = useTheme();


  return (
    <header className="w-full flex items-center justify-between px-3 h-[4rem]">
      <Link href={"/"}>
      {
        theme === 'light' ? <Image src={'/light.png'} width={133} height={30} alt="header_logo" /> : <Image src={'/dark.png'} width={133} height={30} alt="header_logo" />
      }
      </Link>
      <div>
        <DarkToggle />
      </div>
    </header>
  );
};

export default Header;

import Image from "next/image"
import DarkToggle from "./darktoggle"
import CryptoAnimation from "./signanimation"
import { Space_Grotesk } from "next/font/google"


const space = Space_Grotesk({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
  });

const Signpage = () => {
  return (
    <div className="relative">
        <Image src={'/blueel.svg'} width={2000} height={2000} alt="ellipse" className="absolute -top-0 -left-10 scale-[2.3] -rotate-[17deg] dark:opacity-55" />
        <div className="absolute top-3 right-3">
            <DarkToggle />
        </div>

        <div className="absolute top-16 inset-x-0 flex flex-col items-center justify-center gap-6">
            <div className="flex justify-center gap-1">
                <h1 className={`${space.className} text-xl font-bold uppercase`}>Dani Soft</h1>
                <span className={`text-[8px] ${space.className} font-medium mt-2.5 block`}>(v2.0)</span>
            </div>
            <CryptoAnimation />
        </div>
    </div>
  )
}

export default Signpage
import Image from "next/image"
import DarkToggle from "./darktoggle"
import CryptoAnimation from "./signanimation"


const Signpage = () => {
  return (
    <div className="relative">
        <Image src={'/blueel.svg'} width={2000} height={2000} alt="ellipse" className="absolute -top-0 -left-10 scale-[2.3] -rotate-[17deg] opacity-55" />
        <div className="absolute top-3 right-3">
            <DarkToggle />
        </div>

        <div className="absolute top-32 inset-x-0">
            <CryptoAnimation />
        </div>
    </div>
  )
}

export default Signpage
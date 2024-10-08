"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import DarkToggle from "./darktoggle";
import CryptoAnimation from "./signanimation";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation";

const space = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface FormValues {
  keyInput: string; 
}

const Signpage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: data.keyInput }),
      });

      if (response.ok) {
        alert('Giriş başarılı');
        router.push('/user'); 
      } else {
        const errorData = await response.json();
        alert(`Giriş başarısız: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Giriş hatası');
    }
  };

  return (
    <div className="relative">
      <Image
        src={"/blueel.svg"}
        width={2000}
        height={2000}
        alt="ellipse"
        className="absolute -top-0 -left-10 scale-[2.3] -rotate-[17deg] dark:opacity-55"
      />
      <div className="absolute top-3 right-3">
        <DarkToggle />
      </div>

      <div className="absolute top-24 inset-x-0 flex flex-col items-center justify-center gap-6">
        <div className="flex justify-center gap-1">
          <h1 className={`${space.className} text-xl font-bold uppercase`}>
            Dani Soft
          </h1>
          <span
            className={`text-[8px] ${space.className} font-medium mt-2.5 block`}
          >
            (v2.0)
          </span>
        </div>
        <CryptoAnimation />
      </div>
      <div className={`absolute inset-x-0 top-52 px-4 ${space.className}`}>
        <div className="text-center">
            <h3 className={`text-2xl font-bold tracking-tight `}>Sign in</h3>
            <p className="text-[#7c7c7c]">Enter your credentials</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-3 w-full mt-3"
        >
          <input
            type="text"
            placeholder="Activation Key"
            {...register("keyInput", { required: "Please enter your activation key" })}
            className={`p-2 px-3 text-center dark:placeholder:text-white/50 placeholder:text-sm font-medium tracking-wide ${space.className} outline-black/5 outline-1 transition-all dark:outline-none dark:text-white border-[1px] dark:border-white/5 dark:bg-white/[0.01] bg-black/[0.03] backdrop-blur w-full rounded-lg`}
          />
          {errors.keyInput && (
            <p className="text-red-500 text-xs text-center font-medium -mt-1.5 mx-0.5">
              {errors.keyInput.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-black/90 dark:bg-white/5 text-white py-2 px-4 rounded-lg w-full font-medium"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signpage;

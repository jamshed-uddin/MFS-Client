import LoginResgister from "@/components/LoginResgister";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="lg:flex  max-w-7xl mx-auto items-center justify-center h-screen lg:px-16 pt-10 lg:pt-0 space-y-7 lg:space-y-0">
      <div className="lg-w-1/2 flex-grow">
        <Logo />
        <h1 className="text-4xl lg:text-7xl font-bold text-gray-800">
          Powering Your <br /> transactions
        </h1>
      </div>
      <div className="lg-w-1/2 flex-grow">
        <LoginResgister />
      </div>
    </div>
  );
}

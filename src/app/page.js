import LoginResgister from "@/components/LoginResgister";
import Logo from "@/components/Logo";
import { getCookiesAsync } from "@/utils/cookieOpsAsync";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const Home = async () => {
  const { token } = await getCookiesAsync("session");

  if (token) {
    redirect("/wallet");
  }
  return (
    <div className="lg:flex  max-w-7xl mx-auto items-center justify-center h-screen lg:px-16 pt-10 lg:pt-0 space-y-7 lg:space-y-0 px-3">
      <div className="lg-w-3/4 flex-grow">
        <Logo />
        <h1 className="text-4xl lg:text-7xl font-bold text-gray-800">
          Powering Your <br /> transactions
        </h1>
      </div>
      <div className="lg:w-1/4 flex-grow">
        <LoginResgister />
      </div>
    </div>
  );
};

export default Home;

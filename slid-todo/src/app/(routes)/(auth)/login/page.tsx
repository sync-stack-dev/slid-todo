import { Suspense } from "react";
import LoginForm from "./components/Login-form";
import Image from "next/image";
const LoginPage = () => {
  return (
    <Suspense>
      <div className="bg-white w-full">
        <div className="flex justify-center flex-col items-center h-screen dark:bg-[#0F172A]">
          <div className="mb-8">
            <Image src="/imgs/logo.png" alt="Slid to-do" width={270} height={89} priority />
          </div>
          <LoginForm />
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;

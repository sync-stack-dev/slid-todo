import Image from "next/image";
import { Loading } from "@/components/shared/loading";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="animate-fade-in">
        <Image
          src="/imgs/logo.png"
          alt="logo"
          width={302}
          height={87}
          className="hover:scale-105 transition-transform duration-300"
        />
        <div className="mt-10 h-[0px]">
          <Loading fullScreen={false} size={200} />
        </div>
      </div>
    </main>
  );
}

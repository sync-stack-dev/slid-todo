import { House } from "lucide-react";
import Link from "next/link";

const AppSidebarDashBoard = () => {
  return (
    <Link
      href="/dashboard"
      className="mx-5 py-2 flex items-center relative text-black hover:text-blue-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-blue-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 "
    >
      <House className="w-[24px] h-[24px] mr-2" />
      <div>대시보드</div>
    </Link>
  );
};

export default AppSidebarDashBoard;

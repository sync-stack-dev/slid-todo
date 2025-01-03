import { House } from "lucide-react";
import Link from "next/link";
import Skeleton from "@/components/shared/skeleton";
import { useUserQuery } from "@/stores/use-user-store";

const AppSidebarDashBoard = () => {
  const { isLoading } = useUserQuery();

  if (isLoading) {
    return (
      <div className="mx-5 py-2 flex items-center">
        <Skeleton className="w-[16px] h-[16px] rounded-xl mr-3" />
        <Skeleton className="w-24 h-[22px] rounded-xl" />
      </div>
    );
  }

  return (
    <Link href="/dashboard">
      <div className="mx-5 py-2 flex items-center text-black dark:text-white hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer transition-all ease-in-out group before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-blue-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:left-0">
        <House className="w-[16px] h-[16px] mr-3" data-testid="house-icon" />
        <span className="text-lg font-medium">대시보드</span>
      </div>
    </Link>
  );
};

export default AppSidebarDashBoard;

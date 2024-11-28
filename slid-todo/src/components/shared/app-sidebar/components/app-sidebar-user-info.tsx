import { Button } from "@/components/ui/button";
import { useUserQuery } from "@/stores/use-user-store";
import { Plus } from "lucide-react";

const AppSidebarUserInfo = () => {
  const { data: user, isError } = useUserQuery();

  if (isError || !user) return <div>뭔가 잘못됐다.</div>;

  // TODO : logout

  return (
    <div className="px-5 py-7">
      <div className="flex justify-between mb-5">
        <div className="w-[64px] h-[64px] bg-blue-600"></div>
        <div className="text-[14px] text-slate-800">
          <div>{user.name}</div>
          <div>{user.email}</div>

          <Button className="h-0 p-0 bg-transparent text-xs text-slate-400 hover:text-slate-700">
            로그아웃
          </Button>
        </div>
      </div>

      <Button className="w-full text-white text-base bg-blue-500 hover:bg-blue-700">
        <Plus />
        <div>새 할 일</div>
      </Button>
    </div>
  );
};

export default AppSidebarUserInfo;

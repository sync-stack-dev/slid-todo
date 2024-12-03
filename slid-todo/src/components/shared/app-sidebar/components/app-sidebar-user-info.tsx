import { Button } from "@/components/ui/button";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useUserQuery } from "@/stores/use-user-store";
import { useLoginStore } from "@/stores/use-login-store";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import Skeleton from "@/components/shared/skeleton";

const AppSidebarUserInfo = () => {
  const { data: user, isError, isLoading } = useUserQuery();
  const { onOpen: onOpenFormModal } = useFormModal();
  const { onOpen: openConfirm } = useConfirmModal();
  const { createTodo } = useTodoActions();
  const router = useRouter();
  const { logout } = useLoginStore();

  const handleLogout = () => {
    openConfirm({
      title: "로그아웃 하시겠어요?",
      confirmText: "로그아웃",
      variant: "danger",
      onConfirm: () => {
        logout();
        router.push("/login");
      },
    });
  };

  const handleOpenFormModal = () => {
    onOpenFormModal({
      type: "todo",
      mode: "create",
      onSubmit: (data) => {
        createTodo(data);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="px-5 rounded-lg">
        <div className="flex mb-5 gap-5">
          <div className="w-[64px] h-[64px] min-w-[64px] min-h-[64px]">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
          <div className="text-[14px] w-full">
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-[18px] w-24 rounded-xl" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-[18px] w-32 mt-1 rounded-xl" />
            <Skeleton className="h-[16px] w-12 mt-4 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
    );
  }

  if (isError || !user) return <div>뭔가 잘못됐다.</div>;

  return (
    <div className="px-5 rounded-lg">
      <div className="flex mb-5 gap-5">
        <div className="w-[64px] h-[64px] bg-blue-600 rounded-xl min-w-[64px] min-h-[64px]"></div>
        <div className="text-[14px] text-slate-800 dark:text-slate-300 w-full">
          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-semibold">{user.name}</p>
            <ThemeToggle />
          </div>
          <p className="text-sm font-medium">{user.email}</p>

          <Button
            className="bg-transparent hover:bg-transparent text-xs text-slate-400 hover:text-slate-700 p-0 h-0 mt-4 dark:hover:text-slate-300"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>

      <Button
        onClick={handleOpenFormModal}
        className="w-full text-white text-base bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-xl flex items-center justify-center gap-2"
        data-cy="new-todo-button"
      >
        <Plus />
        <span>새 할 일</span>
      </Button>
    </div>
  );
};

export default AppSidebarUserInfo;

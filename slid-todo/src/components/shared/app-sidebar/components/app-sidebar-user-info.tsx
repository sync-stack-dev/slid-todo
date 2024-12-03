import { Button } from "@/components/ui/button";
import { useTodoActions } from "@/hooks/todo/use-todo-actions";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useUserQuery } from "@/stores/use-user-store";
import { useLoginStore } from "@/stores/use-login-store"; // 로그아웃 훅 가져오기
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation"; // 로그아웃 후 로그인페이지로 라우팅을 위한
import { useConfirmModal } from "@/stores/use-confirm-modal-store"; //로그아웃 confirm modal

const AppSidebarUserInfo = () => {
  const { data: user, isError } = useUserQuery();
  const { onOpen: onOpenFormModal } = useFormModal();
  const { onOpen: openConfirm } = useConfirmModal();
  const { createTodo } = useTodoActions();
  const router = useRouter();
  const { logout } = useLoginStore();

  const handleLogout = () => {
    // openConfirm 호출로 모달 열기
    openConfirm({
      title: "로그아웃 하시겠어요?",
      confirmText: "로그아웃",
      variant: "danger",
      onConfirm: () => {
        // 사용자가 모달에서 "나가기"를 클릭한 경우
        logout(); // 로그아웃 처리
        router.push("/login"); // 로그인 페이지로 라우팅
      },
    });
  };
  

  if (isError || !user) return <div>뭔가 잘못됐다.</div>;

  // 모달
  const handleOpenFormModal = () => {
    onOpenFormModal({
      type: "todo",
      mode: "create",
      onSubmit: (data) => {
        createTodo(data);
      },
    });
  };

  
  return (
    <div className="px-5 py-7">
      <div className="flex justify-between mb-5">
        <div className="w-[64px] h-[64px] bg-blue-600"></div>
        <div className="text-[14px] text-slate-800">
          <div>{user.name}</div>
          <div>{user.email}</div>

          <Button className="h-0 p-0 bg-transparent text-xs text-slate-400 hover:text-slate-700"
          onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>

      <Button
        onClick={handleOpenFormModal}
        className="w-full text-white text-base bg-blue-500 hover:bg-blue-700"
        data-cy="new-todo-button"
      >
        <Plus />
        <div>새 할 일</div>
      </Button>
    </div>
  );
};

export default AppSidebarUserInfo;

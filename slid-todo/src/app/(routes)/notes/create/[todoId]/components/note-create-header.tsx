import { Button } from "@/components/ui/button";

interface NoteCreateHeaderProps {
  onClickPreSaveBtn?: () => void;
  onClickUpdateBtn?: () => void;
}

const NoteCreateHeader = ({ onClickPreSaveBtn, onClickUpdateBtn }: NoteCreateHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg text-slate-900 font-semibold dark:text-white">노트 작성</div>

      <div className="flex gap-2">
        <Button
          className="bg-transparent text-blue-500 hover:text-blue-700 hover:bg-transparent dark:bg-slate-500 dark:text-white dark:hover:bg-slate-600"
          onClick={onClickPreSaveBtn}
        >
          임시저장
        </Button>
        {/* TODO: 작성완료 모든 필요 칸이 작성되기전까지 disabled처리 */}
        <Button
          className="bg-blue-500 text-white hover:bg-blue-400 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
          onClick={onClickUpdateBtn}
        >
          작성완료
        </Button>
      </div>
    </div>
  );
};

export default NoteCreateHeader;

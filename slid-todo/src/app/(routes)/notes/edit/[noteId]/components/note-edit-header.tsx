import { Button } from "@/components/ui/button";

interface NoteEditHeaderProps {
  onClickPreSaveBtn?: () => void;
  onClickUpdateBtn?: () => void;
}

const NoteEditHeader = ({ onClickPreSaveBtn, onClickUpdateBtn }: NoteEditHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-lg text-slate-900">노트 작성</div>

      <div className="flex justify-between w-[20%]">
        <Button
          className="bg-slate-100 text-blue-500 hover:bg-slate-200"
          onClick={onClickPreSaveBtn}
        >
          임시저장
        </Button>
        <Button className="bg-blue-500 text-white hover:bg-blue-300" onClick={onClickUpdateBtn}>
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default NoteEditHeader;

import { Note } from "../../../../../../public/svgs";

const ViewNotesButton = () => {
  return (
    <div className="flex gap-2 items-center max-w-[1200px] max-h-[136px] bg-white rounded-lg py-4 px-6 mt-4 bg-blue-100 text-lg font-bold">
      <Note className="w-6 h-6" />
      <p className="text-sm font-semibold">노트 모아보기</p>
    </div>
  );
};

export default ViewNotesButton;

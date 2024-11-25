import NoteList from "./components/note-list";
import NoteGoalTitle from "./components/note-goal-title";

const NotePage = () => {
  return (
    <>
      <div className="w-screen h-screen bg-[#F1F5F9] px-36 py-10">
        <div className="text-lg text-slate-900 mb-5">노트 모아보기</div>
        <NoteGoalTitle />
        <NoteList />
      </div>
    </>
  );
};

export default NotePage;

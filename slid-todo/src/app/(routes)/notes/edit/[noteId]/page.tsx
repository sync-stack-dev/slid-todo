"use client";
import { useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useNoteById } from "@/hooks/note/use-note";

const NoteEditPage = () => {
  const { noteId } = useParams();
  const { data: note, isLoading: noteLoading, error: noteError } = useNoteById(Number(noteId));

  if (noteLoading) return <Loading />;
  if (noteError) return <div>에러가 발생했습니다.</div>;
  if (!note) return <div>목표를 찾을 수 없습니다.</div>;

  return (
    <>
      <div className="h-screen bg-[#F1F5F9] px-36 py-10">
        <div className="flex flex-col w-1/2 h-full">노트 수정 페이지 layout</div>
      </div>
    </>
  );
};

export default NoteEditPage;

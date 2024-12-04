import { Note } from "@/public/svgs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const ViewNotesButton = () => {
  const { goalId } = useParams();

  return (
    <Link
      href={`/notes/${goalId}`}
      data-cy="view-notes-button"
      className="flex items-center justify-between max-w-[1200px] max-h-[136px] bg-blue-100 dark:bg-blue-900 rounded-lg py-4 px-6 mt-4 text-lg font-bold transform transition-transform duration-300 hover:translate-x-2"
    >
      <div className="flex items-center gap-2">
        <Note className="w-6 h-6" />
        <p className="text-sm font-semibold">노트 모아보기</p>
      </div>
      <ChevronRight className="w-4 h-4" />
    </Link>
  );
};

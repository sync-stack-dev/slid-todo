import { Goal } from "@/public/svgs";

interface NoteGoalTitleProps {
  goalTitle: string;
}

const NoteGoalTitle = ({ goalTitle }: NoteGoalTitleProps) => {
  return (
    <div className="w-full bg-white flex items-center p-5 border-[1px] border-slate-100 rounded-xl mb-5 dark:bg-blue-900 dark:border-blue-950">
      <Goal className="mr-3" />
      <div className="text-sm text-slate-800 dark:text-white">{goalTitle}</div>
    </div>
  );
};

export default NoteGoalTitle;

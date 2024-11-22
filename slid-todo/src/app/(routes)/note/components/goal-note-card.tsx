import { Note } from "../types";

interface GoalNoteCardProps {
  note: Note;
}

const GoalNoteCard = ({ note }: GoalNoteCardProps) => {
  return (
    <>
      <div>{note.id}</div>
    </>
  );
};

export default GoalNoteCard;

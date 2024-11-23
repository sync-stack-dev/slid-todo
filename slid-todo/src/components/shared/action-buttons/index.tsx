import { LinkButton } from "./link-button";
import { FileButton } from "./file-button";
import { NoteButton } from "./note-button";

interface ActionButtonsProps {
  linkUrl?: string;
  fileUrl?: string;
  hasNote?: boolean;
  onNoteClick?: () => void;
}

export const ActionButtons = ({ linkUrl, fileUrl, hasNote, onNoteClick }: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-2">
      {linkUrl && <LinkButton url={linkUrl} />}
      {fileUrl && <FileButton url={fileUrl} />}
      {hasNote && onNoteClick && <NoteButton onClick={onNoteClick} />}
    </div>
  );
};

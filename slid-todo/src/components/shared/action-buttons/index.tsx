import { LinkButton } from "./link-button";
import { FileButton } from "./file-button";
import { NoteButton } from "./note-button";
import { CreateNoteButton } from "./create-note-button";

interface ActionButtonsProps {
  linkUrl?: string;
  fileUrl?: string;
  hasNote?: boolean;
  onNoteClick?: () => void;
  onCreateNote?: () => void;
}

export const ActionButtons = ({
  linkUrl,
  fileUrl,
  hasNote,
  onNoteClick,
  onCreateNote,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-2" data-testid="action-buttons-container">
      <div className={hasNote ? "" : "opacity-0 group-hover:opacity-100 transition-opacity"}>
        {hasNote ? (
          <NoteButton onClick={onNoteClick} />
        ) : (
          <CreateNoteButton onClick={onCreateNote} />
        )}
      </div>
      {linkUrl && <LinkButton url={linkUrl} />}
      {fileUrl && <FileButton url={fileUrl} />}
    </div>
  );
};

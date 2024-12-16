import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import PaintBucketInput from "./paint-bucket-input";
import { useFormModal } from "@/stores/use-form-modal-store";
import { useFormContext } from "react-hook-form";

interface ToolBarProps {
  editor: Editor | null;
}
const NoteWriteToolbar = ({ editor }: ToolBarProps) => {
  const { onOpen: onOpenLinkModal } = useFormModal();
  const { setValue } = useFormContext();

  if (!editor) return null;

  const onClickLinkBtn = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onOpenLinkModal({
      type: "link",
      mode: "add",
      onSubmit: (data) => {
        setValue("linkUrl", data.linkUrl || "");
      },
    });
  };

  return (
    <div className="fixed bottom-5 md:relative md:bottom-0 bg-white dark:bg-black border-[1px] border-slate-100 rounded-3xl py-2 px-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Bold
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <Italic
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <Underline
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
          </div>

          <div className="flex items-center gap-2">
            <AlignLeft
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.commands.setTextAlign("left")}
            />
            <AlignCenter
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.commands.setTextAlign("center")}
            />
            <AlignRight
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.commands.setTextAlign("right")}
            />
          </div>

          <div className="flex items-center gap-2">
            <List
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ListOrdered
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <PaintBucketInput
              editor={editor}
              className="hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500 w-4 h-4 dark:fill-white"
            />
          </div>
        </div>
        <div
          className="flex items-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 rounded-full p-1"
          onClick={(event) => onClickLinkBtn(event)}
        >
          <Link className="w-4 h-4 hover:cursor-pointer hover:text-blue-500 rounded-full dark:text-white dark:hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default NoteWriteToolbar;

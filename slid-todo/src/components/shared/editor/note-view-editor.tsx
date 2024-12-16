import { cn } from "@/utils/cn";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NoteWriteToolbar from "./note-write-toolbar";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

interface NoteViewEditorProps {
  content: string;
}

const NoteViewEditor = ({ content }: NoteViewEditorProps) => {
  const editor = useEditor({
    editable: false,
    autofocus: false,
    extensions: [
      StarterKit,
      ListKeymap,
      Underline,
      TextStyle,
      Color,
      Bold.configure({
        HTMLAttributes: {
          "font-weight": 900,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "[&>div:first-child>div:first-child]:min-h-[500px] prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[500px] p-2 outline-1 [&_p]:m-0 [&_p]:leading-normal",
        ),
      },
    },
  });

  return <EditorContent className="max-h-[500px] overflow-auto mb-2" editor={editor} />;
};

export default NoteViewEditor;

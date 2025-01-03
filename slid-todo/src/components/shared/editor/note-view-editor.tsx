import { cn } from "@/utils/cn";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
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
      StarterKit.configure({
        bold: {
          HTMLAttributes: {
            "font-weight": 900,
          },
        },
      }),
      ListKeymap,
      Underline,
      TextStyle,
      Color,
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

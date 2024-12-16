import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NoteWriteToolbar from "./note-write-toolbar";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import ListKeymap from "@tiptap/extension-list-keymap";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

import { cn } from "@/utils/cn";
import { Color } from "@tiptap/extension-color";
import { useEffect, useState } from "react";

interface NoteWriteEditorProps {
  content: string | null;
  onContentChange: (value: string) => void;
}

const NoteWriteEditor = ({ content, onContentChange }: NoteWriteEditorProps) => {
  const [charCountWithSpaces, setCharCountWithSpaces] = useState(0);
  const [charCountWithoutSpaces, setCharCountWithoutSpaces] = useState(0);

  const calculateInitialCounts = (content: string | null) => {
    const plainText = content ? content.replace(/<\/?[^>]+(>|$)/g, "") : ""; // HTML 태그 제거
    setCharCountWithSpaces(plainText.length);
    setCharCountWithoutSpaces(plainText.replace(/\s+/g, "").length);
  };

  const editor = useEditor({
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
      Placeholder.configure({
        placeholder: "이곳에 노트를 기록해주세요. ",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:h-0 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none ",
      }),
      CharacterCount.configure(),
    ],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class: cn(
          "[&>div:first-child>div:first-child]:min-h-[500px] prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[500px] p-2 outline-1 [&_p]:m-0 [&_p]:leading-normal dark:bg-gray-800",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      const plainText = editor.getText();

      setCharCountWithSpaces(plainText.length);
      setCharCountWithoutSpaces(plainText.replace(/\s+/g, "").length);

      if (html === "<p></p>") html = "";
      onContentChange(html);
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content || "");
    }

    calculateInitialCounts(content);
  }, [content, editor]);

  return (
    <div>
      <div className="text-xs font-medium text-slate-800 dark:text-white my-2">
        공백포함 : 총 {charCountWithSpaces} 자 | 공백제외 : 총 {charCountWithoutSpaces}자
      </div>
      <EditorContent className="max-h-[500px] overflow-auto mb-2" editor={editor} />
      <NoteWriteToolbar editor={editor} />
    </div>
  );
};

export default NoteWriteEditor;

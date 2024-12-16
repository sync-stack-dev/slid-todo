import { Editor } from "@tiptap/react";
import { PaintBucket } from "lucide-react";
import { FormEvent, useRef } from "react";
import { cn } from "@/utils/cn";

interface PaintBucketInputProps {
  editor: Editor;
  className?: string;
}

function PaintBucketInput({ editor, className }: PaintBucketInputProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const currentColor = editor.getAttributes("textStyle").color || "#000000"; // 기본 색상

  const handleIconClick = () => {
    if (colorInputRef.current) {
      (colorInputRef.current as HTMLInputElement).click();
    }
  };

  const handleColorChange = (event: FormEvent<HTMLInputElement>) => {
    editor
      .chain()
      .focus()
      .setColor((event.target as HTMLInputElement).value)
      .run();
  };

  return (
    <>
      <PaintBucket
        className={cn("hover:cursor-pointer", className)}
        onClick={handleIconClick}
        style={{ color: currentColor }}
      ></PaintBucket>
      <input
        className="opacity-0"
        ref={colorInputRef} // input에 ref 연결
        type="color"
        onInput={(event) => handleColorChange(event)}
        value={editor.getAttributes("textStyle").color || "#000000"}
        data-testid="setColor"
        aria-label="set color"
      ></input>
    </>
  );
}

export default PaintBucketInput;

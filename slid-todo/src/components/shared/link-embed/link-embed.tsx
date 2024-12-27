import Link from "next/link";
import LinkDeleteSVG from "./link-delete-svg";
import LinkSVG from "./link-svg";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { ensureHttps } from "@/utils/url";

interface LinkEmbedProps {
  value: string | null;
  onChange: (value: string) => void;
}

const LinkEmbed = forwardRef<HTMLDivElement, LinkEmbedProps>(({ value, onChange }, ref) => {
  const { setValue } = useFormContext();
  if (value === "" || !value) return null; // undefined 대신 null 반환
  const url = ensureHttps(value);

  const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setValue("linkUrl", "");
  };

  return (
    <div
      ref={ref}
      className="flex justify-between items-center bg-slate-200 rounded-full p-2 dark:bg-blue-950 mt-2"
    >
      <Link
        href={url}
        target="_blank"
        className="flex justify-between items-center overflow-hidden"
      >
        <LinkSVG className="mr-3" />
        <div className="text-base text-slate-800 hover:text-blue-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-blue-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-full before:bottom-0 before:left-0 dark:text-white">
          {url}
        </div>
      </Link>

      <LinkDeleteSVG
        onClick={onClickDeleteBtn}
        className="hover:scale-125 transition-transform duration-150 hover:cursor-pointer"
      />
    </div>
  );
});

// 개발 환경에서 컴포넌트 이름 표시
LinkEmbed.displayName = "LinkEmbed";

export default LinkEmbed;

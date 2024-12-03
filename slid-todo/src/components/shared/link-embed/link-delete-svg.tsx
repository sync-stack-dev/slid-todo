import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface LinkDeleteSVGProps {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const LinkDeleteSVG = ({ onClick, className }: LinkDeleteSVGProps) => {
  return (
    <Button className="p-0 w-[24px] h-[24px]" onClick={(event) => onClick(event)}>
      <svg
        className={cn(className)}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" fill="#64748B" />
        <path d="M8 8L16 16" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 8L8 16" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </Button>
  );
};

export default LinkDeleteSVG;

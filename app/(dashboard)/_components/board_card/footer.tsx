import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps {
  isFavorite: boolean;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

const Footer = ({
  isFavorite,
  title,
  authorLabel,
  createdAtLabel,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">{title}</p>
      <p className="opacity-0  group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-amber-500",
          disabled && "cursor-not-allowed ocpacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavorite && "fill-amber-500 text-amber-500"
          )}
        />
      </button>
    </div>
  );
};

export default Footer;

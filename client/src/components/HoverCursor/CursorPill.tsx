import { ArrowUpRight } from "lucide-react";
import type { Ref } from "react";

type CursorPillProps = {
    ref: Ref<HTMLDivElement>;
    label: string;
    isVisible: boolean;
};

export default function CursorPill({ ref, label, isVisible }: CursorPillProps) {
    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 z-20 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#1f1f1f] shadow-[0_10px_28px_rgba(0,0,0,0.12)] will-change-transform transition-[opacity,scale] duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
                isVisible ? "scale-100 opacity-100" : "scale-[0.88] opacity-0"
            }`}
        >
            <ArrowUpRight size={16} strokeWidth={2} />
            {label}
        </div>
    );
}

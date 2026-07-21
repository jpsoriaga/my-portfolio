import type { ReactNode } from "react";

type StackIconProps = {
    name: string;
    children: ReactNode;
};

export default function StackIcon({ name, children }: StackIconProps) {
    return (
        <div className="group relative flex overflow-visible" aria-label={name}>
            <span className="flex rounded-md transition-transform duration-300 ease-out group-hover:scale-110">
                {children}
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs font-medium text-black opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                {name}
            </span>
        </div>
    );
}

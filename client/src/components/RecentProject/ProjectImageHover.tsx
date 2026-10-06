import CursorPill from "@/components/HoverCursor/CursorPill";
import useCursorFollow from "@/components/HoverCursor/useCursorFollow";

type ProjectImageHoverProps = {
    image: string;
    alt: string;
};

export default function ProjectImageHover({ image, alt }: ProjectImageHoverProps) {
    const { isHoverable, isHovered, cursorRef, pointerHandlers } = useCursorFollow<HTMLDivElement>();

    return (
        <div
            className={`relative aspect-[1200/783] overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.06)] ${
                isHoverable ? "cursor-none" : ""
            }`}
            {...pointerHandlers}
        >
            <img
                src={image}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                    isHoverable ? "group-hover:scale-[1.0125]" : ""
                }`}
            />

            {isHoverable && <CursorPill ref={cursorRef} label="Explore" isVisible={isHovered} />}
        </div>
    );
}

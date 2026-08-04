import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type ProjectImageHoverProps = {
    image: string;
    alt: string;
};

export default function ProjectImageHover({ image, alt }: ProjectImageHoverProps) {
    const [isHoverable, setIsHoverable] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const boundsRef = useRef<DOMRect | null>(null);
    const pointerRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const updateHoverable = () => setIsHoverable(mediaQuery.matches);

        updateHoverable();
        mediaQuery.addEventListener("change", updateHoverable);

        return () => mediaQuery.removeEventListener("change", updateHoverable);
    }, []);

    useEffect(() => {
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const updateCursorPosition = () => {
        frameRef.current = 0;

        if (!cursorRef.current) return;

        const { x, y } = pointerRef.current;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
        if (!isHoverable) return;

        boundsRef.current = event.currentTarget.getBoundingClientRect();
        setIsHovered(true);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!isHoverable) return;

        const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect();
        pointerRef.current.x = event.clientX - bounds.left;
        pointerRef.current.y = event.clientY - bounds.top;

        if (!frameRef.current) {
            frameRef.current = requestAnimationFrame(updateCursorPosition);
        }
    };

    const handlePointerLeave = () => {
        setIsHovered(false);
        boundsRef.current = null;
    };

    return (
        <div
            className={`relative aspect-[1200/783] overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.06)] ${
                isHoverable ? "cursor-none" : ""
            }`}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerMove={handlePointerMove}
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

            {isHoverable && (
                <div
                    ref={cursorRef}
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-0 top-0 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#1f1f1f] shadow-[0_10px_28px_rgba(0,0,0,0.12)] will-change-transform transition-[opacity,scale] duration-200 ease-[cubic-bezier(.16,1,.3,1)] ${
                        isHovered ? "scale-100 opacity-100" : "scale-[0.88] opacity-0"
                    }`}
                >
                    <ArrowUpRight size={16} strokeWidth={2} />
                    Explore
                </div>
            )}
        </div>
    );
}

import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";

type ProjectImageHoverProps = {
    image: string;
    alt: string;
};

export default function ProjectImageHover({ image, alt }: ProjectImageHoverProps) {
    const [isHoverable, setIsHoverable] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const smoothX = useSpring(cursorX, { damping: 24, stiffness: 420, mass: 0.22 });
    const smoothY = useSpring(cursorY, { damping: 24, stiffness: 420, mass: 0.22 });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const updateHoverable = () => setIsHoverable(mediaQuery.matches);

        updateHoverable();
        mediaQuery.addEventListener("change", updateHoverable);

        return () => mediaQuery.removeEventListener("change", updateHoverable);
    }, []);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!isHoverable) return;

        const bounds = event.currentTarget.getBoundingClientRect();
        cursorX.set(event.clientX - bounds.left);
        cursorY.set(event.clientY - bounds.top);
    };

    return (
        <div
            className={`relative overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.06)] ${
                isHoverable ? "cursor-none" : ""
            }`}
            onPointerEnter={() => isHoverable && setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            onPointerMove={handlePointerMove}
        >
            <img
                src={image}
                alt={alt}
                className={`h-auto w-full transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                    isHoverable ? "group-hover:scale-[1.0125]" : ""
                }`}
            />

            {isHoverable && (
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#1f1f1f] shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.88,
                    }}
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    transition={{
                        duration: 0.18,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    <ArrowUpRight size={16} strokeWidth={2} />
                    Explore
                </motion.div>
            )}
        </div>
    );
}

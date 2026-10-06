import { useEffect, useRef, useState, type PointerEvent } from "react";

export default function useCursorFollow<T extends HTMLElement>() {
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

    const onPointerEnter = (event: PointerEvent<T>) => {
        if (!isHoverable) return;

        boundsRef.current = event.currentTarget.getBoundingClientRect();
        setIsHovered(true);
    };

    const onPointerMove = (event: PointerEvent<T>) => {
        if (!isHoverable) return;

        const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect();
        pointerRef.current.x = event.clientX - bounds.left;
        pointerRef.current.y = event.clientY - bounds.top;

        if (!frameRef.current) {
            frameRef.current = requestAnimationFrame(updateCursorPosition);
        }
    };

    const onPointerLeave = () => {
        setIsHovered(false);
        boundsRef.current = null;
    };

    return {
        isHoverable,
        isHovered,
        cursorRef,
        pointerHandlers: { onPointerEnter, onPointerMove, onPointerLeave },
    };
}

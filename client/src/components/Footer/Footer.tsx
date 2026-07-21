import { FaGithub, FaInstagram } from "react-icons/fa";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
    const footerRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (footerRef.current) {
                gsap.from(footerRef.current, {
                    y: 20,
                    opacity: 0,
                    filter: "blur(5px)",
                    duration: 0.6,
                    delay: 2.1,
                    ease: "power3.out",
                    clearProps: "filter,transform,opacity",
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="mx-auto flex py-30 w-full max-w-[1120px] items-center
        px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
            <div className="flex justify-between items-center w-full">
                <span className="text-xs secondary-text-color font-light tracking-wide">
                    Built by John Patrick Soriaga, 2026.
                </span>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/jpsoriaga"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub className="size-6 secondary-text-color" />
                    </a>

                    <a
                        href="https://www.instagram.com/jpsoriaga_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="size-6 secondary-text-color" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

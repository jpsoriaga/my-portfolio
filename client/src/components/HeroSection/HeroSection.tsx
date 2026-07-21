import HoverParticles from "./HoverParticles";
import { Check } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import MyProfile from "@/assets/Hanni.jpeg";

gsap.registerPlugin(SplitText);

const EMAIL = "patricksoriaga14@gmail.com";

export default function HeroSection() {
    const [showToast, setShowToast] = useState(false);
    const toastTimer = useRef<number | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const copyRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        let split: SplitText | null = null;

        const ctx = gsap.context(() => {
            if (headingRef.current) {
                split = SplitText.create(headingRef.current, {
                    type: "words",
                });

                gsap.fromTo(
                    split.words,
                    { yPercent: 200 },
                    {
                        yPercent: 0,
                        duration: 1,
                        stagger: 0.04,
                        delay: 0.2,
                        ease: "power3.out",
                    }
                );
            }

            if (imageRef.current) {
                gsap.from(imageRef.current, {
                    y: 20,
                    opacity: 0,
                    filter: "blur(5px)",
                    duration: 0.6,
                    delay: 1.1,
                    ease: "power3.out",
                    clearProps: "filter,transform,opacity",
                });
            }

            if (aboutRef.current) {
                gsap.from(aboutRef.current, {
                    y: 20,
                    opacity: 0,
                    filter: "blur(5px)",
                    duration: 0.6,
                    delay: 1.25,
                    ease: "power3.out",
                    clearProps: "filter,transform,opacity",
                });
            }

            if (copyRef.current) {
                gsap.from(copyRef.current, {
                    y: 20,
                    opacity: 0,
                    filter: "blur(5px)",
                    duration: 0.6,
                    delay: 1.4,
                    ease: "power3.out",
                    clearProps: "filter,transform,opacity",
                });
            }
        });

        return () => {
            ctx.revert();
            split?.revert();
        };
    }, []);

    const copyEmail = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(EMAIL);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = EMAIL;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }

        setShowToast(true);

        if (toastTimer.current) {
            window.clearTimeout(toastTimer.current);
        }

        toastTimer.current = window.setTimeout(() => {
            setShowToast(false);
        }, 1800);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === "c" && !event.metaKey && !event.ctrlKey && !event.altKey) {
                void copyEmail();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);

            if (toastTimer.current) {
                window.clearTimeout(toastTimer.current);
            }
        };
    }, []);

    return (
        <>
            <section className="relative isolate h-auto w-full overflow-hidden pb-24 pt-32 sm:pb-28 lg:pb-32">
                <HoverParticles />

                <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">

                    <div className="flex max-w-[500px] flex-col gap-y-10 lg:max-w-[540px]">
                        <div className="flex w-fit flex-col gap-y-3">
                            <img ref={imageRef} src={MyProfile} alt="My Profile" className="w-20 h-20 object-cover rounded-md" data-particle-safe-zone />
                                    <h1 ref={headingRef} className="overflow-hidden text-2xl font-medium tracking-wide" data-particle-safe-zone>John Patrick Soriaga is a Web Developer.</h1>
                        </div>

                        <div data-particle-safe-zone>
                            <div ref={aboutRef}>
                                <span className="text-xs secondary-text-color">ABOUT</span>
                                <p className="text-justify tracking-wider pb-5">I’m a BSIT student focused on web development, building projects to strengthen my understanding
                                    of both frontend and backend systems. I enjoy creating responsive and user-friendly interfaces, and I’m currently learning the MERN stack to develop full-stack applications.</p>

                                <p className="text-justify tracking-wider pb-5">I’m always looking for opportunities to improve my skills and gain real-world experience. My goal is to become
                                     a reliable full-stack developer who builds practical and meaningful web applications.</p>
                            </div>

                            <div ref={copyRef}>
                                <span className="hidden md:inline-flex items-center gap-2 text-sm tracking-wider text-[#767676]">
                                    Press
                                    <button
                                        type="button"
                                        aria-label="Copy email"
                                        onClick={copyEmail}
                                        className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border
                                         border-black/10 bg-[#f2f2f2] px-1.5 text-xs font-medium text-[#1f1f1f] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.08)] transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:bg-[#e9e9e9]"
                                    >
                                        C
                                    </button>
                                    to copy my email
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <div
                aria-live="polite"
                className={`fixed bottom-15 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#1f1f1f] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-200 ease-out ${
                    showToast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
                }`}
            >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                Copied email
            </div>
        </> 
    );
}

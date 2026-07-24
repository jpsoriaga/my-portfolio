import AboutMe from "./AboutMe";
import Education from "./Education";
import Journey from "./Journey";
import Stack from "./Stack";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";


export default function About() {
    const aboutItemRefs = useRef<Array<HTMLDivElement | null>>([]);

    useLayoutEffect(() => {
        const aboutItems = aboutItemRefs.current.filter((item) => item !== null);

        const ctx = gsap.context(() => {
            gsap.from(aboutItems, {
                y: 20,
                opacity: 0,
                filter: "blur(5px)",
                duration: 0.5,
                delay: 0.1,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "filter,transform,opacity",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section className="relative isolate w-full overflow-visible pt-10">
                <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                        <div ref={(element) => {
                            aboutItemRefs.current[0] = element;
                        }}>
                            <AboutMe />
                        </div>
                        <div ref={(element) => {
                            aboutItemRefs.current[1] = element;
                        }}>
                            <Journey />
                        </div>
                        <div ref={(element) => {
                            aboutItemRefs.current[2] = element;
                        }}>
                            <Education />
                        </div>
                        <div ref={(element) => {
                            aboutItemRefs.current[3] = element;
                        }}>
                            <Stack />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

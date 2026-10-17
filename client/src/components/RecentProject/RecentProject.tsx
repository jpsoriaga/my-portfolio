import HackathonBanner from "./HackathonBanner";
import RecentProjectCard from "./RecentProjectCard";
import { projectsNewestFirst } from "./projects";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

let hasPlayedInitialProjectAnimation = false;

export default function RecentProject() {
    const projectCardRefs = useRef<Array<HTMLDivElement | null>>([]);

    useLayoutEffect(() => {
        const projectCards = projectCardRefs.current.filter((card) => card !== null);
        const delay = hasPlayedInitialProjectAnimation ? 0.1 : 1.85;

        const ctx = gsap.context(() => {
            gsap.from(projectCards, {
                y: 20,
                opacity: 0,
                filter: "blur(5px)",
                duration: 0.5,
                delay,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "filter,transform,opacity",
                onComplete: () => {
                    hasPlayedInitialProjectAnimation = true;
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative isolate w-full overflow-hidden pt-10">
            <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                <div className="mb-8 md:mb-10" ref={(element) => {
                    projectCardRefs.current[0] = element;
                }}>
                    <HackathonBanner />
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                    {projectsNewestFirst.map((project, index) => (
                        <div key={project.title} ref={(element) => {
                            projectCardRefs.current[index + 1] = element;
                        }}>
                            <RecentProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

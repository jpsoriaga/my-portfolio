import RecentProjectCard from "./RecentProjectCard";
import SubwayLogo from "@/assets/subway-logo.jpg"
import SmartSubway from "@/assets/smart-subway.png"
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function RecentProject() {
    const projectCardRefs = useRef<Array<HTMLDivElement | null>>([]);

    useLayoutEffect(() => {
        const projectCards = projectCardRefs.current.filter((card) => card !== null);

        const ctx = gsap.context(() => {
            gsap.from(projectCards, {
                y: 20,
                opacity: 0,
                filter: "blur(5px)",
                duration: 0.5,
                delay: 1.85,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "filter,transform,opacity",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative isolate w-full overflow-hidden pt-10">
            <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                <div className="grid grid-cols-2 gap-5">
                    <div ref={(element) => {
                        projectCardRefs.current[0] = element;
                    }}>
                        <RecentProjectCard logo={SubwayLogo} title="Smart Subway" year={2026} image={SmartSubway}
                            category="d ko pa alam" tags={["Not sure", "Sure"]} />
                    </div>
                    <div ref={(element) => {
                        projectCardRefs.current[1] = element;
                    }}>
                        <RecentProjectCard logo={SubwayLogo} title="Smart Subway" year={2026} image={SmartSubway}
                            category="d ko pa alam" tags={["Not sure", "Sure"]} />
                    </div>
                    <div ref={(element) => {
                        projectCardRefs.current[2] = element;
                    }}>
                        <RecentProjectCard logo={SubwayLogo} title="Smart Subway" year={2026} image={SmartSubway}
                            category="d ko pa alam" tags={["Not sure", "Sure"]} />
                    </div>
                    <div ref={(element) => {
                        projectCardRefs.current[3] = element;
                    }}>
                        <RecentProjectCard logo={SubwayLogo} title="Smart Subway" year={2026} image={SmartSubway}
                            category="d ko pa alam" tags={["Not sure", "Sure"]} />
                    </div>
                </div>
            </div>
        </section>
    );
}

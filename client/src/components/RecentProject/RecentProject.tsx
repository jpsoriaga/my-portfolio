import RecentProjectCard from "./RecentProjectCard";
import SubwayLogo from "@/assets/subway-logo.jpg"
import IlabCICTLogo from "@/assets/ilabcict-logo.png"

import SmartSubway from "@/assets/smart-subway-preview.jpg"
import IlabCICT from "@/assets/ilabcict-preview.jpg"

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

let hasPlayedInitialProjectAnimation = false;

export default function RecentProject() {
    const projectCardRefs = useRef<Array<HTMLDivElement | null>>([]);

    useLayoutEffect(() => {
        const projectCards = projectCardRefs.current.filter((card) => card !== null);
        const delay = hasPlayedInitialProjectAnimation ? 0.1 : 1.85;
        hasPlayedInitialProjectAnimation = true;

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
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative isolate w-full overflow-hidden pt-10">
            <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                    <div ref={(element) => {
                        projectCardRefs.current[0] = element;
                    }}>
                        <RecentProjectCard logo={SubwayLogo} title="Smart Subway" year={2026} image={SmartSubway}
                            category="Food & Beverage" tags={["POS System", "Dashboard", "Order Management"]} href="https://smart-subway-system.vercel.app/" />
                    </div>
                    <div ref={(element) => {
                        projectCardRefs.current[1] = element;
                    }}>
                        <RecentProjectCard logo={IlabCICTLogo} title="IlabCICT" year={2026} image={IlabCICT}
                            category="Laboratory Management" tags={["Ticket Management", "Laboratory Monitoring", "Technical Support"]} href="https://i-lab-cict-web.vercel.app/" />
                    </div>
                </div>
            </div>
        </section>
    );
}

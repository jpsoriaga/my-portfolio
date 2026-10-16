import RecentProjectCard from "./RecentProjectCard";
import SubwayLogo from "@/assets/subway-logo.jpg"
import IlabCICTLogo from "@/assets/ilabcict-logo.png"
import ChioraLogo from "@/assets/chiora-logo.png"
import LinewiseLogo from "@/assets/linewise-logo.png"
import ResiteLogo from "@/assets/resite-logo.svg"

import SmartSubway from "@/assets/smart-subway-mockup.png"
import IlabCICT from "@/assets/ilabcict-mockup.png"
import Chiora from "@/assets/chiora-mockup.png"
import Linewise from "@/assets/linewise-mockup.png"
import Resite from "@/assets/resite-mockup.png"

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Add new projects to the end of this list; they are displayed newest first.
const projects = [
    {
        logo: SubwayLogo, title: "Smart Subway", year: 2025, image: SmartSubway,
        category: "Food & Beverage", tags: ["POS System", "Dashboard", "Order Management"], href: "https://smart-subway-system.vercel.app/",
    },
    {
        logo: IlabCICTLogo, title: "IlabCICT", year: 2026, image: IlabCICT,
        category: "Laboratory Management", tags: ["Ticket Management", "Laboratory Monitoring", "Technical Support"], href: "https://i-lab-cict-web.vercel.app/",
    },
    {
        logo: ChioraLogo, title: "Chiora", year: 2026, image: Chiora,
        category: "Health & Fitness", tags: ["Workout Tracking", "Progress Tracking", "Live Activities"], href: "https://chiora-web.vercel.app/",
    },
    {
        logo: LinewiseLogo, title: "Linewise", year: 2026, image: Linewise,
        category: "Call Center QA", tags: ["Local AI", "Call Scoring", "Privacy Protection"], href: "https://github.com/Polstuds27/Linewise",
    },
    {
        logo: ResiteLogo, title: "Resite", year: 2026, image: Resite,
        category: "Portfolio Builder", tags: ["Resume Parsing", "AI Design", "Site Editor"], href: "https://resite-portfolio.vercel.app/",
    },
];

const projectsNewestFirst = [...projects].reverse();

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
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                    {projectsNewestFirst.map((project, index) => (
                        <div key={project.title} ref={(element) => {
                            projectCardRefs.current[index] = element;
                        }}>
                            <RecentProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

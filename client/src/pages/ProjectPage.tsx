import Footer from "@/components/Footer/Footer";
import { getNextProject, getProjectPath, type Project, type ProjectDetails } from "@/components/RecentProject/projects";
import { handleLinkClick } from "@/router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Trophy } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type ProjectPageProps = {
    project: Project & { details: ProjectDetails };
};

type ProjectSectionProps = {
    label: string;
    children: ReactNode;
};

function ProjectSection({ label, children }: ProjectSectionProps) {
    return (
        <section className="grid grid-cols-1 gap-y-3 md:grid-cols-3 md:gap-x-5">
            <h2 className="text-xs font-light secondary-text-color md:pt-1">{label}</h2>
            <div className="flex flex-col gap-y-5 tracking-wide md:col-span-2">{children}</div>
        </section>
    );
}

export default function ProjectPage({ project }: ProjectPageProps) {
    const { logo, title, year, image, badge, details } = project;
    const nextProject = getNextProject(project);
    const nextProjectPath = getProjectPath(nextProject);
    // Pair screenshots in two columns only when they share a shape; mixed shapes read better full width.
    const [firstScreenshot] = details.screenshots;
    const hasMatchingScreenshots = details.screenshots.every(
        (screenshot) => screenshot.width * firstScreenshot.height === firstScreenshot.width * screenshot.height,
    );
    const pageItemRefs = useRef<Array<HTMLElement | null>>([]);

    useEffect(() => {
        document.title = `${title} | John Patrick Soriaga`;
    }, [title]);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const pageItems = pageItemRefs.current.filter((item) => item !== null);

        const ctx = gsap.context(() => {
            gsap.from(pageItems, {
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

    const setPageItemRef = (index: number) => (element: HTMLElement | null) => {
        pageItemRefs.current[index] = element;
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-start">
            <main className="mx-auto flex w-full max-w-[1120px] flex-col gap-y-16 px-6 pt-10 sm:px-8 md:gap-y-20 md:px-10 md:pt-16 lg:px-14 xl:px-16 2xl:px-10">
                <header ref={setPageItemRef(0)} className="flex flex-col gap-y-6">
                    <a
                        href="/"
                        onClick={(event) => handleLinkClick(event, "/")}
                        className="group inline-flex w-fit items-center gap-x-1.5 text-sm font-light secondary-text-color transition-colors duration-300 hover:text-black"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                        All projects
                    </a>

                    <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                                <img src={logo} alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-md" />
                                <h1 className="text-2xl font-medium md:text-3xl">{title}</h1>
                                {badge && (
                                    <span className="inline-flex shrink-0 items-center gap-x-1 rounded-md bg-[#fafafa] px-2 py-0.5 text-xs font-light secondary-text-color">
                                        <Trophy className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <span className="shrink-0 text-sm font-light secondary-text-color">{year}</span>
                        </div>
                        <p className="font-light tracking-wide secondary-text-color md:text-lg">{details.summary}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {details.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-x-1 rounded-md px-3 py-1.5 text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.06)]"
                            >
                                {link.label}
                                <ArrowUpRight className="h-3.5 w-3.5 secondary-text-color transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:translate-x-px" strokeWidth={1.75} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </header>

                <div ref={setPageItemRef(1)} className="-mt-6 flex flex-col gap-y-10 md:-mt-8">
                    <div className="aspect-[1200/783] overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.06)]">
                        <img src={image} alt={`${title} project preview`} decoding="async" className="h-full w-full object-cover" />
                    </div>

                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
                        {details.facts.map((fact) => (
                            <div key={fact.label} className="flex flex-col gap-y-1.5">
                                <dt className="text-xs font-light secondary-text-color">{fact.label}</dt>
                                <dd className="text-sm tracking-wide">{fact.value}</dd>
                            </div>
                        ))}
                        <div className="flex flex-col gap-y-1.5 sm:col-span-2 md:col-span-1">
                            <dt className="text-xs font-light secondary-text-color">STACK</dt>
                            <dd className="flex flex-wrap gap-1.5">
                                {details.stack.map((item) => (
                                    <span key={item} className="rounded-md bg-[#fafafa] px-2 py-0.5 text-xs font-light secondary-text-color">
                                        {item}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div ref={setPageItemRef(2)}>
                    <ProjectSection label="THE PROBLEM">
                        {details.problem.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </ProjectSection>
                </div>

                <div ref={setPageItemRef(3)}>
                    <ProjectSection label={details.isTeamProject ? "WHAT WE BUILT" : "WHAT I BUILT"}>
                        <p>{details.overview}</p>
                        <ul className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                            {details.features.map((feature) => (
                                <li key={feature.title} className="flex flex-col gap-y-1">
                                    <span className="font-medium">{feature.title}</span>
                                    <span className="text-sm font-light secondary-text-color">{feature.description}</span>
                                </li>
                            ))}
                        </ul>
                    </ProjectSection>
                </div>

                <div ref={setPageItemRef(4)}>
                    <ProjectSection label="CHALLENGES & LEARNINGS">
                        {details.challenges.map((challenge) => (
                            <div key={challenge.title} className="flex flex-col gap-y-1">
                                <span className="font-medium">{challenge.title}</span>
                                <p className="font-light secondary-text-color">{challenge.description}</p>
                            </div>
                        ))}
                    </ProjectSection>
                </div>

                {details.outcome && (
                    <div ref={setPageItemRef(5)}>
                        <ProjectSection label="OUTCOME">
                            <ul className="flex flex-col gap-y-3">
                                {details.outcome.map((item) => (
                                    <li key={item} className="flex gap-x-3">
                                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#9d9996]" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </ProjectSection>
                    </div>
                )}

                <section ref={setPageItemRef(6)} className="flex flex-col gap-y-5">
                    <h2 className="text-xs font-light secondary-text-color">SCREENSHOTS</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                        {details.screenshots.map((screenshot, index) => (
                            <figure key={screenshot.image} className={`flex flex-col gap-y-3 ${index === 0 || !hasMatchingScreenshots ? "md:col-span-2" : ""}`}>
                                <div className="overflow-hidden rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.06)]">
                                    <img
                                        src={screenshot.image}
                                        alt={screenshot.caption}
                                        width={screenshot.width}
                                        height={screenshot.height}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-auto w-full"
                                    />
                                </div>
                                <figcaption className="text-sm font-light tracking-wide secondary-text-color">{screenshot.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                {nextProject.slug !== project.slug && (
                    <section ref={setPageItemRef(7)} className="border-t border-black/[0.06] pt-10 md:pt-14">
                        <a
                            href={nextProject.details ? nextProjectPath : nextProject.href}
                            onClick={nextProject.details ? (event) => handleLinkClick(event, nextProjectPath) : undefined}
                            target={nextProject.details ? undefined : "_blank"}
                            rel={nextProject.details ? undefined : "noopener noreferrer"}
                            aria-label={`Next project: ${nextProject.title}`}
                            className="group flex items-end justify-between gap-6"
                        >
                            <div className="flex min-w-0 flex-col gap-y-3">
                                <span className="text-xs font-light secondary-text-color">NEXT PROJECT</span>
                                <div className="flex min-w-0 items-center gap-x-3">
                                    <img src={nextProject.logo} alt="" width={32} height={32} loading="lazy" decoding="async" className="h-7 w-7 shrink-0 rounded-md md:h-8 md:w-8" />
                                    <span className="truncate text-2xl font-medium md:text-3xl">{nextProject.title}</span>
                                </div>
                                <p className="font-light tracking-wide secondary-text-color">
                                    {nextProject.details?.summary ?? nextProject.category}
                                </p>
                            </div>
                            <ArrowRight className="mb-1 h-6 w-6 shrink-0 secondary-text-color transition duration-300 ease-out group-hover:translate-x-1 group-hover:text-black motion-reduce:transition-none" strokeWidth={1.5} aria-hidden="true" />
                        </a>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}

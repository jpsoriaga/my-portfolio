
import { Trophy } from "lucide-react";
import ProjectImageHover from "./ProjectImageHover";

type RecentProjectCardProps = {
    logo: string;
    title: string;
    year: number;
    image: string;
    category: string;
    tags: string[];
    href: string;
    badge?: string;
}

export default function RecentProjectCard({ logo, title, year, image, category, tags, href, badge }: RecentProjectCardProps) {
    return (
        <>
            <div className="group flex w-full min-w-0 flex-col gap-y-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-x-2">
                        <img src={logo} alt="System Logo" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-6 shrink-0 rounded-sm" />
                        <h1 className="truncate text-base sm:text-lg">{title}</h1>
                        {badge && (
                            <span className="inline-flex shrink-0 items-center gap-x-1 rounded-md bg-[#fafafa] px-2 py-0.5 text-xs font-light secondary-text-color">
                                <Trophy className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                                {badge}
                            </span>
                        )}
                    </div>
                    <span className="shrink-0 text-sm font-light secondary-text-color">{year}</span>
                </div>

                <a href={href} target="_blank" rel="noopener noreferrer">
                    <ProjectImageHover image={image} alt={`${title} project preview`} />
                </a>

                <h1>{category}</h1>
                <div className="flex flex-wrap gap-2">  
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md bg-[#fafafa] px-3 py-1 text-sm font-light secondary-text-color"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

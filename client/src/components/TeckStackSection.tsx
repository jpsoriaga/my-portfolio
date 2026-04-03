import { ChevronRight } from 'lucide-react';

export default function TechStackSection() {

    const TechStackCard = ({ techStack }: { techStack: string }) => {
        return (
            <div className=" shadow-xs py-2 px-3 rounded-xs flex items-center justify-center">
                <span className=" dark:text-white text-xs">{techStack}</span>
            </div>
        );
    }

    return (
        <>
            <div className="dark-bg-container animate-fade-up shadow-xs-bottom p-4">
                <div className="flex items-center justify-between ">
                    <h1 className="dark:text-white text-lg font-semibold">Tech Stack</h1>

                    <button className="flex items-center justify-center gap-x-1 cursor-pointer">
                        <span className="dark:text-white text-xs">View All</span>
                        <ChevronRight size={14} />
                    </button>

                </div>

                <div className="flex flex-col gap-y-3.5 mb-4 mt-3">
                    <h2 className="dark:text-white text-sm font-semibold">Frontend</h2>
                    <div className="flex gap-x-2">
                        <TechStackCard techStack="JavaScript" />
                        <TechStackCard techStack="TypeScript" />
                        <TechStackCard techStack="React" />
                        <TechStackCard techStack="Tailwind CSS" />
                    </div>

                    <h2 className="dark:text-white text-sm font-semibold mt-2">Backend</h2>
                    <div className="flex gap-x-2">
                        <TechStackCard techStack="Node.js" />
                        <TechStackCard techStack="Express.js" />
                        <TechStackCard techStack="NestJS" />
                        <TechStackCard techStack="Java" />
                        <TechStackCard techStack="MongoDB" />
                        <TechStackCard techStack="MySQL" />
                    </div>

                    <h2 className="dark:text-white text-sm font-semibold mt-2">Developer Tools</h2>
                    <div className="flex gap-x-2">
                        <TechStackCard techStack="Git" />
                        <TechStackCard techStack="GitHub" />
                        <TechStackCard techStack="VS Code" />
                        <TechStackCard techStack="Figma" />
                        <TechStackCard techStack="Trello" />
                        <TechStackCard techStack="Teams" />
                    </div>

                </div>
            </div>
        </>
    );
}
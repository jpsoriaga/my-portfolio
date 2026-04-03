import { ChevronRight } from "lucide-react";

export default function ProjectSection() {

    type ProjectInfo = {
        title: string;
        role: string;
        link: string;
    };

    const ProjectCard = ({ title, role, link }: ProjectInfo) => {

        return (
            <button onClick={() => window.open("https://seek-ict.vercel.app/", "_blank")} className="flex cursor-pointer w-full flex-col items-start">
                <h3 className=" dark:text-white text-sm font-medium mb-1.5">{title}</h3>
                <p className="dark:text-white text-xs mb-1">{role}</p>
                <div className="dark:bg-gray-800 bg-[#f3f4f6] px-2 py-1.5 rounded-xs flex items-center justify-center">
                    <span className="dark:text-white text-xs text tracking-wider">{link}</span>
                </div>
            </button>
        );
    }

    return (
        <>
            <div className="dark-bg-container animate-fade-up shadow-xs-bottom p-4">
                <div className="flex items-center justify-between">
                    <h1 className=" dark:text-white text-lg font-semibold">Recent Projects</h1>

                    <button className="flex items-center justify-center gap-x-1 cursor-pointer">
                        <span className="dark:text-white text-xs">View All</span>
                        <ChevronRight className="dark:text-white" size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="hover-button p-2.5 flex items-center">
                        <ProjectCard title="Smart Subway System" role="Fullstack Developer" link="no link" />
                    </div>

                    <div className="hover-button p-2.5 flex items-center">
                        <ProjectCard title="SeekICT" role="Frontend Developer" link="seek-ict.vercel.app" />
                    </div>

                    <div className="hover-button p-2.5 flex items-center">
                        <ProjectCard title="Project 1" role="Frontend Developer" link="facebook.com" />
                    </div>

                    <div className="hover-button p-2.5 flex items-center">
                        <ProjectCard title="Project 1" role="Frontend Developer" link="facebook.com" />
                    </div>
                </div>

            </div>
        </>
    );
}
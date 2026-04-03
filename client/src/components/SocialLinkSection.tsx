import GitHub from "../assets/github.png"
import Instagram from "../assets/instagram.png"
import GitHubWhite from "../assets/github-white.png"
import InstagramWhite from "../assets/instagram-white.png"
import { ChevronRight } from 'lucide-react';
import { useEffect } from "react";

export default function SocialLinkSection({ dark }: { dark: boolean }) {

    useEffect(()=> {
        document.title = "John Patrick Soriaga - Portfolio";
    }, []);

    return (
        <>
            <div className="dark-bg-container hover:-translate-y-2 shadow-xs-bottom max-w-[280px] p-4 animate-fade-up">
                <h1 className="dark:text-white text-lg font-semibold mb-3">Social Links</h1>

                <div className="flex flex-col gap-y-5">
                    <button onClick={() => window.open("https://github.com/jpsoriaga", "_blank")} className="flex cursor-pointer items-center justify-between">
                        <div className="flex items-center gap-x-2">
                        <img src={dark ? GitHubWhite : GitHub} alt="GitHub" className="w-9 h-9 object-cover" />
                        <div className="flex items-start flex-col">
                            <span className=" dark:text-white text-sm font-medium">GitHub</span>
                            <span className="dark:text-white text-xs">@jpsoriaga</span>
                        </div>
                    </div>
                    <ChevronRight className="dark:text-white" size={16} />
                    </button>


                    <button onClick={() => window.open("https://www.instagram.com/jpsoriaga_/", "_blank")} className="flex cursor-pointer items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <img src={dark ? InstagramWhite : Instagram} alt="Instagram" className="w-9 h-9 object-cover" />
                            <div className="flex items-start flex-col">
                                <span className=" dark:text-white text-sm font-medium">Instagram</span>
                                <span className="dark:text-white text-xs">@jpsoriaga_</span>
                            </div>
                        </div>
                        <ChevronRight className="dark:text-white" size={16} />
                    </button>
                    </div>

                </div>
        
        </>
    );
}
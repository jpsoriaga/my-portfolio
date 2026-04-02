import GitHub from "../assets/github.png"
import Instagram from "../assets/instagram.png"
import { ChevronRight } from 'lucide-react';

export default function SocialLinkSection() {
    return (
        <>
            <div className="shadow-xs-bottom max-w-[280px] p-4 animate-fade-up">
                <h1 className="text-lg font-semibold mb-3">Social Links</h1>

                <div className="flex flex-col gap-y-5">
                    <button className="flex cursor-pointer items-center justify-between">
                        <div className="flex items-center gap-x-2">
                        <img src={GitHub} alt="GitHub" className="w-9 h-9 object-cover" />
                        <div className="flex items-start flex-col">
                            <span className="text-sm font-medium">GitHub</span>
                            <span className="text-xs">@Lumiere0314</span>
                        </div>
                    </div>
                    <ChevronRight size={16} />
                    </button>


                    <button className="flex cursor-pointer items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <img src={Instagram} alt="Instagram" className="w-9 h-9 object-cover" />
                            <div className="flex items-start flex-col">
                                <span className="text-sm font-medium">Instagram</span>
                                <span className="text-xs">@jpsoriaga_</span>
                            </div>
                        </div>
                        <ChevronRight size={16} />
                    </button>
                    </div>

                </div>
        
        </>
    );
}
import { useState } from "react";
import MyProfile from "../assets/Hanni.jpeg"
import { MapPin, Mail, FileText, Sun, Moon } from 'lucide-react';


export default function HeroSection() {

    const [dark, setDark] = useState(false);

    const toggleTheme =  () => {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
    };

    return(
        <>
            <div className="flex w-full gap-x-5 animate-fade-up">
                <img src={MyProfile} alt="My Profile" className="w-[160px] h-[160px] object-cover" />
                
                <div className="flex flex-col w-full pr-5 gap-y-1">

                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">John Patrick Soriaga</h1>

                        <button onClick={toggleTheme} className="bg-[#d1d5dc] cursor-pointer relative flex items-center w-15 h-7 p-0.5">
                        <div className={`flex items-center justify-center top-1 left-1 w-7 h-6 bg-white transform transition duration-200 ${dark ? "translate-x-7" : ""}`}>
                            <Sun size={16} className={`z-10 ${dark ? "hidden" : ""}`} />
                            <Moon size={16} className={`z-10 ${dark ? "" : "hidden"}`} />
                        </div>

                        </button>

                    </div>

                    <div>
                        <MapPin className="inline-block mr-1" size={14} />
                        <span className="text-sm">Bulacan, Philippines</span>
                    </div>

                    <h1 className="font-normal tracking-wide my-3">BSIT Student <span className="text-gray-400">\</span> Aspiring Web Developer</h1>

                    <div className="flex gap-x-3">
                        <button className="flex items-center justify-center gap-x-2 bg-black py-2 px-3 rounded-xs cursor-pointer">
                            <FileText className="text-white" size={14} />
                            <span className="text-sm text-white">View Resume</span>
                        </button>

                        <button className="flex items-center justify-center gap-x-2 py-2 px-3 rounded-xs shadow-sm cursor-pointer">
                            <Mail size={14} />
                            <span className="text-sm">Send Email</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
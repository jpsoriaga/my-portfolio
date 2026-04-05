import MyProfile from "../assets/Hanni.jpeg"
import { MapPin, Mail, FileText, Sun, Moon } from 'lucide-react';

type ThemeToggleProps = {
    dark: boolean;
    setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeroSection({ dark, setDark }: ThemeToggleProps) {

    return (
        <>
            <div className="flex w-full gap-x-5 animate-fade-up">
                <img src={MyProfile} alt="My Profile" className="w-[148px] h-[148px] md:w-[160px] md:h-[160px] object-cover" />

                <div className="flex flex-col w-full gap-y-1">

                    <div className="flex justify-between">
                        <h1 className="dark:text-white text-base md:text-xl font-semibold">John Patrick Soriaga</h1>

                        <button onClick={() => setDark(!dark)} className="dark:bg-[#4b5563] bg-[#d1d5dc] cursor-pointer relative flex items-center w-15 h-7 p-0.5">
                            <div className={`flex items-center justify-center top-1 left-1 w-7 h-6 bg-white transform transition duration-200 ${dark ? "translate-x-7" : ""}`}>
                                <Sun size={16} className={`z-10 ${dark ? "hidden" : ""}`} />
                                <Moon size={16} className={`z-10 ${dark ? "" : "hidden"}`} />
                            </div>

                        </button>

                    </div>

                    <div>
                        <MapPin className="dark:text-white inline-block mr-1" size={14} />
                        <span className="dark:text-white text-xs md:text-sm">Bulacan, Philippines</span>
                    </div>

                    <h1 className="dark:text-white font-normal text-xs md:text-base tracking-wide my-3">BSIT Student <span className="text-gray-400">\</span> Aspiring Web Developer</h1>

                    <div className="flex  md:flex-row gap-y-2 gap-x-1 md:gap-x-3">
                        <button className="dark:bg-white flex hover-button hover:shadow-none items-center justify-center gap-x-2 bg-black py-2 px-3 rounded-xs cursor-pointer">
                            <FileText className="dark:text-black text-white" size={14} />
                            <span className="dark:text-black text-xs md:text-sm text-white">
                                <span className="md:hidden">Resume</span>
                                <span className="hidden md:inline">View Resume</span>
                            </span>
                        </button>

                        <button onClick={() => window.open("mailto:patricksoriaga14@gmail.com?subject=Hello&body=Hi, I want to contact you", "_blank")}
                            className="dark:bg-black flex hover-button items-center justify-center gap-x-2 py-2 px-3 rounded-xs shadow-xs-bottom cursor-pointer">
                            <Mail className="dark:text-white" size={14} />
                            <span className="dark:text-white text-xs md:text-sm">
                                <span className="md:hidden">Email</span>
                                <span className="hidden md:inline">Send Email</span>
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}
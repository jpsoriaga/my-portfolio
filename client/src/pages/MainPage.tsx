import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TechStackSection from "../components/TeckStackSection";
import EducationSection from "../components/EducationSection";
import CertificateSection from "../components/CertificateSection";
import SocialLinkSection from "../components/SocialLinkSection";
import ProjectSection from "../components/ProjectSection";
import { useEffect, useRef, useState } from "react";

export default function MainPage() {

    useEffect(() => {
        document.title = "John Patrick Soriaga | Portfolio";
    }, []);

    const [dark, setDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });
    const [isMoreThan5Lines, setIsMoreThan5Lines] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const style = window.getComputedStyle(el);

        const lineHeight = parseFloat(style.lineHeight);
        const height = el.scrollHeight;

        const lines = Math.ceil(height / lineHeight);

        console.log("Lines:", lines);

        if (lines >= 6) {
            setIsMoreThan5Lines(true);
        }
    }, []);

    return (
        <>
            {/* Mobile View */}
            <div className="grid grid-cols-1 gap-y-3 px-4 my-10 md:hidden">
                <div className="mb-2">
                    <HeroSection dark={dark} setDark={setDark} />
                </div>
                <AboutSection textRef={textRef} isMoreThan5Lines={isMoreThan5Lines} />

                <EducationSection />
                <SocialLinkSection dark={dark} />
                <TechStackSection isMoreThan5Lines={isMoreThan5Lines} />
                <ProjectSection />
                <CertificateSection />
            </div>

            {/* Desktop View */}
            <div className="hidden dark:bg-black md:grid md:grid-cols-[1fr_280px] gap-x-3 max-w-[880px] px-5 my-10 mx-auto ">

                <div className="order-1 col-span-2 mb-5">
                    <HeroSection dark={dark} setDark={setDark} />
                </div>

                <div className="flex flex-col gap-y-3 order-2">
                    <AboutSection textRef={textRef} isMoreThan5Lines={isMoreThan5Lines} />
                    <TechStackSection isMoreThan5Lines={isMoreThan5Lines} />
                </div>


                <div className="flex flex-col gap-y-3 order-3">
                    <EducationSection />
                    <SocialLinkSection dark={dark} />

                </div>

                <div className="flex gap-x-3 order-4 mt-3 col-span-2">
                    <div className="w-[60%]">
                        <ProjectSection />
                    </div>

                    <div className="w-[40%]">
                        <CertificateSection />
                    </div>

                </div>

            </div>
        </>
    );
}
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TechStackSection from "../components/TeckStackSection";
import EducationSection from "../components/EducationSection";
import CertificateSection from "../components/CertificateSection";
import SocialLinkSection from "../components/SocialLinkSection";
import ProjectSection from "../components/ProjectSection";
import { useEffect, useState } from "react";

export default function MainPage() {
    const [dark, setDark] = useState(false);

    useEffect(()=> {
        const root = document.documentElement;

        if(dark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [dark]);

    return (
        <>
            <div className="dark:bg-black grid grid-cols-1 md:grid-cols-[1fr_280px] gap-x-3 max-w-[880px] my-10 mx-auto ">

                <div className="order-1 col-span-2 mb-5">
                    <HeroSection dark={dark} setDark={setDark} />
                </div>

                <div className="flex flex-col gap-y-3 order-2">
                    <AboutSection />
                    <TechStackSection />
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
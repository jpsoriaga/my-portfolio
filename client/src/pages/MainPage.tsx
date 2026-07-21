import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/HeroSection/HeroSection";
import Navigation, { type NavigationItem } from "@/components/Navigation/Navigation";
import RecentProject from "@/components/RecentProject/RecentProject";
import { useEffect, useState } from "react";

export default function MainPage() {
    const [activeNavigation, setActiveNavigation] = useState<NavigationItem>("Project");

    useEffect(() => {
        document.title = "John Patrick Soriaga | Portfolio"
    }, []);

    return(
        <>
            <div className="flex flex-col min-h-screen w-full items-start">
                <HeroSection />
                <div className="mx-auto w-full max-w-[1120px] px-6 pt-8 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                    <Navigation
                        activeItem={activeNavigation}
                        onNavigationChange={setActiveNavigation}
                    />
                </div>
                {activeNavigation === "Project" && <RecentProject />}
                {activeNavigation === "About" && <About />}
                <Footer />
            </div>
        </>
    );
}

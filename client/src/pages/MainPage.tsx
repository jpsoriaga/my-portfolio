import HeroSection from "@/components/HeroSection/HeroSection";
import { useEffect } from "react";

export default function MainPage() {

    useEffect(() => {
        document.title = "John Patrick Soriaga | Portfolio"
    }, []);

    return(
        <>
            <div className="flex min-h-screen w-full items-start">
                <HeroSection />
            </div>
        </>
    );
}

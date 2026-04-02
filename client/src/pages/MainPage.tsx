import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TechStack from "../components/TechStack";

export default function MainPage() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-x-3 max-w-[880px] my-10 mx-auto h-auto">

                <div className="order-1 col-span-2 mb-5">
                    <HeroSection />
                </div>

                <div className="flex flex-col gap-y-3 order-2">
                    <AboutSection />
                    <TechStack />
                </div>

                <div className="flex flex-col bg-yellow-100 order-3">
                    <span className="order-3 max-w-[280px] animate-fade-up animate-duration-1300">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quod ullam adipisci deleniti animi vel, quibusdam mollitia aut beatae sapiente. Eum obcaecati eaque expedita sed iure nostrum libero magnam odio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi aut qui sunt. Harum ducimus quidem quae temporibus iure distinctio magnam assumenda quo reiciendis cupiditate rerum, voluptatem excepturi commodi tempore tenetur.
                </span>
                </div>

            </div>
        </>
    );
}
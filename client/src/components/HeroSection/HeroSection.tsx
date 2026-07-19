import HoverParticles from "./HoverParticles";

export default function HeroSection() {
    return (
        <>
            <section className="relative isolate overflow-hidden h-100">
                <HoverParticles />

                <div className="relative z-10">
                    {/* your existing hero content */}
                </div>
            </section>
        </>
    );
}
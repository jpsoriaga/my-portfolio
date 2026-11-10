import CubeBand from "./CubeBand";
import FragranceShelf from "./FragranceShelf";
import OutsideWork from "./OutsideWork";
import PhotoStack from "./PhotoStack";
import SiameseCat from "./SiameseCat";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Personal() {
    const outsideWorkRef = useRef<HTMLDivElement | null>(null);
    const photoStackRef = useRef<HTMLDivElement | null>(null);
    const fragranceShelfRef = useRef<HTMLDivElement | null>(null);
    const cubeBandRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({ delay: 0.1 });

            timeline.from(outsideWorkRef.current, {
                y: 20,
                opacity: 0,
                filter: "blur(5px)",
                duration: 0.5,
                ease: "power3.out",
                clearProps: "filter,transform,opacity",
            });

            timeline.from(photoStackRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                clearProps: "transform,opacity",
            }, "-=0.42");

            timeline.from(fragranceShelfRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                clearProps: "transform,opacity",
            }, "-=0.42");

            timeline.from(cubeBandRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                clearProps: "transform,opacity",
            }, "-=0.42");
        });

        return () => ctx.revert();
    }, []);

    return(
        <>
            <section className="relative isolate w-full overflow-visible pt-10">
                <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                        <div className="flex flex-col gap-y-5">
                            <div ref={outsideWorkRef} data-cat-perch>
                                <OutsideWork />
                            </div>
                            <div ref={fragranceShelfRef} data-cat-perch>
                                <FragranceShelf />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-y-8">
                            <div ref={photoStackRef}>
                                <PhotoStack />
                            </div>
                            <div ref={cubeBandRef} data-cat-perch>
                                <CubeBand />
                            </div>
                        </div>
                    </div>
                    <SiameseCat />
                </div>
            </section>
        </>
    );
}

import HoverParticles from "./HoverParticles";
import MyProfile from "@/assets/Hanni.jpeg"

export default function HeroSection() {
    return (
        <>
            <section className="relative isolate h-auto w-full overflow-hidden pb-30">
                <HoverParticles />

                <div className="relative z-10 mx-auto mt-20 max-w-[500px]">

                    <div className="flex flex-col gap-y-10">
                        <div className="flex w-fit flex-col gap-y-3" data-particle-safe-zone>
                            <img src={MyProfile} alt="My Profile" className="w-20 h-20 object-cover rounded-md" />
                            <div>
                                <h1>John Patrick Soriaga</h1>
                                <h3 className="secondary-text-color text-sm">Web Developer</h3>
                            </div>
                        </div>

                        <div data-particle-safe-zone>
                            <span className="text-xs secondary-text-color">ABOUT</span>
                            <p className="text-justify tracking-wide pb-5">I’m a BSIT student focused on web development, building projects to strengthen my understanding
                                of both frontend and backend systems. I enjoy creating responsive and user-friendly interfaces, and I’m currently learning the MERN stack to develop full-stack applications.</p>

                            <p className="text-justify tracking-wide">I’m always looking for opportunities to improve my skills and gain real-world experience. My goal is to become a reliable full-stack developer who builds practical and meaningful web applications.</p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

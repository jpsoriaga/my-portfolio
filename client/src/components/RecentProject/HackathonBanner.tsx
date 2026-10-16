import { Arrow, CardShell, ParticleField } from "@/components/About/Certifications";
import AppBuildersPHLogo from "@/assets/appbuildersph-logo.png";

export default function HackathonBanner() {
    return (
        <CardShell
            url="https://appbuildersph.com/hackathon/"
            className="items-center justify-between gap-4 bg-[#f1faf3] p-4 sm:px-6 sm:py-5 hover:shadow-[0_0_0_1px_rgba(47,158,91,0.18),0_6px_12px_rgba(47,158,91,0.08)]"
        >
            <div className="absolute inset-0">
                <ParticleField seed={6} width={1120} height={120} mask="radial-gradient(ellipse 30% 90% at 85% 50%, black 30%, transparent 100%)" />
            </div>
            <div className="relative flex min-w-0 flex-col gap-y-1">
                <span className="text-xs font-light secondary-text-color">6TH PLACE · LOCAL AI TRACK</span>
                <h2>AppBuildersPH Hackathon 2026</h2>
                <p className="secondary-text-color font-light tracking-wide">
                    Linewise · Team Busseng · out of 1,200+ developers and 400+ teams
                </p>
            </div>
            <div className="relative flex shrink-0 items-center gap-x-4 sm:gap-x-6">
                <img
                    src={AppBuildersPHLogo}
                    alt="AppBuildersPH"
                    width={144}
                    height={54}
                    loading="lazy"
                    decoding="async"
                    className="hidden w-28 -rotate-3 drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)] transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-105 motion-reduce:transition-none sm:block md:w-36"
                />
                <Arrow />
            </div>
        </CardShell>
    );
}

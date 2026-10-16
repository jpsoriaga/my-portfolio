import { ArrowUpRight } from "lucide-react";
import CursorPill from "@/components/HoverCursor/CursorPill";
import useCursorFollow from "@/components/HoverCursor/useCursorFollow";
import { useMemo, type CSSProperties, type ReactNode } from "react";

type Certification = {
    title: string;
    issuer: string;
    year: string;
    url?: string;
};

type Particle = {
    x: number;
    y: number;
    size: number;
    angle: number;
    color: string;
    shape: "dot" | "dash" | "star";
};

// `url` is optional: cards without one are not clickable and show no arrow.
const certifications: Certification[] = [
    {
        title: "AppBuildersPH Hackathon 2026",
        issuer: "AppBuildersPH · Team Busseng",
        year: "2026",
        url: "/certificates/appbuildersph-hackathon-2026.pdf",
    },
    {
        title: "IT Specialist: Python",
        issuer: "Certiport, a Pearson VUE business",
        year: "2026",
        url: "/certificates/it-specialist-python.pdf",
    },
    {
        title: "Salesforce Supported Virtual Internship Program",
        issuer: "SmartBridge Educational Services",
        year: "2025",
        url: "/certificates/salesforce-virtual-internship.pdf",
    },
    {
        title: "CodeCraft: Mastering Essential Tools for Modern Software Development",
        issuer: "Bulacan State University CICT and SWITS",
        year: "2025",
        url: "/certificates/codecraft.jpg",
    },
];

// Same palette and shapes as the hero particles.
const particleColors = ["#ff671f", "#f3c72d", "#2bb673", "#159bd3", "#6172f3", "#9b6df3", "#e84d9a", "#ed3b43"];
const particleShapes: Particle["shape"][] = ["dot", "dash", "star"];
const PARTICLE_GAP = 22;

function buildParticles(seed: number, width: number, height: number): Particle[] {
    let state = seed * 9973 + 1;
    const random = () => {
        state = (state * 16807) % 2147483647;
        return state / 2147483647;
    };
    const particles: Particle[] = [];

    for (let y = 12; y < height; y += PARTICLE_GAP) {
        for (let x = 10; x < width; x += PARTICLE_GAP) {
            particles.push({
                x: x + (random() - 0.5) * 6,
                y: y + (random() - 0.5) * 6,
                size: 1.8 + random() * 2.2,
                angle: random() * 360,
                color: particleColors[Math.floor(random() * particleColors.length)],
                shape: particleShapes[Math.floor(random() * particleShapes.length)],
            });
        }
    }

    return particles;
}

function getStarPoints(size: number) {
    return Array.from({ length: 10 }, (_, index) => {
        const radius = index % 2 === 0 ? size : size * 0.25;
        const angle = -Math.PI / 2 + (index * Math.PI) / 5;

        return `${(Math.cos(angle) * radius).toFixed(2)},${(Math.sin(angle) * radius).toFixed(2)}`;
    }).join(" ");
}

const particleClassName = "origin-center text-[#827e76] opacity-40 transition duration-500 ease-out [transform-box:fill-box] group-hover:scale-150 group-hover:text-[color:var(--particle-color)] group-hover:opacity-100 group-focus-visible:scale-150 group-focus-visible:text-[color:var(--particle-color)] group-focus-visible:opacity-100 motion-reduce:transition-none";

type ParticleFieldProps = {
    seed: number;
    width?: number;
    height?: number;
    mask?: string;
};

export function ParticleField({ seed, width = 330, height = 112, mask }: ParticleFieldProps) {
    const particles = useMemo(() => buildParticles(seed, width, height), [seed, width, height]);

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMinYMin slice"
            className="h-full w-full"
            style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
            aria-hidden="true"
        >
            {particles.map((particle, index) => (
                <g key={index} transform={`translate(${particle.x.toFixed(1)} ${particle.y.toFixed(1)}) rotate(${particle.angle.toFixed(0)})`}>
                    <g
                        className={particleClassName}
                        style={{
                            "--particle-color": particle.color,
                            transitionDelay: `${(index % 8) * 25}ms`,
                        } as CSSProperties}
                    >
                        {particle.shape === "dot" && <circle r={particle.size * 0.55} fill="currentColor" />}
                        {particle.shape === "dash" && (
                            <line x1={-particle.size} x2={particle.size} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
                        )}
                        {particle.shape === "star" && <polygon points={getStarPoints(particle.size)} fill="currentColor" />}
                    </g>
                </g>
            ))}
        </svg>
    );
}

const shellClassName = "group relative flex h-full overflow-hidden rounded-md transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 motion-reduce:transition-none";

type CardShellProps = {
    url?: string;
    className: string;
    children: ReactNode;
};

export function CardShell({ url, className, children }: CardShellProps) {
    const { isHoverable, isHovered, cursorRef, pointerHandlers } = useCursorFollow<HTMLAnchorElement>();

    if (!url) {
        return <div className={`${shellClassName} ${className}`}>{children}</div>;
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${shellClassName} ${className} ${isHoverable ? "cursor-none" : ""}`}
            {...pointerHandlers}
        >
            {children}
            {isHoverable && <CursorPill ref={cursorRef} label="View" isVisible={isHovered} />}
        </a>
    );
}

export function Arrow({ className = "h-4 w-4 text-[#9d9996]" }: { className?: string }) {
    return (
        <ArrowUpRight
            className={`shrink-0 transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black group-focus-visible:text-black ${className}`}
            strokeWidth={1.75}
            aria-hidden="true"
        />
    );
}

type CertificationCardProps = Certification & {
    seed: number;
};

function CertificationCard({ title, issuer, year, url, seed }: CertificationCardProps) {
    return (
        <CardShell
            url={url}
            className="min-h-[190px] flex-col justify-between gap-y-10 bg-[#fafafa] p-4 hover:bg-white hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.06)]"
        >
            <div className="absolute inset-0">
                <ParticleField seed={seed} height={230} mask="radial-gradient(circle at 100% 100%, black 10%, transparent 65%)" />
            </div>
            <div className="relative flex items-start justify-between gap-3">
                <div className="flex flex-col gap-y-0.5">
                    <h2>{title}</h2>
                    <p className="secondary-text-color font-light tracking-wide">{issuer}</p>
                </div>
                {url && <Arrow className="mt-1 h-4 w-4 text-[#9d9996]" />}
            </div>
            <span className="relative text-sm font-light secondary-text-color">{year}</span>
        </CardShell>
    );
}

export default function Certifications() {
    return(
        <>
            <div className="flex flex-col gap-y-4">
                <span className="text-xs font-light secondary-text-color">CERTIFICATIONS</span>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((certification, index) => (
                        <li key={index}>
                            <CertificationCard {...certification} seed={index + 1} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

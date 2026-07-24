import type { CSSProperties } from "react";

const photos = [
    {
        className: "left-[-4px] top-1 bg-[radial-gradient(circle_at_70%_20%,#fef3c7_0_18%,transparent_19%),linear-gradient(145deg,#60a5fa,#22c55e_58%,#14532d)]",
        label: "Placeholder landscape photo",
        rotation: "-2deg",
        y: "0px",
    },
    {
        className: "left-[30%] top-[-8px] bg-[linear-gradient(180deg,#bfdbfe_0_42%,#64748b_43%_48%,#1e293b_49%_100%)]",
        label: "Placeholder mountain photo",
        rotation: "2deg",
        y: "-2px",
    },
    {
        className: "left-[56%] bottom-[-8px] bg-[linear-gradient(180deg,#38bdf8_0_50%,#facc15_51%_58%,#0f766e_59%_100%)]",
        label: "Placeholder beach photo",
        rotation: "-2deg",
        y: "2px",
    },
    {
        className: "right-[-28px] top-[-4px] bg-[radial-gradient(circle_at_64%_28%,#f8fafc_0_14%,transparent_15%),linear-gradient(135deg,#f97316,#7c2d12_48%,#111827)]",
        label: "Placeholder portrait photo",
        rotation: "2deg",
        y: "-1px",
    },
];

export default function PhotoStack() {
    return (
        <div className="mt-8 w-full overflow-visible">
            <div className="relative h-[220px] w-full max-w-[608px] overflow-visible sm:h-[248px]">
                {photos.map((photo) => (
                    <div
                        aria-label={photo.label}
                        className={`personal-photo-card absolute h-full w-[34%] min-w-[128px] max-w-[184px] cursor-zoom-in overflow-hidden rounded-[10px] border-[5px] border-white ${photo.className}`}
                        key={photo.label}
                        role="img"
                        style={{
                            "--rot": photo.rotation,
                            "--ty": photo.y,
                        } as CSSProperties}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35),transparent_42%)]" />
                        <div className="absolute inset-x-3 bottom-3 h-10 rounded-full bg-black/10 blur-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
}

import type { CSSProperties } from "react";

import photoOne from "../../assets/personal/1.jpeg";
import photoTwo from "../../assets/personal/2.jpeg";
import photoThree from "../../assets/personal/3.jpeg";
import photoFour from "../../assets/personal/4.jpeg";

const photos = [
    {
        className: "sm:left-[-2px] sm:top-1",
        label: "Personal photo 1",
        rotation: "-2deg",
        src: photoOne,
        y: "0px",
    },
    {
        className: "sm:left-[25%] sm:top-[-8px]",
        label: "Personal photo 2",
        rotation: "2deg",
        src: photoTwo,
        y: "-2px",
    },
    {
        className: "sm:bottom-[-8px] sm:left-[47%]",
        label: "Personal photo 3",
        rotation: "-2deg",
        src: photoFour,
        y: "2px",
    },
    {
        className: "sm:right-[-28px] sm:top-[-4px]",
        label: "Personal photo 4",
        rotation: "2deg",
        src: photoThree,
        y: "-1px",
    },
];

export default function PhotoStack() {
    return (
        <div className="mt-8 w-full overflow-visible px-4 md:px-6 lg:px-0">
            <div className="mx-auto grid w-full max-w-[calc(100%-2rem)] grid-cols-2 gap-4 overflow-visible sm:relative sm:block sm:h-[248px] sm:max-w-[608px]">
                {photos.map((photo) => (
                    <div
                        aria-label={photo.label}
                        className={`personal-photo-card relative aspect-[4/5] w-full overflow-hidden rounded-[10px] border-[5px] border-white sm:absolute sm:h-full sm:w-[34%] sm:min-w-[128px] sm:max-w-[184px] ${photo.className}`}
                        key={photo.label}
                        role="img"
                        style={{
                            "--rot": photo.rotation,
                            "--ty": photo.y,
                        } as CSSProperties}
                    >
                        <img
                            alt={photo.label}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                            src={photo.src}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35),transparent_42%)]" />
                        <div className="absolute inset-x-3 bottom-3 h-10 rounded-full bg-black/10 blur-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
}

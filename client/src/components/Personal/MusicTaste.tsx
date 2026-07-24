

export default function MusicTaste() {
    return(
        <>
            <div className="flex flex-col gap-y-2.5">
                <span className="text-xs font-light secondary-text-color">FAVORITE MUSIC</span>
                <div className="group relative h-[80px] w-full overflow-hidden rounded-xl transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,215,96,0.22)]">
                    <div className="pointer-events-none absolute inset-0 z-10 rounded-xl ring-1 ring-white/10 transition duration-300 group-hover:ring-[#1db954]/45" />
                    <iframe
                        src="https://open.spotify.com/embed/track/2vWBUC9djv6BtiGlmKiQaH?utm_source=oembed"
                        className="absolute left-0 top-0 h-full w-full border-0"
                        allow="clipboard-write *; encrypted-media *; fullscreen *; picture-in-picture *;"
                        title="Spotify track player"
                    />
                </div>
            </div>
        </>
    );
}

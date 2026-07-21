
type RecentProjectCardProps = {
    logo: string;
    title: string;
    year: number;
    image: string;
    category: string;
    tags: string[];
}

export default function RecentProjectCard({ logo, title, year, image, category, tags }: RecentProjectCardProps) {
    return (
        <>
            <div className="flex w-full min-w-0 flex-col gap-y-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-x-2">
                        <img src={logo} alt="System Logo" className="h-6 w-6 shrink-0 rounded-sm" />
                        <h1 className="truncate text-base sm:text-lg">{title}</h1>
                    </div>
                    <span className="shrink-0 text-sm font-light secondary-text-color">{year}</span>
                </div>

                <img src={image} alt="System Advertisement" className="h-auto w-full rounded-md" />

                <h1>{category}</h1>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md bg-[#fafafa] px-3 py-1 text-sm font-light secondary-text-color"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}


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
            <div className="flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2 items-center">
                        <img src={logo} alt="System Logo" className="rounded-sm w-5 h-auto object-cover" />
                        <h1 className="text-lg">{title}</h1>
                    </div>
                    <span className="text-sm font-light secondary-text-color">{year}</span>
                </div>

                <img src={image} alt="System Advertisement" className="rounded-md w-[500px] h-auto" />

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

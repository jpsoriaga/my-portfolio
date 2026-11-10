type Fragrance = {
    name: string;
    house: string;
    notes: string[];
};

const fragrances: Fragrance[] = [
    {
        name: "Bleu de Chanel EDP",
        house: "Chanel",
        notes: ["Citrus", "Woody"],
    },
    {
        name: "Sauvage EDP",
        house: "Dior",
        notes: ["Fresh", "Spicy"],
    },
    {
        name: "Y EDP",
        house: "Yves Saint Laurent",
        notes: ["Sweet", "Aromatic"],
    },
];

export default function FragranceShelf() {
    return(
        <>
            <div className="flex flex-col gap-y-2.5">
                <span className="text-xs font-light secondary-text-color">FRAGRANCE SHELF</span>
                <ul className="flex flex-col divide-y divide-black/5">
                    {fragrances.map((fragrance, index) => (
                        <li key={index} data-cat-perch={index > 0 ? "" : undefined} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 first:pt-0 last:pb-0">
                            <div className="min-w-0">
                                <h2>{fragrance.name}</h2>
                                <p className="secondary-text-color font-light tracking-wide">{fragrance.house}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {fragrance.notes.map((note) => (
                                    <span
                                        key={note}
                                        className="rounded-md bg-[#fafafa] px-3 py-1 text-sm font-light secondary-text-color"
                                    >
                                        {note}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

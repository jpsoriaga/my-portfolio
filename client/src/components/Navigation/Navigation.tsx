import { useState } from "react";

const navigationItems = ["Work", "Fun", "About", "Resume"] as const;
const navigationWidths = [23, 23, 23, 31] as const;

export type NavigationItem = (typeof navigationItems)[number];

type NavigationProps = {
    activeItem?: NavigationItem;
    onNavigationChange?: (item: NavigationItem) => void;
};

export default function Navigation({ activeItem, onNavigationChange }: NavigationProps = {}) {
    const [internalActiveItem, setInternalActiveItem] = useState<NavigationItem>("Work");
    const selectedItem = activeItem ?? internalActiveItem;
    const activeIndex = navigationItems.indexOf(selectedItem);
    const activeLeft = navigationWidths
        .slice(0, activeIndex)
        .reduce((total, width) => total + width, 0);

    const handleNavigationChange = (item: NavigationItem) => {
        setInternalActiveItem(item);
        onNavigationChange?.(item);
    };

    return (
        <nav
            aria-label="Primary navigation"
            className="flex w-full max-w-[280px]"
        >
            <div className="relative flex w-full rounded-md bg-[#fafafa] p-0.5">
                <span
                    aria-hidden="true"
                    className="absolute top-0.5 h-[calc(100%-0.25rem)] rounded-md bg-[#e5e5e5] transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                        left: `calc(0.125rem + ((100% - 0.25rem) * ${activeLeft / 100}))`,
                        width: `calc((100% - 0.25rem) * ${navigationWidths[activeIndex] / 100})`,
                    }}
                />

                {navigationItems.map((item, index) => (
                    <button
                        key={item}
                        type="button"
                        aria-current={selectedItem === item ? "page" : undefined}
                        onClick={() => handleNavigationChange(item)}
                        className={` relative z-10 flex h-8.5 items-center justify-center rounded-md px-1.5 text-sm
                             tracking-wide transition-colors duration-300 ease-out ${
                            selectedItem === item ? "text-black" : "text-[#9d9996] hover:text-[#66615d]"
                        }`}
                        style={{ flexBasis: `${navigationWidths[index]}%` }}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </nav>
    );
}

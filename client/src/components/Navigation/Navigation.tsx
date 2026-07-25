import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const navigationItems = ["Project", "Fun", "About", "Resume"] as const;
const navigationWidths = [20, 20, 20, 22] as const;
const navigationBaseWidth = 350;
const navigationWidthTotal = navigationWidths.reduce((total, width) => total + width, 0);
const navigationMaxWidth = (navigationBaseWidth * navigationWidthTotal) / 100;

export type NavigationItem = (typeof navigationItems)[number];

type NavigationProps = {
    activeItem?: NavigationItem;
    onNavigationChange?: (item: NavigationItem) => void;
};

export default function Navigation({ activeItem, onNavigationChange }: NavigationProps = {}) {
    const [internalActiveItem, setInternalActiveItem] = useState<NavigationItem>("Project");
    const navigationRef = useRef<HTMLElement | null>(null);
    const selectedItem = activeItem ?? internalActiveItem;
    const activeIndex = navigationItems.indexOf(selectedItem);
    const activeLeft = navigationWidths
        .slice(0, activeIndex)
        .reduce((total, width) => total + width, 0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (navigationRef.current) {
                gsap.from(navigationRef.current, {
                    y: 20,
                    opacity: 0,
                    filter: "blur(5px)",
                    duration: 0.6,
                    delay: 1.55,
                    ease: "power3.out",
                    clearProps: "filter,transform,opacity",
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const handleNavigationChange = (item: NavigationItem) => {
        if (item === selectedItem) return;

        setInternalActiveItem(item);
        onNavigationChange?.(item);
    };

    return (
        <nav
            ref={navigationRef}
            aria-label="Primary navigation"
            className="flex w-full"
            style={{ maxWidth: `${navigationMaxWidth}px` }}
        >
            <div className="relative flex w-full rounded-md bg-[#fafafa] p-0.5">
                <span
                    aria-hidden="true"
                    className="absolute top-0.5 h-[calc(100%-0.25rem)] rounded-md bg-[#e5e5e5] transition-[left,width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                        left: `calc(0.125rem + ((100% - 0.25rem) * ${activeLeft / navigationWidthTotal}))`,
                        width: `calc((100% - 0.25rem) * ${navigationWidths[activeIndex] / navigationWidthTotal})`,
                    }}
                />

                {navigationItems.map((item, index) => (
                    <button
                        key={item}
                        type="button"
                        aria-current={selectedItem === item ? "page" : undefined}
                        onClick={() => handleNavigationChange(item)}
                        className={` relative z-10 flex h-8.5 items-center justify-center rounded-md px-1.5 text-sm
                             tracking-wide font-light transition-colors duration-400 ease-out ${
                            selectedItem === item ? "text-black" : "text-[#9d9996] hover:text-[#66615d]"
                        }`}
                        style={{ flexBasis: `${(navigationWidths[index] / navigationWidthTotal) * 100}%` }}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </nav>
    );
}

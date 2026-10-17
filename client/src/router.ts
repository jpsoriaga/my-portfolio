import { useSyncExternalStore, type MouseEvent } from "react";

// A tiny History API router: the site only needs the home page and project pages.
const NAVIGATE_EVENT = "app:navigate";

function subscribe(onChange: () => void) {
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);

    return () => {
        window.removeEventListener("popstate", onChange);
        window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
}

export function usePathname() {
    return useSyncExternalStore(subscribe, () => window.location.pathname);
}

export function navigate(path: string) {
    if (path === window.location.pathname) return;

    window.history.pushState(null, "", path);
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

// Lets internal <a> links keep normal behavior for new-tab and modified clicks.
export function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    navigate(path);
}

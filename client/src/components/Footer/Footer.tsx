import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mx-auto flex py-30 w-full max-w-[1120px] items-center
        px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
            <div className="flex justify-between items-center w-full">
                <span className="text-xs secondary-text-color font-light tracking-wide">
                    Built by John Patrick Soriaga, 2026.
                </span>

                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub className="size-6 secondary-text-color" />
                    </a>

                    <a
                        href="https://instagram.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="size-6 secondary-text-color" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default function Education() {
    return(
        <>
            <div className="flex flex-col gap-y-2.5">
                <span className="text-xs font-light secondary-text-color">EDUCATION</span>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2.5 lg:flex-row lg:gap-x-5">
                        <span className="shrink-0 text-sm font-light secondary-text-color pt-0.5 lg:w-[99px]">2023 - Present</span>
                        <div className="min-w-0 flex-1 text-left">
                            <h2>BS Information Technology</h2>
                            <p className="secondary-text-color font-light tracking-wide text-justify">Bulacan State University - Main Campus</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2.5 lg:flex-row lg:gap-x-5">
                        <span className="shrink-0 text-sm font-light secondary-text-color pt-0.5 lg:w-[99px]">2021 - 2023</span>
                        <div className="min-w-0 flex-1 text-left">
                            <h2>Senior High School</h2>
                            <p className="secondary-text-color font-light tracking-wide text-justify">La Consolacion University Philippines</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    );
}

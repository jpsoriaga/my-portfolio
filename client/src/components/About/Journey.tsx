

export default function Journey() {
    return (
        <>
            <div className="flex flex-col gap-y-2.5">
                <span className="text-xs font-light secondary-text-color">DEVELOPMENT JOURNEY</span>
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col lg:flex-row gap-y-2.5 justify-between md:gap-x-5">
                        <span className="text-sm font-light secondary-text-color pt-0.5 min-w-[99px]">2021</span>
                        <div>
                            <h2>Started with C Programming</h2>
                            <p className="secondary-text-color font-light tracking-wide text-justify">Began learning programming through C. Even basic concepts like loops were
                                challenging at first, but this introduced me to programming logic and problem-solving.</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-y-2.5 justify-between md:gap-x-5">
                        <span className="text-sm font-light secondary-text-color pt-0.5 min-w-[99px]">2022</span>
                        <div>
                            <h2>Built My First GUI Application</h2>
                            <p className="secondary-text-color font-light tracking-wide text-justify">Created my first graphical user interface system using C#. During the same year,
                             I also explored Java by building console-based programs.</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-y-2.5 justify-between md:gap-x-5">
                        <span className="text-sm font-light secondary-text-color pt-0.5 min-w-[99px]">2023 - 2024</span>
                        <div>
                            <h2>Strengthened My Programming Foundation</h2>
                            <p className="secondary-text-color font-light tracking-wide text-justify">Started taking programming more seriously in college by revisiting the fundamentals. Studied object-oriented programming,
                                 data structures and algorithms, and developed desktop applications using Java Swing.</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-y-2.5 justify-between md:gap-x-5">
                        <span className="text-sm font-light secondary-text-color pt-0.5 min-w-[99px]">2024 - Present</span>
                        <div>
                            <h2>Transitioned into Web Development</h2>
                            <p className="secondary-text-color font-light tracking-wide text-justify">Began focusing on web development and building complete applications. I am currently improving my frontend and backend skills
                                 while learning how to create responsive, functional, and user-friendly systems.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
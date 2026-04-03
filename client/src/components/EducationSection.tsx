export default function EducationSection() {
    const education = [
        { title: "BS Information Technology", school: "Bulacan State University", year: "2028", active: true },
        { title: "Senior High School", school: "La Consolacion University Philippines", year: "2023" },
        { title: "High School", school: "Bajet Castillo High School", year: "2021" },
        { title: "Elementary School", school: "Sto. Cristo Elementary School", year: "2018" },
    ];

    return (
        <div className="transition-all duration-400 ease-out hover:-translate-y-2 shadow-xs-bottom max-w-[280px] p-4 animate-fade-up">
            
            <h1 className="text-lg font-semibold">Education</h1>

            <div className="relative">
                
                <div className="absolute left-2 top-1 h-[96%] w-[1px] bg-gray-300" />

                {education.map((item, i) => (
                    <div key={i} className="relative mt-6">
                        
                        <div
                            className={`absolute left-2 top-1 w-3 h-3 border-1 rounded-xs -translate-x-1/2
                            ${item.active 
                                ? "bg-black border-black" 
                                : "bg-white border-gray-300"
                            }`}
                        />

                        <div className="ml-7">
                            <h2 className="text-sm font-medium mb-1.5">{item.title}</h2>
                            <div className="flex justify-between gap-x-1">
                                <p className="text-xs line-clamp-2">{item.school}</p>
                                <p className="text-xs">{item.year}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
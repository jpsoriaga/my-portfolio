import { ChevronRight } from "lucide-react";

export default function CertificateSection() {

    type CertificateInfo = {
        title: string;
        location: string;
    };

    const CertificationCard = ({ title, location }: CertificateInfo) => {
        return(
            <button className="transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-sm shadow-xs-bottom flex items-center justify-between p-2">
                <div className="flex flex-col items-start">
                    <h3 className="text-sm font-medium mb-1.5">{title}</h3>
                    <p className="text-xs">{location}</p>
                </div>

                <ChevronRight size={14} />
            </button>
        );
    }

    return(
        <>
            <div className="animate-fade-up shadow-xs-bottom p-4 pb-6.5">
                   <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">Recent Certifications</h1>

                    <button className="flex items-center justify-center gap-x-1 cursor-pointer">
                        <span className="text-xs">View All</span>
                        <ChevronRight size={14} />
                    </button>
                </div>

                 <div className="flex flex-col gap-y-3">
                        <CertificationCard title="Certificate 1" location="Google" />
                        <CertificationCard title="Certificate 2" location="Microsoft" />
                        <CertificationCard title="Certificate 3" location="Amazon" />
                    </div>
            </div>
        </>
    );
}
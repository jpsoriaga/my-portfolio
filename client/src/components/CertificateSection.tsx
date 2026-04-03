import { ChevronRight } from "lucide-react";

export default function CertificateSection() {

    type CertificateInfo = {
        title: string;
        location: string;
    };

    const CertificationCard = ({ title, location }: CertificateInfo) => {
        return (
            <button className="cursor-pointer hover-button shadow-xs-bottom flex items-center justify-between p-2">
                <div className="flex flex-col items-start">
                    <h3 className=" dark:text-white text-sm font-medium mb-1.5">{title}</h3>
                    <p className="dark:text-white text-xs">{location}</p>
                </div>

                <ChevronRight className="dark:text-white" size={14} />
            </button>
        );
    }

    return (
        <>
            <div className="dark-bg-container animate-fade-up shadow-xs-bottom p-4 pb-6.5">
                <div className="flex items-center justify-between">
                    <h1 className=" dark:text-white text-lg font-semibold">Recent Certifications</h1>

                    <button className="flex items-center justify-center gap-x-1 cursor-pointer">
                        <span className="dark:text-white text-xs">View All</span>
                        <ChevronRight className="dark:text-white" size={14} />
                    </button>
                </div>

                <div className="flex flex-col gap-y-3">
                    <CertificationCard title="Certificate 1" location="Google" />
                    <CertificationCard title="CodeCraft" location="Bulacan State University" />
                    <CertificationCard title="Certificate 3" location="Amazon" />
                </div>
            </div>
        </>
    );
}
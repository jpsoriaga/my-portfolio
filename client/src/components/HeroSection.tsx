import MyProfile from "../assets/Hanni.jpeg"

export default function HeroSection() {
    return(
        <>
            <div className="flex w-full bg-red-100 gap-x-5">
                <img src={MyProfile} alt="My Profile" className="w-[160px] h-[160px] object-cover" />
                
                <div className="flex flex-col w-full pr-5">

                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">John Patrick Soriaga</h1>

                        <span>Dark Mode Later</span>
                    </div>

                    

                </div>
            </div>
        </>
    );
}
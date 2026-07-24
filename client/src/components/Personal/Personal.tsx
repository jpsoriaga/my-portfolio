import OutsideWork from "./OutsideWork";
import PhotoStack from "./PhotoStack";

export default function Personal() {
    return(
        <>
            <section className="relative isolate w-full overflow-visible pt-10">
                <div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-8 md:px-10 lg:px-14 xl:px-16 2xl:px-10">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
                        <div>
                            <OutsideWork />
                            
                        </div>
                        <PhotoStack />
                    </div>
                </div>
            </section>
        </>
    );
}
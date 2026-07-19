import { useEffect } from "react";


export default function MainPage() {

    useEffect(() => {
        document.title = "John Patrick Soriaga | Portfolio"
    }, []);

    return(
        <>
            <div>
                <h1>test</h1>
            </div>
        </>
    );
}
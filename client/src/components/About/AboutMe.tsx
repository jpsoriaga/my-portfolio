

export default function AboutMe() {
    return(
        <>
            <div className="flex flex-col gap-y-2.5">
                <span className="text-xs font-light secondary-text-color">ABOUT ME</span>
            <div className="flex flex-col gap-y-5 text-justify tracking-wider       ">
                <p>I’m John Patrick, a BSIT student and full-stack web developer focused on building practical, user-friendly web applications.
                    I started programming in 2021 with C, and what began with struggling through basic concepts eventually grew into a genuine interest in creating complete digital systems.</p>
                <p>I currently work mainly with the MERN stack, building both frontend interfaces and backend functionality. Alongside development,
                     I’m also improving my UI/UX skills so the applications I create are not only functional, but also clear, responsive, and visually considered.</p>
                <p>I enjoy learning through hands-on projects, exploring new technologies, and challenging myself to build better solutions each time.
                     Outside of coding, I spend my time going to the gym, solving Rubik’s cubes, gaming, and watching anime.</p>
                <p>Always happy to talk — reach out on LinkedIn or send me an email at 
                     <a className="underline underline-offset-3 ml-1" href="mailto:Patricksoriaga14@gmail.com">Patricksoriaga14@gmail.com</a>
                </p>
            </div>
            </div>
        </>
    );
}
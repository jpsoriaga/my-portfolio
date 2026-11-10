import { useEffect, useRef, useState } from "react";

type Pose = "walk" | "run" | "sit" | "sleep" | "jump" | "look";
type Direction = 1 | -1;

const CAT_WIDTH = 84;
const CAT_HEIGHT = CAT_WIDTH * (80 / 120);
// Where his paws touch, in pixels below the top of the drawing (ground line y=76 of 80).
const FOOT_OFFSET = CAT_HEIGHT * (76 / 80);
// The Fun blocks fade and slide in first; he shows up once they have settled.
const ENTER_DELAY = 950;
const WALK_SPEED = 42;
const RUN_SPEED = 150;

const colors = {
    coat: "#f3e9da",
    shade: "#e4d3ba",
    bib: "#fbf6ee",
    point: "#3b2920",
    innerEar: "#7c5547",
    eye: "#7cc0f0",
    eyeRim: "#3f87c4",
    pupil: "#141a22",
    whisker: "#f7efe4",
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const SAYINGS = ["Muning!", "meow~"];
const LOOK_MS = 2200;

// Siamese points: cream coat that deepens to dark seal on the legs, tail, ears and face.
function CatGradients() {
    return (
        <defs>
            <linearGradient id="cat-coat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={colors.shade} />
                <stop offset="0.5" stopColor={colors.coat} />
                <stop offset="1" stopColor={colors.bib} />
            </linearGradient>
            <linearGradient id="cat-leg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={colors.bib} />
                <stop offset="0.55" stopColor="#ece1d1" />
                <stop offset="0.86" stopColor="#8a6958" />
                <stop offset="1" stopColor={colors.point} />
            </linearGradient>
            <linearGradient id="cat-leg-far" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e3d4bf" />
                <stop offset="0.55" stopColor="#d6c4aa" />
                <stop offset="0.86" stopColor="#765848" />
                <stop offset="1" stopColor="#2f2019" />
            </linearGradient>
            <linearGradient id="cat-tail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2c1e17" />
                <stop offset="1" stopColor="#6d4f40" />
            </linearGradient>
            <linearGradient id="cat-ear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2c1e17" />
                <stop offset="1" stopColor="#5e4335" />
            </linearGradient>
            <radialGradient id="cat-mask" cx="0.5" cy="0.62" r="0.55">
                <stop offset="0" stopColor="#2f2019" />
                <stop offset="0.55" stopColor="#47322a" stopOpacity="0.95" />
                <stop offset="1" stopColor="#5b4236" stopOpacity="0" />
            </radialGradient>
        </defs>
    );
}

function Leg({ x, top, far = false }: { x: number; top: number; far?: boolean }) {
    // Wider at the shoulder, slim at the ankle, a round paw.
    const d = `M${x} ${top}C${x - 0.4} ${top + 9} ${x + 1} 66 ${x + 1.2} 72.5C${x + 1.2} 76 ${x + 7.4} 76 ${x + 7.4} 72.5C${x + 7.6} 66 ${x + 8.6} ${top + 8} ${x + 8.8} ${top}Z`;
    return (
        <>
            <path d={d} fill={far ? "url(#cat-leg-far)" : "url(#cat-leg)"} />
            <ellipse cx={x + 4.3} cy="75" rx="4.4" ry="1.9" fill={far ? "#2f2019" : colors.point} />
        </>
    );
}

function AlmondEye({ cx, cy, flip = false }: { cx: number; cy: number; flip?: boolean }) {
    const d = flip
        ? `M${cx + 3.4} ${cy + 0.4}Q${cx} ${cy - 2.9} ${cx - 3.2} ${cy}Q${cx} ${cy + 2.5} ${cx + 3.4} ${cy + 0.4}Z`
        : `M${cx - 3.4} ${cy + 0.4}Q${cx} ${cy - 2.9} ${cx + 3.2} ${cy}Q${cx} ${cy + 2.5} ${cx - 3.4} ${cy + 0.4}Z`;
    return (
        <>
            <path d={d} fill={colors.eye} stroke={colors.eyeRim} strokeWidth="0.35" />
            <ellipse cx={cx} cy={cy + 0.1} rx="0.85" ry="1.75" fill={colors.pupil} />
            <circle cx={cx + 0.7} cy={cy - 0.7} r="0.55" fill="#fff" />
        </>
    );
}

function WalkingCat() {
    return (
        <g className="cat-walk-body">
            <path className="cat-tail" d="M31 44C20 42 12 34 13 22c0-4 5-5 5.5-1-.5 10 4.5 16 13.5 18z" fill="url(#cat-tail)" />
            <g className="cat-leg cat-leg-b"><Leg x={41} top={44} far /></g>
            <g className="cat-leg cat-leg-a"><Leg x={72} top={44} far /></g>
            <g className="cat-leg cat-leg-a"><Leg x={33} top={44} /></g>
            <g className="cat-leg cat-leg-b"><Leg x={65} top={44} /></g>
            <path d="M30 46C30 38 40 34.5 54 35c12 .5 22 0 27 5 4 4 3 11-2 14-6 3.5-16 2-24 2.5-9 .5-19 .5-23-3.5-1.5-1.5-2-4-2-7z" fill="url(#cat-coat)" />
            <CatHead x={88} y={33} />
        </g>
    );
}

function SittingCat() {
    return (
        <g>
            <path className="cat-tail cat-tail-sit" d="M45 76c-14 2-23-3-20-9 2-3 6-1 6 2 1 3 7 4 14 3z" fill="url(#cat-tail)" />
            <path d="M44 76c-9 0-11-14-4-26 5-8 18-10 25-5 6 6 7 21 3 31z" fill="url(#cat-coat)" />
            <ellipse cx="49" cy="67" rx="12" ry="9" fill="url(#cat-coat)" />
            <ellipse cx="64" cy="55" rx="5" ry="7" fill={colors.bib} />
            <Leg x={66} top={52} far />
            <Leg x={60} top={52} />
            <CatHead x={70} y={34} />
        </g>
    );
}

function SleepingCat() {
    return (
        <g>
            <g className="cat-breathe">
                <ellipse cx="57" cy="65" rx="31" ry="11" fill="url(#cat-coat)" />
            </g>
            <path d="M30 67c4 12 42 14 58 5 3-2 6 1 3 3-17 10-57 7-64-5z" fill="url(#cat-tail)" />
            <ellipse cx="75" cy="73.5" rx="5" ry="2.4" fill={colors.point} />
            <g>
                <path d="M77 54l-1-12q6 3 9 8z" fill="url(#cat-ear)" />
                <path d="M85 50l7-10q3 6 1 14z" fill="url(#cat-ear)" />
                <ellipse cx="85" cy="59" rx="11.5" ry="10.5" fill={colors.coat} />
                <ellipse cx="89" cy="62" rx="9" ry="8" fill="url(#cat-mask)" />
                <path d="M84.5 58.2q2.6 2.1 5.2 0" stroke={colors.pupil} strokeWidth="1.1" fill="none" strokeLinecap="round" />
                <circle cx="94.2" cy="61.6" r="0.9" fill="#24160f" />
            </g>
            <text className="cat-z cat-z-1" x="96" y="44" fontSize="9" fill={colors.point}>z</text>
            <text className="cat-z cat-z-2" x="103" y="36" fontSize="7" fill={colors.point}>z</text>
        </g>
    );
}

function LookingCat() {
    // Sitting and facing the viewer.
    return (
        <g>
            <path className="cat-tail cat-tail-sit" d="M75 73c11 1 17-3 16-10-.5-3.5-4-4-4.5-1 .5 5-3.5 8-11.5 8.5z" fill="url(#cat-tail)" />
            <path d="M60 40c-10 0-15 7-16 15-4 4-6 11-3.5 16.5C42 75 46 76 50 76h20c4 0 8-1 9.5-4.5C82 66 80 59 76 55c-1-8-6-15-16-15z" fill="url(#cat-coat)" />
            <path d="M45.5 61c-2.5 4-2 9.5 2.5 12M74.5 61c2.5 4 2 9.5-2.5 12" stroke={colors.shade} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="53" rx="7.5" ry="9" fill={colors.bib} opacity="0.9" />
            <path d="M52.6 50c-.4 9-.9 18-.3 23.5 0 3 6.7 3 6.7 0 .2-5 .3-14.5-.1-23.5z" fill="url(#cat-leg)" />
            <path d="M67.4 50c.4 9 .9 18 .3 23.5 0 3-6.7 3-6.7 0-.2-5-.3-14.5.1-23.5z" fill="url(#cat-leg)" />
            <ellipse cx="55.8" cy="75" rx="4.3" ry="1.9" fill={colors.point} />
            <ellipse cx="64.2" cy="75" rx="4.3" ry="1.9" fill={colors.point} />
            <path d="M47.5 23C45.5 18 44.5 12 45.5 8.5c4 1.5 8 5 10.5 9.5z" fill="url(#cat-ear)" />
            <path d="M72.5 23c2-5 3-11 2-14.5-4 1.5-8 5-10.5 9.5z" fill="url(#cat-ear)" />
            <path d="M48.5 19.5c-1-3-1.4-6-1-8 2.2 1 4.2 3 5.6 5.2z" fill={colors.innerEar} opacity="0.8" />
            <path d="M71.5 19.5c1-3 1.4-6 1-8-2.2 1-4.2 3-5.6 5.2z" fill={colors.innerEar} opacity="0.8" />
            <path d="M60 17.5c10 0 15.5 6 15 13-.5 7-6.5 12-15 12s-14.5-5-15-12c-.5-7 5-13 15-13z" fill={colors.coat} />
            <ellipse cx="60" cy="34" rx="12" ry="10" fill="url(#cat-mask)" />
            <g className="cat-eye">
                <AlmondEye cx={55} cy={30.2} />
                <AlmondEye cx={65} cy={30.2} flip />
            </g>
            <path d="M58.7 34.5h2.6l-1.3 1.6z" fill="#1e130e" />
            <path d="M60 36.2q-1.5 1.5-3 .5M60 36.2q1.5 1.5 3 .5" stroke={colors.whisker} strokeWidth="0.5" fill="none" opacity="0.8" />
            <path d="M51 35.5l-11-1.6M51 37.5l-11 1.8M69 35.5l11-1.6M69 37.5l11 1.8" stroke={colors.whisker} strokeWidth="0.45" opacity="0.7" />
        </g>
    );
}

function CatHead({ x, y }: { x: number; y: number }) {
    // Side view drawn around (88, 33) and moved to (x, y).
    return (
        <g transform={`translate(${x - 88} ${y - 33})`}>
            <path d="M80.5 25c-1.5-4-2-9-1-12.5 3.5 1.5 7 4.5 9 8.5z" fill="url(#cat-ear)" />
            <path d="M88 21.5c7.5 0 12.5 5 12.5 11.5S95.5 44.5 88 44.5 75.5 39.5 75.5 33 80.5 21.5 88 21.5z" fill={colors.coat} />
            <path d="M88 22c2-4.5 4.5-9 7-11.5 1.8 3.5 2.6 8.5 2.4 13z" fill="url(#cat-ear)" />
            <path d="M90.5 20.5c1.3-3 2.8-5.5 4.2-7 1 2.2 1.4 5 1.2 7.5z" fill={colors.innerEar} opacity="0.8" />
            <ellipse cx="97" cy="37" rx="6" ry="5" fill={colors.coat} />
            <ellipse cx="95.5" cy="35.5" rx="10" ry="9.5" fill="url(#cat-mask)" />
            <g className="cat-eye">
                <AlmondEye cx={92.6} cy={31.2} />
            </g>
            <circle cx="102.2" cy="35.6" r="1.1" fill="#1e130e" />
            <path d="M102 37q-1.5 1.5-3.2.6" stroke={colors.whisker} strokeWidth="0.55" fill="none" opacity="0.8" />
            <path d="M99 38l12-2M99 39.5l12 2" stroke={colors.whisker} strokeWidth="0.5" opacity="0.75" />
        </g>
    );
}

type Perch = { left: number; right: number; top: number; element: HTMLElement };

// Every element marked data-cat-perch inside the cat's parent is a ledge he can walk along and jump between.
function findPerches(container: HTMLElement): Perch[] {
    const box = container.getBoundingClientRect();
    return Array.from(container.querySelectorAll<HTMLElement>("[data-cat-perch]"))
        .map((element) => {
            const rect = element.getBoundingClientRect();
            return { left: rect.left - box.left, right: rect.right - box.left - CAT_WIDTH, top: rect.top - box.top, element };
        })
        .filter((perch) => perch.right - perch.left > 24);
}

export default function SiameseCat() {
    const layerRef = useRef<HTMLDivElement | null>(null);
    const catRef = useRef<HTMLDivElement | null>(null);
    const pokeRef = useRef<() => void>(() => {});
    const heartTimers = useRef<number[]>([]);
    const [pose, setPose] = useState<Pose>("sit");
    const [facing, setFacing] = useState<Direction>(1);
    const [bubble, setBubble] = useState<{ id: number; text: string } | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const layer = layerRef.current;
        const container = layer?.parentElement;
        const cat = catRef.current;
        if (!layer || !container || !cat) return;

        const state = {
            perches: [] as Perch[],
            perch: 0,
            x: 0,
            y: 0,
            direction: 1 as Direction,
            pose: "sit" as Pose,
            landedOnce: false,
            until: 0,
            jump: { fromX: 0, fromY: 0, toX: 0, toPerch: 0, start: 0, duration: 0, height: 0 },
        };
        const place = () => {
            cat.style.transform = `translate(${state.x}px, ${state.y - FOOT_OFFSET}px)`;
        };
        const current = () => state.perches[state.perch];
        const measure = () => {
            const element = current()?.element;
            state.perches = findPerches(container);
            const index = element ? state.perches.findIndex((perch) => perch.element === element) : -1;
            state.perch = index >= 0 ? index : 0;
            const perch = current();
            if (!perch || state.pose === "jump") return;
            state.x = Math.max(perch.left, Math.min(state.x, perch.right));
            state.y = perch.top;
            place();
        };
        const setCatPose = (next: Pose, ms: number) => {
            state.pose = next;
            state.until = performance.now() + ms;
            setPose(next);
        };
        const face = (direction: Direction) => {
            state.direction = direction;
            setFacing(direction);
        };

        const observer = new ResizeObserver(measure);
        observer.observe(container);
        state.perches = findPerches(container);
        // He starts on the photos when there are any, otherwise on the first ledge.
        state.perch = Math.min(2, Math.max(0, state.perches.length - 1));
        const start = current();
        if (start) {
            state.x = start.left + (start.right - start.left) * 0.4;
            state.y = start.top;
        }
        place();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            pokeRef.current = () => {};
            const timer = window.setTimeout(() => {
                measure();
                setVisible(true);
            }, ENTER_DELAY);
            return () => {
                window.clearTimeout(timer);
                observer.disconnect();
            };
        }

        // Jump to one of the two nearest other ledges, landing as close to straight across as the ledge allows.
        const jump = () => {
            const from = current();
            const options = state.perches
                .map((perch, index) => ({ perch, index }))
                .filter(({ index }) => index !== state.perch)
                .sort((a, b) => Math.abs(a.perch.top - from.top) + Math.abs(a.perch.left - from.left) - (Math.abs(b.perch.top - from.top) + Math.abs(b.perch.left - from.left)))
                .slice(0, 2);
            if (options.length === 0) return false;
            const target = options[Math.floor(Math.random() * options.length)];
            const toX = state.x + random(-180, 180);
            const landX = Math.max(target.perch.left, Math.min(toX, target.perch.right));
            const distance = Math.hypot(landX - state.x, target.perch.top - state.y);
            state.jump = {
                fromX: state.x,
                fromY: state.y,
                toX: landX,
                toPerch: target.index,
                start: performance.now(),
                duration: Math.max(450, Math.min(950, distance * 1.6)),
                height: Math.abs(target.perch.top - state.y) / 2 + 36,
            };
            if (landX !== state.x) face(landX > state.x ? 1 : -1);
            setCatPose("jump", 60000);
            return true;
        };

        // On a ledge he walks, sits or naps; at an edge, or after resting, he often jumps to another block.
        const chooseNext = () => {
            const roll = Math.random();
            if (state.pose === "walk" || state.pose === "run") {
                if (roll < 0.5) setCatPose("sit", random(2500, 5000));
                else if (roll < 0.65) setCatPose("sleep", random(7000, 12000));
                else if (!jump()) setCatPose("walk", random(3000, 6000));
                return;
            }
            if (roll < 0.35 && jump()) return;
            if (Math.random() < 0.5) face((state.direction * -1) as Direction);
            setCatPose(roll > 0.88 ? "run" : "walk", roll > 0.88 ? random(900, 1500) : random(2500, 6000));
        };

        pokeRef.current = () => {
            if (state.pose !== "jump") setCatPose("look", LOOK_MS);
        };

        // He leaps in from the left or right edge of the screen onto a ledge that is in view.
        const enter = () => {
            measure();
            if (state.perches.length === 0) return false;
            const box = container.getBoundingClientRect();
            const inView = state.perches
                .map((perch, index) => ({ perch, index }))
                .filter(({ perch }) => box.top + perch.top > 60 && box.top + perch.top < window.innerHeight - 20);
            const choices = inView.length > 0 ? inView : state.perches.map((perch, index) => ({ perch, index }));
            const target = choices[Math.floor(Math.random() * choices.length)];
            const fromLeft = Math.random() < 0.5;
            const fromX = fromLeft ? -box.left - CAT_WIDTH : window.innerWidth - box.left;
            const toX = fromLeft ? target.perch.left + random(0, 60) : target.perch.right - random(0, 60);
            state.x = fromX;
            state.y = target.perch.top - 30;
            state.perch = target.index;
            state.jump = {
                fromX,
                fromY: state.y,
                toX: Math.max(target.perch.left, Math.min(toX, target.perch.right)),
                toPerch: target.index,
                start: performance.now(),
                duration: Math.max(700, Math.min(1100, Math.abs(toX - fromX) * 1.1)),
                height: 70,
            };
            face(fromLeft ? 1 : -1);
            setCatPose("jump", 60000);
            place();
            setVisible(true);
            return true;
        };

        const mountedAt = performance.now();
        let entered = false;
        let frame = 0;
        let last = performance.now();
        let lastMeasure = 0;
        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            if (!entered) {
                if (now - mountedAt >= ENTER_DELAY) entered = enter();
                frame = requestAnimationFrame(tick);
                return;
            }
            // Entrance animations and hover lifts move the blocks a little, so keep re-reading where they are.
            if (now - lastMeasure > 400) {
                lastMeasure = now;
                measure();
            }
            const perch = current();
            if (perch && state.pose === "jump") {
                const { fromX, fromY, toX, toPerch, start, duration, height } = state.jump;
                const t = Math.min(1, (now - start) / duration);
                const toY = state.perches[toPerch]?.top ?? fromY;
                state.x = fromX + (toX - fromX) * t;
                state.y = fromY + (toY - fromY) * t - height * 4 * t * (1 - t);
                if (t >= 1) {
                    state.perch = toPerch;
                    state.y = toY;
                    if (state.landedOnce) setCatPose("sit", random(1500, 3500));
                    else setCatPose("look", LOOK_MS);
                    state.landedOnce = true;
                }
                place();
            } else if (perch && (state.pose === "walk" || state.pose === "run")) {
                state.x += state.direction * (state.pose === "run" ? RUN_SPEED : WALK_SPEED) * dt;
                if (state.x <= perch.left || state.x >= perch.right) {
                    state.x = Math.max(perch.left, Math.min(state.x, perch.right));
                    if (Math.random() < 0.55 && jump()) return void (frame = requestAnimationFrame(tick));
                    face((state.direction * -1) as Direction);
                }
                state.y = perch.top;
                place();
            }
            if (state.pose !== "jump" && now >= state.until) chooseNext();
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const timers = heartTimers.current;
        return () => timers.forEach((timer) => window.clearTimeout(timer));
    }, []);

    const handlePoke = () => {
        pokeRef.current();
        const id = Date.now() + Math.random();
        const text = SAYINGS[Math.floor(Math.random() * SAYINGS.length)];
        setBubble({ id, text });
        heartTimers.current.push(window.setTimeout(() => setBubble((current) => (current?.id === id ? null : current)), 1800));
    };

    return (
        <div ref={layerRef} className="siamese-cat pointer-events-none absolute inset-0 z-40">
            <div ref={catRef} className="pointer-events-auto absolute left-0 top-0 will-change-transform" style={{ width: CAT_WIDTH, opacity: visible ? 1 : 0 }}>
                {bubble && (
                    // A manga speech balloon: bold outline, oval, with a pointed tail toward his head.
                    <span key={bubble.id} aria-hidden="true" className="cat-bubble pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 block">
                        <span className="block whitespace-nowrap rounded-[50%] border border-[#1f1a17] bg-white px-4 py-1.5 text-sm font-normal text-[#1f1a17]">
                            {bubble.text}
                        </span>
                        <svg width="16" height="12" viewBox="0 0 16 12" className="absolute left-[42%] top-full -mt-[1px] block">
                            <path d="M1.5 0 L5 10.5 L11.5 0" fill="#fff" stroke="#1f1a17" strokeWidth="1" strokeLinejoin="round" />
                        </svg>
                    </span>
                )}
                <button
                    type="button"
                    onClick={handlePoke}
                    aria-label="Muning, a Siamese cat. Tap to say hi."
                    className="block w-full cursor-pointer rounded-md border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                >
                    <span className="block">
                        <svg
                            viewBox="0 0 120 80"
                            width={CAT_WIDTH}
                            height={CAT_HEIGHT}
                            className={`block overflow-visible is-${pose}`}
                            style={{ transform: `scaleX(${facing})` }}
                            aria-hidden="true"
                        >
                            <CatGradients />
                            {pose !== "jump" && <ellipse cx="58" cy="77" rx="30" ry="2.5" fill="#000" opacity="0.07" />}
                            {pose === "walk" || pose === "run" || pose === "jump" ? <WalkingCat /> : pose === "sleep" ? <SleepingCat /> : pose === "look" ? <LookingCat /> : <SittingCat />}
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const CUBE_SIZE = 56;
const TILES_PER_FACE = 9;
const SPIN_DEGREES_PER_MS = 0.012;
const DRAG_DEGREES_PER_PX = 0.6;
const MAX_TILT = 70;

type Vector = [number, number, number];

type Sticker = {
    position: Vector;
    normal: Vector;
    color: number;
};

// Axes follow CSS: x right, y down, z toward the viewer.
// The first four faces are the sides of the cube, shown unfolded in the band.
const faces: { name: string; color: string; transform: string; normal: Vector; cell: (column: number, row: number) => Vector }[] = [
    { name: "front", color: "#2bb673", transform: "translateZ(var(--cube-half))", normal: [0, 0, 1], cell: (column, row) => [column, row, 1] },
    { name: "right", color: "#ed3b43", transform: "rotateY(90deg) translateZ(var(--cube-half))", normal: [1, 0, 0], cell: (column, row) => [1, row, -column] },
    { name: "back", color: "#159bd3", transform: "rotateY(180deg) translateZ(var(--cube-half))", normal: [0, 0, -1], cell: (column, row) => [-column, row, -1] },
    { name: "left", color: "#ff671f", transform: "rotateY(-90deg) translateZ(var(--cube-half))", normal: [-1, 0, 0], cell: (column, row) => [-1, row, column] },
    { name: "top", color: "#ffffff", transform: "rotateX(90deg) translateZ(var(--cube-half))", normal: [0, -1, 0], cell: (column, row) => [column, -1, row] },
    { name: "bottom", color: "#f3c72d", transform: "rotateX(-90deg) translateZ(var(--cube-half))", normal: [0, 1, 0], cell: (column, row) => [column, 1, -row] },
];
const SIDE_FACE_COUNT = 4;
const SCRAMBLE_MOVE_COUNT = 20;

const solvedTiles = Array.from({ length: faces.length * TILES_PER_FACE }, (_, index) => Math.floor(index / TILES_PER_FACE));

function getCell(faceIndex: number, tileIndex: number) {
    return faces[faceIndex].cell((tileIndex % 3) - 1, Math.floor(tileIndex / 3) - 1);
}

function rotateQuarter([x, y, z]: Vector, axis: number): Vector {
    if (axis === 0) return [x, -z, y];
    if (axis === 1) return [z, y, -x];

    return [-y, x, z];
}

// Scrambles with real face turns, so every result is a state a physical cube can reach.
function buildScrambledTiles() {
    const stickers: Sticker[] = solvedTiles.map((color, index) => ({
        position: getCell(color, index % TILES_PER_FACE),
        normal: faces[color].normal,
        color,
    }));
    let lastMove = "";

    for (let move = 0; move < SCRAMBLE_MOVE_COUNT; move++) {
        let axis = 0;
        let layer = 1;

        do {
            axis = Math.floor(Math.random() * 3);
            layer = Math.random() < 0.5 ? -1 : 1;
        } while (`${axis}:${layer}` === lastMove);

        lastMove = `${axis}:${layer}`;
        const quarterTurns = 1 + Math.floor(Math.random() * 3);

        for (const sticker of stickers) {
            if (sticker.position[axis] !== layer) continue;

            for (let turn = 0; turn < quarterTurns; turn++) {
                sticker.position = rotateQuarter(sticker.position, axis);
                sticker.normal = rotateQuarter(sticker.normal, axis);
            }
        }
    }

    const colorByCell = new Map(stickers.map((sticker) => [`${sticker.position}|${sticker.normal}`, sticker.color]));

    return solvedTiles.map((faceIndex, index) => {
        const cell = getCell(faceIndex, index % TILES_PER_FACE);

        return colorByCell.get(`${cell}|${faces[faceIndex].normal}`) ?? faceIndex;
    });
}

const tileClassName = "aspect-square bg-[#f2f2f2] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-colors duration-500 ease-out group-hover:bg-[color:var(--tile-color)] group-has-[:focus-visible]:bg-[color:var(--tile-color)] data-[revealed=true]:bg-[color:var(--tile-color)] motion-reduce:transition-none";

export default function CubeBand() {
    const [tiles, setTiles] = useState(buildScrambledTiles);
    const [isRevealed, setIsRevealed] = useState(false);
    const sceneRef = useRef<HTMLDivElement | null>(null);
    const cubeRef = useRef<HTMLDivElement | null>(null);
    const rotationRef = useRef({ x: -24, y: -32 });
    const dragRef = useRef({ active: false, x: 0, y: 0 });
    const isSolved = tiles === solvedTiles;

    const applyRotation = useCallback(() => {
        if (!cubeRef.current) return;

        const { x, y } = rotationRef.current;
        cubeRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    }, []);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frameId = 0;
        let lastFrameTime = 0;
        let isVisible = true;

        function spin(time: number) {
            const deltaTime = lastFrameTime ? Math.min(time - lastFrameTime, 64) : 16;
            lastFrameTime = time;
            frameId = 0;

            if (!dragRef.current.active) {
                rotationRef.current.y += deltaTime * SPIN_DEGREES_PER_MS;
                applyRotation();
            }

            startSpin();
        }

        function startSpin() {
            if (frameId || !isVisible || document.hidden || reducedMotionQuery.matches) return;

            frameId = requestAnimationFrame(spin);
        }

        function stopSpin() {
            if (!frameId) return;

            cancelAnimationFrame(frameId);
            frameId = 0;
        }

        const handleChange = () => {
            lastFrameTime = 0;
            stopSpin();
            startSpin();
        };
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            handleChange();
        });

        applyRotation();
        startSpin();
        intersectionObserver.observe(scene);
        document.addEventListener("visibilitychange", handleChange);
        reducedMotionQuery.addEventListener("change", handleChange);

        return () => {
            stopSpin();
            intersectionObserver.disconnect();
            document.removeEventListener("visibilitychange", handleChange);
            reducedMotionQuery.removeEventListener("change", handleChange);
        };
    }, [applyRotation]);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = { active: true, x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag.active) return;

        const rotation = rotationRef.current;
        rotation.y += (event.clientX - drag.x) * DRAG_DEGREES_PER_PX;
        rotation.x = Math.max(-MAX_TILT, Math.min(MAX_TILT, rotation.x - (event.clientY - drag.y) * DRAG_DEGREES_PER_PX));
        drag.x = event.clientX;
        drag.y = event.clientY;
        applyRotation();
    };

    const handlePointerEnd = () => {
        dragRef.current.active = false;
    };

    const handleClick = () => {
        setTiles(isSolved ? buildScrambledTiles() : solvedTiles);
        setIsRevealed(true);
    };

    return (
        <div className="flex w-full max-w-[480px] flex-col gap-y-2.5">
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-light secondary-text-color">RUBIK’S CUBE</span>
                <span className="text-xs font-light secondary-text-color" aria-hidden="true">
                    Drag to spin · {isSolved ? "Click to scramble" : "Click to solve"}
                </span>
            </div>
            <div className="group flex items-center gap-x-5" onPointerLeave={() => setIsRevealed(false)}>
                <div
                    ref={sceneRef}
                    aria-hidden="true"
                    className="flex h-[92px] w-[92px] shrink-0 cursor-grab touch-none items-center justify-center [perspective:600px] active:cursor-grabbing"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerEnd}
                    onPointerCancel={handlePointerEnd}
                >
                    <div
                        ref={cubeRef}
                        className="relative [transform-style:preserve-3d]"
                        style={{
                            width: CUBE_SIZE,
                            height: CUBE_SIZE,
                            "--cube-half": `${CUBE_SIZE / 2}px`,
                        } as CSSProperties}
                    >
                        {faces.map((face, faceIndex) => (
                            <div
                                key={face.name}
                                className="absolute inset-0 grid grid-cols-3 gap-0.5 rounded-[5px] bg-[#d9d9d9] p-0.5 [backface-visibility:hidden]"
                                style={{ transform: face.transform }}
                            >
                                {tiles.slice(faceIndex * TILES_PER_FACE, (faceIndex + 1) * TILES_PER_FACE).map((colorIndex, tileIndex) => (
                                    <span
                                        key={tileIndex}
                                        data-revealed={isRevealed}
                                        className={`${tileClassName} rounded-[3px]`}
                                        style={{ "--tile-color": faces[colorIndex].color } as CSSProperties}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    aria-label={isSolved ? "Scramble the cube" : "Solve the cube"}
                    aria-pressed={isSolved}
                    onClick={handleClick}
                    className="flex min-w-0 flex-1 cursor-pointer gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black/40"
                >
                    {faces.slice(0, SIDE_FACE_COUNT).map((face, faceIndex) => (
                        <span key={face.name} className="grid flex-1 grid-cols-3 gap-1">
                            {tiles.slice(faceIndex * TILES_PER_FACE, (faceIndex + 1) * TILES_PER_FACE).map((colorIndex, tileIndex) => (
                                <span
                                    key={tileIndex}
                                    data-revealed={isRevealed}
                                    className={`${tileClassName} rounded-[5px]`}
                                    style={{
                                        "--tile-color": faces[colorIndex].color,
                                        transitionDelay: `${(faceIndex * 3 + (tileIndex % 3)) * 20}ms`,
                                    } as CSSProperties}
                                />
                            ))}
                        </span>
                    ))}
                </button>
            </div>
        </div>
    );
}

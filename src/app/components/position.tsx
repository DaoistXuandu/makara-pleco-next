import { useEffect, useState } from "react"
import Row from "./row";

export default function Position({ track, lon, lat }: { track: number, lon: number, lat: number }) {
    const [location, setLocation] = useState(5)
    const length = 5;

    const [x, setX] = useState(1)
    const [y, setY] = useState(1)

    function draw() {
    }


    useEffect(() => {
        // const interval = setInterval(() => {
        //     draw()
        // }, 1000)

        let xx = 1, yy = 1
        // const xy = setInterval(() => {
        //     console.log(lon, lat)
        //     const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        //     const ctx = canvas.getContext("2d");
        //     if (ctx) {
        //         ctx.beginPath();
        //         ctx.arc(xx, yy, 4, 0, 2 * Math.PI);
        //         ctx.fillStyle = "red";
        //         ctx.strokeStyle = "red";
        //         ctx.fill();
        //         ctx.stroke();
        //     }
        //     xx += 10, yy += 10
        // }, 100)

        return () => {
            // clearInterval(interval)
            // clearInterval(xy)
        }
    }, [])

    useEffect(() => {
        console.log("x", x)
    }, [x])

    return (
        <div className="rewlative w-3/5 flex flex-col">
            <h1 className="font-bold text-xl">Track: {(track == 0 ? 'A' : 'B')}</h1>
            <div className="relative">
                <canvas id="myCanvas" width={402} height={402} className="absolute">
                    Sorry, your browser does not support canvas.
                </canvas>
                <Row row={1} />
                <Row row={2} />
                <Row row={3} />
                <Row row={4} />
                <Row row={5} />
            </div>
        </div>
    )
}
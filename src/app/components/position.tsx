import { useEffect, useState } from "react"
import Row from "./row";
export default function Position({ track, lon, lat }: { track: string, lon: number, lat: number }) {

    const X = 395
    const Y = 395
    const init = [-7.332025, 112.756995]
    const initialLat = init[0]
    const initialLon = init[1]

    function getTranslation(data: number) {
        return (data * 111111)
    }

    function getGcsTranslation() {
        let translateLat = 0, translateLon = 0
        translateLat = getTranslation(lat - initialLat)
        translateLon = getTranslation(lon - initialLon)
        translateLat = translateLat * Y / 25
        translateLon = translateLon * X / 25

        const data = {
            y: translateLat,
            x: translateLon
        }

        return data
    }

    useEffect(() => {
        let init_data = (track == "A" ? [395, 395] : [5, 395])
        let xx = init_data[0], yy = init_data[1]
        const xy = setInterval(() => {
            let current = getGcsTranslation()
            const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.arc(xx + current.x, yy - current.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.strokeStyle = "red";
                ctx.fill();
                ctx.stroke();
            }
        }, 1000)

        return () => {
        }
    }, [])


    return (
        <div className="rewlative w-3/5 flex flex-col">
            <h1 className="font-bold text-xl">Track: {track}</h1>
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
"use client"

import { useEffect, useState } from "react"

export default function Position({ track, lon, lat, initial_lon, initial_lat, prev_lon, prev_lat }: { track: string, lon: number, lat: number, initial_lon: number, initial_lat: number, prev_lon: number, prev_lat: number }) {
    const X = 395
    const Y = 395

    function getTranslation(data: number) {
        return (data * 111111)
    }

    function getGcsTranslation() {
        let translateLat = 0, translateLon = 0
        translateLat = getTranslation(lat - initial_lat)
        translateLon = getTranslation(lon - initial_lon)
        translateLat = translateLat * Y / 25
        translateLon = translateLon * X / 25

        const data = {
            y: translateLat,
            x: translateLon
        }
        // console.log(lon, lat, initial_lat, initial_lon, data)
        return data
    }

    function getGcsTranslationRelative() {
        let translateLat = 0, translateLon = 0
        translateLat = getTranslation(prev_lat - initial_lat)
        translateLon = getTranslation(prev_lon - initial_lon)
        translateLat = translateLat * Y / 25
        translateLon = translateLon * X / 25

        const data = {
            y: translateLat,
            x: translateLon
        }
        // console.log(lon, lat, initial_lat, initial_lon, data)
        return data
    }

    useEffect(() => {           
        let init_data = (track == "A" ? [395, 395] : [5, 395])
        let xx = init_data[0], yy = init_data[1]
        // console.log("Initial", initial_lat, initial_lon)

        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const size = 401 / 5
        let line = 0
        let statusAA = ["5", "4", "3", "2", "1"], statusAB = ["1", "2", "3", "4", "5"]
        let statusBA = ["E", "D", "C", "B", "A"], statusBB = ["A", "B", "C", "D", "E"]
        if (ctx) {
            ctx.strokeStyle = "black";
            for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.moveTo(0, line);
                ctx.lineTo(401, line);
                ctx.stroke()

                ctx.font = "12px";
                if (i < 5) {
                    if (track == "A")
                        ctx.strokeText(statusAA[i], 10, line + 20);
                    else if (track == "B")
                        ctx.strokeText(statusAB[i], 380, line + 20);
                }


                ctx.beginPath();
                ctx.moveTo(line, 0);
                ctx.lineTo(line, 401);
                ctx.stroke()

                ctx.font = "12px";
                if (i < 5) {
                    if (track == "A")
                        ctx.strokeText(statusBA[i], line + size - 20, 20);
                    else if (track == "B")
                        ctx.strokeText(statusBB[i], line + 20, 20);
                }


                line += size
            }
        }

        const xy = setInterval(() => {
            let current = getGcsTranslation()
            let prev = getGcsTranslationRelative()
            // console.log(current)
            if (ctx && (track == "A" || track == "B")) {
                ctx.beginPath();
                let currentX = xx + current.x
                let currentY = yy - current.y

                let prevX = xx + prev.x
                let prevY = yy - prev.y

                ctx.arc(currentX, currentY, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                // ctx.strokeStyle = "red";
                ctx.fill();
                ctx.stroke();
                if (prev_lat < 0) {
                    ctx.beginPath();
                    ctx.moveTo(currentX, currentY);
                    ctx.lineTo(prevX, prevY);
                    ctx.strokeStyle = "red";
                    ctx.stroke()
                    // console.log("Current", xx + current.x, yy - current.y)
                }

            }
        }, 100)

        return () => { clearInterval(xy) }
    }, [lat, lon, initial_lat, initial_lon])


    return (
        <div className="rewlative w-full flex flex-col">
            <h1 className="font-bold text-xl">Track: {track}</h1>
            <div className="relative">
                <canvas id="myCanvas" width={402} height={402} className="absolute">
                    Sorry, your browser does not support canvas.
                </canvas>
                {/* <Row row={1} />
                <Row row={2} />
                <Row row={3} />
                <Row row={4} />
                <Row row={5} /> */}
            </div>
        </div>
    )
}
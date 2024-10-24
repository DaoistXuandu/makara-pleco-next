"use client"
import { useEffect, useState } from 'react'

export default function GeoTag({ sog, cog, lon, lat }: { sog: number, cog: number, lon: number, lat: number }) {
    const [time, setTime] = useState("");
    const [date, setDate] = useState(new Date())

    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    function getTime() {
        let date = new Date()
        let format = xF(date.getHours()) + ":" + xF(date.getMinutes()) + ":" + xF(date.getSeconds());
        setTime(format)
    }


    function xF(a: number) {
        if (a < 10)
            return "0" + a
        else
            return a
    }

    function getDate(a: Date) {
        return xF(a.getDate()) + "/" + xF(a.getMonth()) + "/" + a.getFullYear();
    }

    useEffect(() => {
        console.log("ETst", lat, lon)
    }, [lat])

    return (
        <div className='flex flex-col space-y-1'>
            <h1 className='text-xl font-bold'>GeoTag Info</h1>
            <div className='flex flex-row'>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Time: </p>
                        <p>{time}</p>
                    </div>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>SOG: </p>
                        <p>{sog * 0.539957} knot / {sog}km/jam</p>
                    </div>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Date: </p>
                        <p>{getDate(date)}</p>
                    </div>
                </div>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Day: </p>
                        <p>{day[date.getDay()]}</p>
                    </div>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Cog: </p>
                        <p>{cog} <sup>O</sup> </p>
                    </div>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Coordinate: </p>
                        <p>[{lat}, {lon}]</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
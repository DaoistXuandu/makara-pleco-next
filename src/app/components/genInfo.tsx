"use client"
import { useEffect, useState } from 'react'

export default function GenInfo() {
    const [battery, setBattery] = useState(30);
    const [compass, setCompass] = useState(330)
    const [temprature, setTemprature] = useState(20);
    const [cog, setCog] = useState(20);
    const [coordinate, setCoordinate] = useState("[S 3.56734 E 104.67235]")

    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


    function xF(a: number) {
        if (a < 10)
            return "0" + a
        else
            return a
    }

    function getDate(a: Date) {
        return xF(a.getDate()) + "/" + xF(a.getMonth()) + "/" + a.getFullYear();
    }

    return (
        <div className='flex flex-col space-y-1'>
            <h1 className='text-xl font-bold'>Information</h1>
            <div className='flex flex-row'>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Battery Status: </p>
                        <p>{battery}</p>
                    </div>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Compass: </p>
                        <p>{compass}<sup>O</sup> </p>
                    </div>
                </div>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Temparature: </p>
                        <p>{temprature}<sup>O</sup>C </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
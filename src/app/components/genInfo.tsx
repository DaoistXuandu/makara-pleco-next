"use client"
import { useEffect, useState } from 'react'

export default function GenInfo({ battery, temprature }: { battery: number, temprature: number }) {

    return (
        <div className='flex flex-col space-y-1'>
            <h1 className='text-xl font-bold'>Information</h1>
            <div className='flex flex-row'>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-row space-x-2 text-md'>
                        <p className='font-medium'>Battery Status: </p>
                        <p>{battery}</p>
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
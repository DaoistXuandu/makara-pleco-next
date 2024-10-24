"use client"
import { Noto_Sans } from 'next/font/google'
import Title from './components/title'
import GeoTag from './components/geoTag';
import GenInfo from './components/genInfo';
import PositionLog from './components/positionLog';
import SurfaceImaging from './components/surfaceImaging';
import UnderwaterImaging from './components/underwaterImaging';
import Position from './components/position';
import { useEffect, useState } from 'react';
import { gcsGet } from '@/lib/data';
import { getDefaultConfig } from 'tailwind-merge';
import { init } from 'next/dist/compiled/webpack/webpack';
const noto_sans = Noto_Sans({ subsets: ['latin'] })

interface GCS {
  cog: number
  sog: number

  longitude: number
  latittude: number

  battery: number
  temprature: number

  surface_image: string
  uderwater_image: string

  mission: number

  track: string
}

export default function Home() {
  const [temp, setTemp] = useState("")
  const [initialX, setInitialX] = useState(0)
  const [initialY, setInitialY] = useState(0)
  const [initial, setInitial] = useState(false)
  const [gcs, setGcs] = useState<GCS>(
    {
      cog: 0,
      sog: 0,
      longitude: 0,
      latittude: 1,
      battery: 55,
      temprature: 30,
      surface_image: "",
      uderwater_image: "",
      mission: 0,
      track: "A"
    }
  )

  async function getGcs() {
    const data = await gcsGet()
    if (data) {
      if (!initial && data[0].latittude && data[0].longitude) {
        setInitial(true)
        setInitialX(data[0].longitude)
        setInitialY(data[0].latittude)
      }

      setGcs(data[0])
    }
  }

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   getGcs()
    // }, 1000); // Runs every 1 second

    // Cleanup on component unmount
    // return () => clearInterval(intervalId);
  }, [])

  return (
    <div className={`flex text-black flex-col space-y-5 p-12 bg-white h-screen min-h-fit ${noto_sans.className}`}>
      <Title />
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2 space-y-3'>
          <GeoTag cog={gcs.cog} sog={gcs.sog} lon={gcs.longitude} lat={gcs.latittude} />
          <GenInfo battery={gcs.battery} temprature={gcs.temprature} />
          <PositionLog status={gcs.mission} />
        </div>
        <div className='flex flex-col w-1/2 space-y-4'>
          <div className='flex flex-row'>
            <div className='w-1/2'>
              <SurfaceImaging image={gcs.surface_image} />
            </div>
            <div className='w-1/2'>
              <UnderwaterImaging image={gcs.uderwater_image} />
            </div>
          </div>
          {/* <Position /> */}
          <Position track={gcs.track} lon={gcs.longitude} lat={gcs.latittude} />
        </div>
      </div>
    </div >
  );
}

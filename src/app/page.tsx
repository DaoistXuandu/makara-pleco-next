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
const noto_sans = Noto_Sans({ subsets: ['latin'] })

interface GCS {
  cog: number
  sog: number

  longitude: number
  lattitude: number

  battery: number
  temprature: number

  surface_image: string
  uderwater_image: string

  mission: number

  track: string
}

export default function Home() {
  const [track, setTrack] = useState(0)
  const [temp, setTemp] = useState("")
  const [gcs, setGcs] = useState<GCS>(
    {
      cog: 0,
      sog: 0,
      longitude: 0,
      lattitude: 0,
      battery: 55,
      temprature: 30,
      surface_image: "",
      uderwater_image: "",
      mission: 0,
      track: "A"
    }
  )

  function isGcs(data: any): data is GCS {
    return (
      typeof data === 'object' &&
      typeof data.sog === 'number' &&
      typeof data.longitude === 'number' &&
      typeof data.lattitude === 'number' &&
      typeof data.battery === 'number' &&
      typeof data.temprature === 'number' &&
      typeof data.surface_image === 'string' &&
      typeof data.uderwater_image === 'string' &&
      typeof data.mission === 'number' &&
      typeof data.track === 'string'
    );
  }

  async function getGcs() {
    const data = await gcsGet()
    console.log(data)
    if (data && isGcs(data[0])) {
      setGcs(data[0])
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getGcs()
    }, 1000); // Runs every 1 second

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className={`flex text-black flex-col space-y-5 p-12 bg-white h-screen min-h-fit ${noto_sans.className}`}>
      <Title />
      {/* <button onClick={handleClick}>Tekan Ini</button> */}
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2 space-y-3'>
          <GeoTag cog={gcs.cog} sog={gcs.cog} lon={gcs.longitude} lat={gcs.lattitude} />
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
          <Position track={track} />
        </div>
      </div>
    </div >
  );
}

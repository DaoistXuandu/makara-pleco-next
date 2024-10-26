"use client"
import { Noto_Sans } from 'next/font/google'
import Title from './components/title'
import GeoTag from './components/geoTag';
import GenInfo from './components/genInfo';
import PositionLog from './components/positionLog';
import Image from './components/image';
import Position from './components/position';
import { use, useEffect, useState } from 'react';
import { gcsDelete, gcsGetDesc, initialGet } from '@/lib/data';
const noto_sans = Noto_Sans({ subsets: ['latin'] })

interface GCS {
  cog: number
  sog: number

  longitude: number
  latittude: number

  battery: number
  temprature: number

  mission: number

  track: string
}

interface Initial {
  longitude: number
  latittude: number
}

export default function Home() {
  const [gcs, setGcs] = useState<GCS>(
    {
      cog: 0,
      sog: 0,
      longitude: 0,
      latittude: 1,
      battery: 55,
      temprature: 30,
      mission: 0,
      track: ""
    }
  )
  const [gcsInit, setGcsInit] = useState<Initial>(
    {
      longitude: -1,
      latittude: 1
    }
  )


  async function getGcs() {
    const data = await gcsGetDesc()
    const dataInit = await initialGet()

    if (data && data[0]) {
      setGcs(data[0])
    }

    if (dataInit && dataInit[0]) {
      setGcsInit(dataInit[0])
    }
  }

  async function reset() {
    const data = await gcsDelete()
    alert("Sudah")
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getGcs()
    }, 1000); // Runs every 1 second

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className={`flex text-black flex-col space-y-5 pt-10 pb-20 px-12 bg-white h-screen min-h-fit ${noto_sans.className}`}>
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
              <Image image={1} />
            </div>
            <div className='w-1/2'>
              <Image image={2} />
            </div>
          </div>
          {/* <Position /> */}

          <Position track={gcs.track} lon={gcs.longitude} lat={gcs.latittude} initial_lat={gcsInit.latittude} initial_lon={gcsInit.longitude} />
        </div>
      </div>
    </div >
  );
}

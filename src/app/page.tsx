"use client"
import { Nosifer, Noto_Sans } from 'next/font/google'
import Title from './components/title'
import GeoTag from './components/geoTag';
import GenInfo from './components/genInfo';
import PositionLog from './components/positionLog';
import SurfaceImaging from './components/surfaceImaging';
import UnderwaterImaging from './components/underImage';
import Position from './components/position';
import { useState } from 'react';
const noto_sans = Noto_Sans({ subsets: ['latin'] })

export default function Home() {
  const [track, setTrack] = useState(0)

  return (
    <div className={`flex text-black flex-col space-y-5 p-12 bg-white h-screen ${noto_sans.className}`}>
      <Title />
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2 space-y-3'>
          <GeoTag />
          <GenInfo />
          <PositionLog />
        </div>
        <div className='flex flex-col w-1/2 space-y-4'>
          <div className='flex flex-row'>
            <div className='w-1/2'>
              <SurfaceImaging />
            </div>
            <div className='w-1/2'>
              <UnderwaterImaging />
            </div>
          </div>
          <Position track={track} />
        </div>
      </div>
    </div >
  );
}

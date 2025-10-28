"use client"
import { Noto_Sans } from 'next/font/google'
import Title from './components/title'
import GeoTag from './components/geoTag';
import GenInfo from './components/genInfo';
import PositionLog from './components/positionLog';
import Image from './components/image';
import Position from './components/position';
import Video from './components/video';
import { useTelemetry } from '@/hook/telemetry';
const noto_sans = Noto_Sans({ subsets: ['latin'] })

export default function Home() {
  const {
    image, 
    sog, 
    cog, 
    lat, 
    lon, 
    greenBox, 
    blueBox, 
    mission, 
    track, 
    initLat, 
    initLon,
    prevLat,
    prevLon,
  } = useTelemetry()
  
  return (
    <div className={`flex text-black flex-col space-y-5 pt-10 pb-20 px-12 bg-white h-screen min-h-fit ${noto_sans.className}`}>
      <Title />
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2 space-y-3'>
          <GeoTag cog={cog} sog={sog} lon={lon} lat={lat} />
          <GenInfo battery={55} temprature={30} />
          <PositionLog status={mission} />
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

          <Position 
            track={track} 
            lon={lon} 
            lat={lat} 
            initial_lat={initLat} 
            initial_lon={initLon} 
            prev_lon={prevLon} 
            prev_lat={prevLat} />
        </div>
      </div>
      <Video name='Front Camera' image={image} />
    </div >
  );
}

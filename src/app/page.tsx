"use client"
import { Cabin_Sketch, Nosifer, Noto_Sans } from 'next/font/google'
import Title from './components/title'
import GeoTag from './components/geoTag';
import GenInfo from './components/genInfo';
import PositionLog from './components/positionLog';
import SurfaceImaging from './components/surfaceImaging';
import UnderwaterImaging from './components/underwaterImaging';
import Position from './components/position';
import { useEffect, useState } from 'react';
import Video from './components/video';
import { channel } from 'diagnostics_channel';
const noto_sans = Noto_Sans({ subsets: ['latin'] })

interface GCS {
  cog: number
  sog: number
  coordinate: string

  battery: number
  compass: number
  temprature: number

  surfaceImage: string
  underwaterImage: string

  surfaceCamera: string
  underwaterCamera: string

  missionStatus: number

  x: number
  y: number
  z: number
}

export default function Home() {
  const [track, setTrack] = useState(0)
  const Ably = require('ably');
  const [temp, setTemp] = useState("")
  const [gcs, setGcs] = useState<GCS>(
    {
      cog: 0,
      sog: 0,
      coordinate: "",
      battery: 0,
      compass: 0,
      temprature: 0,
      surfaceImage: "",
      underwaterCamera: "",
      surfaceCamera: "",
      underwaterImage: "",
      missionStatus: 0,
      x: 0,
      y: 0,
      z: 0
    }
  )

  async function publishSubscribe() {

    // Connect to Ably with your API key
    const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_KEY)
    ably.connection.once("connected", () => {
      console.log("Connected to Ably!")
    })

    // Create a channel called 'get-started' and register a listener to subscribe to all messages with the name 'first'
    const channel = ably.channels.get("amv-juara")
    await channel.subscribe("gcs", (message: any) => {
      let data = JSON.parse(message.data)
      if (!data.cog)
        data.cog = 0

      if (!data.sog)
        data.sog = 0

      if (!data.coordinate)
        data.coordinate = ""

      if (!data.battery)
        data.battery = 0

      if (!data.compass)
        data.compass = 0

      if (!data.temprature)
        data.temprature = 0

      if (!data.surfaceImage)
        data.surfaceImage = ""

      if (!data.surfaceCamera)
        data.surfaceCamera = ""

      if (!data.underwaterCamera)
        data.underwaterCamera = ""

      if (!data.underwaterImage)
        data.underwaterImage = ""

      if (!data.x)
        data.x = 0
      if (!data.y)
        data.y = 0
      if (!data.z)
        data.z = 0


      if (!data.missionStatus)
        data.missionStatus = 0
      console.log(data)
      setGcs(data)
    });
    await channel.subscribe('first', (message: any) => {
      console.log(message)
      // setTemp(message.data)
    })
  }


  useEffect(() => {
    publishSubscribe()
  }, [])



  return (
    <div className={`flex text-black flex-col space-y-5 p-12 bg-white h-screen ${noto_sans.className}`}>
      <Title />
      <div className='flex flex-row'>
        <div className='flex flex-col w-1/2 space-y-3'>
          <GeoTag cog={gcs.cog} sog={gcs.cog} coordinate={gcs.coordinate} />
          <GenInfo battery={gcs.battery} compass={gcs.compass} temprature={gcs.temprature} />
          <PositionLog status={gcs.missionStatus} />
        </div>
        <div className='flex flex-col w-1/2 space-y-4'>
          <div className='flex flex-row'>
            <div className='w-1/2'>
              <SurfaceImaging image={gcs.surfaceImage} />
            </div>
            <div className='w-1/2'>
              <UnderwaterImaging image={gcs.underwaterImage} />
            </div>
          </div>
          <Position track={track} />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='w-1/2'>
          <p>Front Camera</p>
          <Video image={temp} />
        </div>
        <div className='w-1/2'>
          <p>Underwater Camera</p>
          <Video image={gcs.underwaterCamera} />
        </div>
      </div>
    </div >
  );
}

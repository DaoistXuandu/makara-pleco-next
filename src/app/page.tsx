"use client"
import { Nosifer, Noto_Sans } from 'next/font/google'
import Title from './components/title'
import GeoTag from './components/geoTag';
import GenInfo from './components/genInfo';
import PositionLog from './components/positionLog';
import SurfaceImaging from './components/surfaceImaging';
import UnderwaterImaging from './components/underImage';
import Position from './components/position';
import { useEffect, useState } from 'react';
const noto_sans = Noto_Sans({ subsets: ['latin'] })

export default function Home() {
  const [track, setTrack] = useState(0)
  const Ably = require('ably');
  const [data, setData] = useState("")
  const [value, setValue] = useState("")

  async function publishSubscribe() {

    // Connect to Ably with your API key
    const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_KEY)
    ably.connection.once("connected", () => {
      console.log("Connected to Ably!")
    })

    // Create a channel called 'get-started' and register a listener to subscribe to all messages with the name 'first'
    const channel = ably.channels.get("get-started")
    await channel.subscribe("first", (message: any) => {
      console.log(message.data)
      // setData(message.data)
    });

    // // Publish a message with the name 'first' and the contents 'Here is my first message!'
    // await channel.publish("first", msg)

    // // Close the connection to Ably after a 5 second delay
    // setTimeout(async () => {
    //   ably.connection.close();
    //   await ably.connection.once("closed", function () {
    //     console.log("Closed the connection to Ably.")
    //   });
    // }, 5000);
  }

  useEffect(() => {
    publishSubscribe()
  }, [])



  return (
    <div className={`flex text-black flex-col space-y-5 p-12 bg-white h-screen ${noto_sans.className}`}>
      <Title />
      <div className='h-40 w-full'>
        {(data == "" ? "Null" : data)}
      </div>
      <input className='w-full h-fit border-1 border-green-200' type="text" onChange={e => setValue(e.target.value)} />
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

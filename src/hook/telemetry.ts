"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { connectWebSocket, onMessage } from "@/lib/ws";

export function useTelemetry() {
    const [image, setImage] = useState<string>("");
    const [sog, setSog] = useState<number>(0);
    const [cog, setCog] = useState<number>(0);    
    const [greenBox, setGreenBox] = useState("")
    const [blueBox, setBlueBox] = useState("")
    const [mission, setMission] = useState<number>(0);
    const [track, setTrack] = useState<string>("")

    const [lat, setLat] = useState<string>("");
    const [lon, setLon] = useState<string>("");

    const [initLat, setInitLat] = useState<number>(1);
    const [initLon, setInitLon] = useState<number>(0);

    const [prevLat, setPrevLat] = useState<number>(1);
    const [prevLon, setPrevLon] = useState<number>(0);

    useEffect(() => {
        connectWebSocket();
        
        const checklist: [string, Dispatch<SetStateAction<any>>][] = [
            ["processed", setImage],
            ['show_green', setGreenBox],
            ['show_blue', setBlueBox],
            ['mission', setMission],
        ]

        const unsubscribe = onMessage((msg) => {
            checklist.forEach(([topic, setter]) => {
                if (msg.data.topic.includes(topic)) {
                    setter(msg.data.data);
                }

                if(msg.data.topic.includes('pixhawk')){                    
                    let lat_data = msg.data.data.lat
                    let lon_data = msg.data.data.lon

                    setSog(msg.data.data.msg_spd)
                    setCog(msg.data.data.msg_heading)
                    setTrack(msg.data.data.track)
                    
                    setInitLat(lat_data[0])
                    setInitLon(lon_data[0])
                    setLat(lat_data[lat_data.length - 1])
                    setLon(lon_data[lon_data.length - 1])

                    if(lat_data.length - 2 > 0 && lon_data.length - 2 > 0){
                        setPrevLat(lat_data[lat_data.length - 2])
                        setPrevLon(lon_data[lon_data.length - 2])
                    }
                }
            });
        });

        return () => unsubscribe();
    }, []);

    return {
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
    };
}

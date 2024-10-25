import { getImage } from "@/lib/data";
import { disconnect } from "process";
import { useEffect, useState } from "react";



interface ImageData {
    longitude: number
    latittude: number
    image: string
    created_at: Date
}

export default function Image({ image }: { image: number }) {

    const [mission, setMission] = useState<ImageData>({
        longitude: -1,
        latittude: 1,
        image: "",
        created_at: new Date()
    })

    async function getData() {
        const data = await getImage(image)
        if (data && data[0]) {
            setMission(data[0])
        }
    }

    function xF(data: number) {
        return `${(data < 10 ? "0" : "")}${data}`
    }
    function getInfoTIme(time: Date) {
        return `${xF(time.getHours())}:${xF(time.getMinutes())}:${xF(time.getSeconds())}`
    }
    // useEffect(() => {
    //     console.log(mission.image.length, mission.image)
    // }, [mission])

    useEffect(() => {
        const interval = setInterval(() => {
            getData()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <p className="font-bold text-xl">Mission {image == 1 ? "Surface" : "Underwater"} Imaging</p>
            {mission.image.length != 0 ? (
                <div>
                    <img src={`data:image/png;base64,${mission.image}`} alt="" />
                    <p>Time: {mission.created_at ? getInfoTIme(new Date(mission.created_at)) : ""}</p>
                    <p>Coordinate: [{mission.latittude}, {mission.longitude}]</p>
                </div>
            ) : (
                <div>
                    <p>Belum mengambil gambar</p>
                </div>
            )}
        </div>
    );
}

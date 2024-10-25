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

    useEffect(() => {
        const interval = setInterval(() => {
            getData()
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <p className="font-bold text-xl">Mission {image == 1 ? "Surface" : "Underwater"} Imaging</p>
            {mission.image != "" ? (
                <div>
                    <img src={`data:image/png;base64,${mission.image}`} alt="" />
                    <p>Time: {mission.created_at ? new Date(mission.created_at).toLocaleDateString() : ""}</p>
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

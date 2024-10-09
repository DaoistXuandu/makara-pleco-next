import { useState } from "react"

export default function PositionLog({ status }: { status: number }) {

    const mission = [
        "Preparation",
        "Start",
        "Floating Ball Set",
        "Mission Surface Imaging",
        "Mission Underwater Imaging",
        "Finish"
    ]

    const mission_status = [
        "Start",
        "Process",
        "Pending"
    ]

    const mission_color = [
        "bg-green-500",
        "bg-yellow-500",
        "bg-gray-500"
    ]

    function getMissionStatus(cur: number) {
        if (cur == status)
            return mission_status[1];
        else if (cur < status)
            return mission_status[0];
        else return mission_status[2]
    }

    function getMissionColor(cur: number) {
        if (cur == status)
            return mission_color[1];
        else if (cur < status)
            return mission_color[0];
        else return mission_color[2]
    }

    return (
        <div className='flex flex-col space-y-1'>
            <h1 className='text-xl font-bold'>Position Log</h1>
            <div className="flex flex-col">
                <div className="flex flex-row items-end space-x-2 text-md">
                    <h1 className="font-bold">Current Mission:</h1>
                    <p>{mission[status]}</p>
                </div>
                <div className="">
                    <h1 className="font-bold text-md">Status:</h1>
                    <ul className="ml-2 flex flex-col space-y-1">
                        {
                            mission.map((item, index) => (
                                <li className={`flex flex-row space-x-3`}>
                                    <h1>{index + 1}. {item}</h1>
                                    <div className={`text-white p-1 text-sm rounded-xl pl-4 pr-4 ${getMissionColor(index)}`}>{getMissionStatus(index)}</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
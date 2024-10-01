import { useState } from "react"
import Row from "./row";

export default function Position({ track }: { track: number }) {
    const [location, setLocation] = useState(5)
    const length = 5;


    return (
        <div className="w-3/5 flex flex-col">
            <h1 className="font-bold text-xl">Track: {(track == 0 ? 'A' : 'B')}</h1>
            <Row row={1} />
            <Row row={2} />
            <Row row={3} />
            <Row row={4} />
            <Row row={5} />
        </div>
    )
}
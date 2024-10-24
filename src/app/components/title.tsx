import Image from "next/image"

export default function Title() {
    return (
        <div className="h-fit">
            <div className = "flex flex-row items-center space-x-4">
            <Image
            src={"/static/image/amvai.png"}
            alt="Makara Pleco"
            width={100}
            height={20}
            />
            <h1 className="flex flex-row text-black space-x-2 font-bold text-4xl">
                <p className="text-yellow-400">AMV UI</p>
                <p>-</p>
                <p>MAKARA PLECO</p>
            </h1>
            </div>
        </div>
    )
}
export default function UnderwaterImaging({ image }: { image: string }) {
    return (
        <div>
            <p className="font-bold">Mission Underwater Imaging</p>
            <img src={image} alt="" />
        </div>
    )
}
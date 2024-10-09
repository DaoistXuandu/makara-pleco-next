export default function SurfaceImaging({ image }: { image: string }) {
    return (
        <div>
            <p className="font-bold text-xl">Mission Surface Imaging</p>
            <img src={image} alt="" />
        </div>
    )
}
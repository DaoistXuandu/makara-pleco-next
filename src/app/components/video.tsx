export default function Video({ image, name }: { image: string, name: string }) {
    return (
        <div>
            <h1 className='text-xl font-bold'>{name}</h1>
            <img src={"data:image/png;base64," + image} alt="Camera Feed" />
        </div>
    )
}
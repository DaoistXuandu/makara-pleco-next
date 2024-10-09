export default function Video({ image }: { image: string }) {
    return (
        <div>
            <img src={"data:image/png;base64," + image} alt="Camera Feed" />
        </div>
    )
}
export default function SurfaceImaging({ image }: { image: string }) {
  return (
    <div>
      <p className="font-bold text-xl">Mission Surface Imaging</p>
      {image ? (
        <img src={image} alt="" />
      ) : (
        <div>
          <p>Belum mengambil gambar</p>
        </div>
      )}
    </div>
  );
}

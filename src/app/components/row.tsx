export default function Row({ row }: { row: number }) {
    let data = [1, 2, 3, 4, 5];
    let value = "EDCBA"
    return (
        <div className="w-full flex flex-row">
            {
                data.map((item, index) => (
                    <div key={index} className={`w-1/5 relative border border-1 border-black ${row == 1 ? '' : 'border-t-0'} ${index == 0 ? '' : 'border-l-0'}`}>
                        <div className="absolute top-2 right-2">{(row == 1 ? value[item - 1] : "")}</div>
                        <div className="absolute bottom-2 left-2">{(index == 0 ? (5 - row + 1) : "")}</div>
                    </div>
                ))
            }
        </div >
    )
}
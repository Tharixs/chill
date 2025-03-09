import Image from "next/image";

export default function ItemFilm({
  item,
  noDesc,
}: {
  item: {
    id: number;
    title: string;
    rating: string;
    type: string;
    img: string;
  };
  noDesc?: boolean;
}) {
  return (
    <div>
      <div key={item.id} className="w-[400px] flex-shrink-0">
        <div className="relative">
          {item.type === "new-episode" && (
            <button
              type="submit"
              className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 p-2 text-white font-bold rounded-full flex items-center gap-2"
            >
              Episode Baru
            </button>
          )}
          {item.type === "top" && (
            <div className="absolute top-0 right-3 flex flex-col bg-red-600 p-2 text-white font-bold rounded-tr-lg rounded-bl-lg items-center gap-2">
              <span>Top</span>
              <span>10</span>
            </div>
          )}
          <Image
            src={item.img}
            alt={item.title}
            className="w-full rounded-lg shadow-lg"
            width={400}
            height={300}
          />
          {!noDesc && (
            <div className="w-full absolute bottom-0 left-0 h-14 bg-gradient-to-b from-transparent to-black/50 flex items-end p-4 justify-between">
              <h2 className="text-lg font-semibold text-white">Blue Lock</h2>
              <span className="text-md text-white">
                <i className="fa-solid fa-star"></i> 4.5/5
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Film } from "@/generated/prisma";
import Image from "next/image";
import { useState } from "react";
import { EditFilmSheet } from "../form/edit-film-sheet";
import { useSession } from "next-auth/react";

export default function ItemFilm({
  item,
  noDesc,
}: {
  item: Film;
  noDesc?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleOpenEditFilm = () => {
    if (!session || session?.user?.role !== "ADMIN") {
      console.log(session);
      alert(
        "Anda tidak memiliki akses untuk mengedit film silahkan login sebagai admin"
      );
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div onClick={handleOpenEditFilm}>
        <div key={item.id} className="w-[400px] flex-shrink-0">
          <div className="relative">
            {item.type === "NEW_RELEASE" && (
              <button
                type="submit"
                className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 p-2 text-white font-bold rounded-full flex items-center gap-2"
              >
                Episode Baru
              </button>
            )}

            {item.type === "TOP_RATED" && (
              <div className="absolute top-0 right-3 flex flex-col bg-red-600 p-2 text-white font-bold rounded-tr-lg rounded-bl-lg items-center gap-2">
                <span>Top</span>
                <span>10</span>
              </div>
            )}
            {item.type === "PREMIUM" && (
              <button
                type="submit"
                className="absolute top-2 left-2 bg-yellow-600 hover:bg-yellow-700 p-2 text-white font-bold rounded-full flex items-center gap-2"
              >
                Premium
              </button>
            )}
            <Image
              src={item.thumbnail}
              alt={item.title}
              className="w-full rounded-lg shadow-lg"
              width={400}
              height={300}
            />
            {!noDesc && (
              <div className="w-full absolute bottom-0 left-0 h-14 bg-gradient-to-b from-transparent to-black/50 flex items-end p-4 justify-between">
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <span className="text-md text-white">
                  <i className="fa-solid fa-star"></i> {item.rating}/5
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <EditFilmSheet open={open} onOpenChange={setOpen} id={item.id} />
    </>
  );
}

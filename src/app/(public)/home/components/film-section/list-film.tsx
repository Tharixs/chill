import { Film } from "@/generated/prisma";
import ItemFilm from "./item-film";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const ListRiwayatFilm = [
  {
    id: 1,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/riwayat-image-1.png",
  },
  {
    id: 2,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/riwayat-image-2.png",
  },
  {
    id: 3,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/riwayat-image-3.png",
  },
  {
    id: 4,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/riwayat-image-4.png",
  },
  {
    id: 5,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/riwayat-image-4.png",
  },
  {
    id: 6,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/riwayat-image-4.png",
  },
];
export const ListTopFilm = [
  {
    id: 1,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/top-image-1.png",
  },
  {
    id: 2,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/top-image-2.png",
  },
  {
    id: 3,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/top-image-3.png",
  },
  {
    id: 4,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/top-image-4.png",
  },
  {
    id: 5,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/top-image-4.png",
  },
  {
    id: 6,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/top-image-4.png",
  },
];
export const ListTrendFilm = [
  {
    id: 1,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-1.png",
  },
  {
    id: 2,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-2.png",
  },
  {
    id: 3,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-3.png",
  },
  {
    id: 4,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-4.png",
  },
  {
    id: 5,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-4.png",
  },
  {
    id: 6,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-4.png",
  },
];
export const ListNewRilisFilm = [
  {
    id: 1,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/tranding-image-1.png",
  },
  {
    id: 2,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-2.png",
  },
  {
    id: 3,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/tranding-image-3.png",
  },
  {
    id: 4,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-4.png",
  },
  {
    id: 5,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "new-episode",
    img: "/tranding-image-4.png",
  },
  {
    id: 6,
    title: "Dont Look Up",
    rating: "4.5/5",
    type: "top",
    img: "/tranding-image-4.png",
  },
];
export default function ListFilm({
  title,
  films,
  noDesc,
  loading,
}: {
  title: string;
  films: Film[] | undefined;
  noDesc?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="p-10 mx-auto">
      <h1 className="text-white text-3xl font-bold mb-12">{title}</h1>
      <Carousel className="lg:w-[95%] md:w-[80%] mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-8"></div>
          </div>
        ) : (
          <CarouselContent>
            {films?.map((item, index) => (
              <CarouselItem
                key={index}
                className="lg:basis-1/4 md:basis-2/2 sm:basis-1/2 xs:basis-full"
              >
                <ItemFilm item={item} key={item.id} noDesc={noDesc} />
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

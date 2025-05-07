/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ListFilm from "./(public)/home/components/film-section/list-film";
import HeroSection from "./(public)/home/components/hero-section/main";
import Footer from "./(public)/home/footer";
import Navbar from "./(public)/home/navbar";
import { useGetFilmsQuery } from "./_api-client/filmApi";

export default function page() {
  const { data: films, isFetching } = useGetFilmsQuery();

  return (
    <div className="bg-neutral-900">
      <Navbar theme="dark" />

      <HeroSection />

      <ListFilm
        title="Riwayat Film"
        films={films?.data?.items}
        loading={isFetching}
      />
      <ListFilm
        title="Top Film"
        films={films?.data?.items?.filter((item) => item.type === "TOP_RATED")}
        noDesc
        loading={isFetching}
      />
      <ListFilm
        title="Tranding Film"
        films={films?.data?.items}
        noDesc
        loading={isFetching}
      />
      <ListFilm
        title="Rilis Film"
        films={films?.data?.items?.filter(
          (item) => item.type === "NEW_RELEASE"
        )}
        noDesc
        loading={isFetching}
      />

      <hr className="border-t border-gray-700" />
      <Footer />
    </div>
  );
}

"use client";

import ListFilm, {
  ListNewRilisFilm,
  ListRiwayatFilm,
  ListTopFilm,
  ListTrendFilm,
} from "./home/components/film-section/list-film";
import HeroSection from "./home/components/hero-section/main";
import Footer from "./home/footer";
import Navbar from "./home/navbar";

export default function page() {
  // comment
  return (
    <div className="bg-neutral-900">
      <Navbar theme="dark" />

      <HeroSection />

      <ListFilm title="Riwayat Film" films={ListRiwayatFilm} />
      <ListFilm title="Top Film" films={ListTopFilm} noDesc />
      <ListFilm title="Tranding Film" films={ListTrendFilm} noDesc />
      <ListFilm title="Rilis Film" films={ListNewRilisFilm} noDesc />

      <hr className="border-t border-gray-700" />
      <Footer />
    </div>
  );
}

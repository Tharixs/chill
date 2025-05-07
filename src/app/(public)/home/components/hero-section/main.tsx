import Image from "next/image";
import HeroTitle from "./hero-title";
import HeroAction from "./hero-action";

export default function HeroSection() {
  return (
    <div className="relative flex justify-center items-center">
      <Image
        src="/hero.png"
        alt="Hero Image"
        className="w-full h-[587px] object-cover"
        width={2070}
        height={1380}
      />

      <div className="absolute bottom-0 w-full h-[587px] bg-black/50 z-10">
        <div className="flex flex-col h-full justify-end w-full px-6 md:px-20 py-8 md:py-20 gap-6 md:gap-12">
          <HeroTitle />
          <HeroAction />
        </div>
      </div>
    </div>
  );
}

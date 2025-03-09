import { Button } from "@/components/ui/button";
import { VolumeOff } from "lucide-react";

export default function HeroAction() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-800 text-sm md:text-base text-white font-light rounded-full"
        >
          Mulai
        </Button>
        <Button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-sm md:text-base text-white font-light rounded-full flex items-center gap-2"
        >
          <i className="fa-solid fa-circle-info"></i> Selengkapnya
        </Button>
        <Button
          type="submit"
          className="flex items-center rounded-full border-[1px] border-white px-6 py-3"
        >
          <span className="font-light text-white">18+</span>
        </Button>
      </div>

      <Button className="flex items-center rounded-full">
        <VolumeOff color="white" />
      </Button>
    </div>
  );
}

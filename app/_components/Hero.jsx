import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="flex gap-3 flex-col items-center justify-center pt-14 pb-7">
      <h2 className="font-bold text-[46px] text-center">
        Find Home <span className="text-primary"> Services/Repair</span>
        <br /> Near you
      </h2>
      <h2 className="text-xl text-gray-400">
        Expolre Best home Service & Repair near
      </h2>
      <div className="mt-4 flex items-center gap-6">
        <Input placeholder="Search" className="rounded-full md:w-[350px]" />
        <Button className="rounded-full h-[60]">
          <Search className="h-5 w-5 " />
        </Button>
      </div>
    </div>
  );
};

export default Hero;

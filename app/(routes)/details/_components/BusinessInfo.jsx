import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const BusinessInfo = ({ businessDetails }) => {
  return (
    businessDetails?.name && (
      <div className="md:flex items-center gap-4 ">
        <Image
          src={businessDetails?.image[0]?.url}
          width={150}
          height={200}
          alt={businessDetails?.name}
          className="rounded-full md:h-[150px] md:w-[150px] object-cover h-[120px] w-[120px]"
        />
        <div className="md:flex justify-between items-center w-full">
          <div className=" flex flex-col md:mt-0 mt-4 items-baseline gap-2">
            <h2 className="text-primary p-1 px-2 rounded-full bg-purple-100 text-md">
              {businessDetails?.category?.name}
            </h2>
            <h2 className="font-bold text-[30px] md:text-[35px]">
              {businessDetails?.name}
            </h2>
            <h2 className="flex gap-2 text-md text-gray-500">
              <MapPin />
              {businessDetails?.address}
            </h2>
            <h2 className="flex gap-2 text-gray-500 ">
              <Mail />
              {businessDetails?.email}
            </h2>
          </div>
          <div className="flex flex-col mt-3 md:items-end gap-2 md:gap-5">
            <Button className="w-12">
              <Share size={25} />
            </Button>
            <h2 className="flex gap-2 text-primary md:text-lg text-md ">
              <User /> {businessDetails?.contactPerson}
            </h2>
            <h2 className="md:text-lg text-md text-gray-500 flex gap-2">
              <Clock />
              Available 8:00 AM to 9:00 PM
            </h2>
          </div>
        </div>
      </div>
    )
  );
};

export default BusinessInfo;

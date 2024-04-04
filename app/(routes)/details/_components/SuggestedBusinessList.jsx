import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import BookingSection from "./BookingSection";

const SuggestedBusinessList = ({ businessDetails }) => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    businessDetails && getBusinessList();
  }, [businessDetails]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(businessDetails?.category?.name).then(
      (resp) => {
        setBusinessList(resp?.businessLists);
      }
    );
  };
  return (
    <div className=" md:pl-10">
      <BookingSection businessDetails={businessDetails}>
        <Button className="flex gap-2 w-full ">
          <NotebookPen />
          Book Service
        </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2 className=" font-bold text-lg my-3 ">Similar Business</h2>
        <div>
          {businessList &&
            businessList.map((item, index) => (
              <Link
                key={index}
                href={"/details/" + item?.id}
                className="flex gap-3 mb-4  cursor-pointer hover:border rounded-lg hover:border-gray-300 p-2 hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src={item?.image[0]?.url}
                  alt={item?.name}
                  width={80}
                  height={80}
                  className=" rounded-lg object-cover "
                />
                <div className=" ">
                  <h2 className="font-bold text-md">{businessDetails.name}</h2>
                  <h2 className="text-primary text-sm">
                    {businessDetails.contactPerson}
                  </h2>
                  <h2 className="text-gray-400 text-xs">
                    {businessDetails.address}
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedBusinessList;

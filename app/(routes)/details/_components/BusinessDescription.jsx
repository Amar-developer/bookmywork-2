import Image from "next/image";
import React from "react";

const BusinessDescription = ({ businessDetails }) => {
  return (
    businessDetails?.name && (
      <div>
        <h2 className="font-bold text-[25px]">Description</h2>
        <p className=" mt-4 md:text-lg text-sm text-gray-600">
          {businessDetails?.about}
        </p>
        <h2 className="font-bold text-[25px]">Gallery</h2>
        <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {businessDetails?.image.map((item, index) => (
            <Image
              src={item?.url}
              alt="image"
              key={index}
              width={700}
              height={200}
              className=" rounded-lg hover:scale-95"
            />
          ))}
        </div>
      </div>
    )
  );
};

export default BusinessDescription;

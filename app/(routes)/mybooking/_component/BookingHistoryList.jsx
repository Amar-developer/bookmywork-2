import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const BookingHistoryList = ({ bookingHistory }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {bookingHistory?.map((booking, index) => (
        <div key={index} className="flex gap-4 border rounded-lg p-3 mb-2">
          {booking?.businessList?.name && (
            <Image
              src={booking?.businessList?.image[0]?.url}
              alt="image"
              width={120}
              height={120}
              className=" rounded-lg object-cover"
            />
          )}
          <div className="flex flex-col gap-2">
            <h2 className=" font-bold">{booking?.businessList?.name}</h2>
            <h2 className="flex gap-2 text-primary">
              <User />
              {booking?.businessList?.contactPerson}
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <MapPin />
              {booking?.businessList?.address}
            </h2>
            <h2 className="flex gap-2 text-xs items-center text-gray-500">
              <Calendar />
              Service on: {booking?.date}
            </h2>
            <h2 className="flex gap-2 text-xs items-center text-gray-500">
              <Clock />
              Service on: {booking?.time}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryList;

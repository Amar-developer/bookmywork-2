"use client";

import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment/moment";

const BookingSection = ({ children, businessDetails }) => {
  const [date, setDate] = useState(new Date());
  const [timeSloṭ, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);

  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BusinessBookedSlot();
  }, [date]);

  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(
      businessDetails.id,
      moment(date).format("DD-MMM-yyyy")
    ).then((resp) => {
      // console.log(resp);
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createBooking(
      businessDetails?.id,
      moment(date).format("DD-MMM-yyyy"),
      selectedTime,
      data?.user.email,
      data?.user.name
    ).then(
      (resp) => {
        if (resp) {
          setDate();
          setSelectedTime("");
          toast("Service Booked Successfully.");

          //Toast msg
        }
      },
      (e) => {
        toast("Error while Creating Booking");

        //error
      }
    );
  };

  const isBookedSlot = (time) => {
    return bookedSlot.find((item) => item.time === time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className=" overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Services</SheetTitle>
            <SheetDescription>
              Select date and time slot to book a service
              {/* date picker */}
              <h2 className="my-5 font-bold">Select Date</h2>
              <div className="gap-5 items-baseline flex flex-col">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              {/* time slot Picker */}
              <h2 className="my-5 font-bold">Select Time Slot</h2>
              <div className="gap-3 grid grid-cols-3">
                {timeSloṭ.map((item, index) => (
                  <Button
                    key={index}
                    disabled={isBookedSlot(item.time)}
                    variant="outline"
                    className={`border rounded-full px-3 p-2 hover:bg-primary hover:text-white ${
                      selectedTime === item.time && "bg-primary text-white"
                    } `}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-3">
                <Button className="" variant="destructive" type="submit">
                  Cancel
                </Button>
                <Button
                  onClick={() => saveBooking()}
                  disabled={!(selectedTime && date)}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;

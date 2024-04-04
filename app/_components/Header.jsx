"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();
  useEffect(() => {}, [data]);

  return (
    <div className="flex p-5  shadow-sm justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.svg" width={30} height={50} alt="logo" />
        <div className="md:flex hidden items-center gap-6">
          <Link
            href={"/"}
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            Home
          </Link>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            Services
          </h2>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            About Us
          </h2>
        </div>
      </div>
      <div>
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.user?.image}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/mybooking/"}> My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                LogOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope")}>Login / Sign Up</Button>
        )}
      </div>
    </div>
  );
};

export default Header;

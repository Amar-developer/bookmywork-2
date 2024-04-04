"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import BusinessDescription from "../_components/BusinessDescription";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";

const BusinessDetails = ({ params }) => {
  const { data, status } = useSession();
  const [businessDetails, setBusinessDetails] = useState([]);

  useEffect(() => {
    params && getBuinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getBuinessById = () => {
    GlobalApi.getBuinessById(params.businessId).then((resp) =>
      setBusinessDetails(resp.businessList)
    );
  };

  const checkUserAuth = () => {
    if (status == "loading") {
      return <p>Loading...</p>;
    }
    if (status == "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status == "authenticated" &&
    businessDetails && (
      <div className="px-8 lg:px-36 py-6 lg:py-20">
        <BusinessInfo businessDetails={businessDetails} />
        <div className="grid grid-cols-3 mt-16">
          <div className=" col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription businessDetails={businessDetails} />
          </div>
          <div className="">
            <SuggestedBusinessList businessDetails={businessDetails} />
          </div>
        </div>
      </div>
    )
  );
};

export default BusinessDetails;

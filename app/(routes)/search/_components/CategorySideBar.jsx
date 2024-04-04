"use client";
import GlobalApi from "@/app/_services/GlobalApi";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategorySideBar = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const params = usePathname();
  //   const category = params.split("/")[2];

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  // get all categories List

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  };
  return (
    <div>
      <h2 className="text-lg font-bold text-primary mt-10 mb-3">Category</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={`/search/${category?.name}`}
            key={index}
            className={`flex border rounded-lg gap-4 p-3 cursor-pointer mb-3 md:mr-10 hover:text-primary hover:border-primary hover:bg-purple-50 hover:shadow-md items-center ${
              selectedCategory === category.name &&
              "border-primary text-primary shadow-md bg-purple-50"
            }`}
          >
            <Image
              src={category?.icon?.url}
              width={30}
              height={30}
              alt="logo"
            />
            <h2 className="">{category?.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySideBar;

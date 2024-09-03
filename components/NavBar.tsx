"use client";
import { useGetCurrentOwner } from "@/api/owner";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
const NavBar = () => {
  const { data } = useGetCurrentOwner();

  return (
    <div className="h-16 w-full   left-0  bg-slate-400">
      <div className="flex justify-between mx-auto h-full  items-center max-w-screen-2xl">
        <div className="text-2xl text-orange-600">Baggies</div>
        <ul className="flex gap-3 items-center">
          <li>
            <Link href={"/owner/products"}>Products</Link>
          </li>
          <li>
            <Link href={"/owner/createProduct"}>CreateProducts</Link>
          </li>
          <li>Welcome {data?.fullName}</li>
          <li>
            <FaUser />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

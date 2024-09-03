"use client";
import { useGetCurrentOwner } from "@/api/owner";
import NavBar from "@/components/NavBar";
import React from "react";
import ProductCard from "./ProductCard";
import Filteration from "@/components/Filteration";
import Search from "@/components/ui/Search";

const Products = () => {
  const { data } = useGetCurrentOwner();
  return (
    <>
      <NavBar /> 
      <div className="max-w-screen-2xl mx-auto grid gap-4  grid-cols-12">
       <div className="row-span-1 col-span-12 justify-self-end mt-4"> <Search /></div>
        <div className="col-span-3">
          <Filteration />
        </div>
        <div className="col-span-9 grid grid-cols-9 auto-rows-max items-center gap-4  justify-center">
          {data?.products.map((product: any) => {
            return (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                img={product.image}
                finalPrice={product.finalPrice}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;

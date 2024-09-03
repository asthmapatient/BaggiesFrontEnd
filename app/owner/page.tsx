import React from "react";
import { OwnerLoginFrom, OwnerRegisterForm } from "@/components/authentication";

const OwnerPage = () => {
  return (
    <div className="h-screen flex flex-col ">
      <h1 className="text-4xl">Baggies</h1>
      <div className="flex flex-col flex-1  justify-center self-center w-full    max-w-5xl ">
        <h2 className=" w-full">
          welcome to <span className="  text-orange-700 text-2xl">Baggies</span>
        </h2>
        <div className="flex  self-center w-full   gap-20 max-w-5xl">
          <OwnerRegisterForm />
          <OwnerLoginFrom />
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;

import React from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

const Filteration = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div className="h-full">
      <form action="" className="flex flex-col gap-4">
        <Input type="text" placeholder="maxPrice"  />
        <Input type="range" min={0} max={10000}></Input>
        <Input type="text" placeholder="minPrice" />
      </form>
    </div>
  );
};

export default Filteration;

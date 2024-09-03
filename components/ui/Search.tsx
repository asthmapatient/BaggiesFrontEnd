import React from "react";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="border-2 rounded-3xl p-2 flex gap-3 focus:border-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register("name")}
        className="   focus:outline-none"
      />
      <button type="submit" className="">
        <CiSearch className="" />
      </button>
    </form>
  );
};

export default Search;

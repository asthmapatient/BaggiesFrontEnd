"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/api/product";
import toast from "react-hot-toast";
const CreateProductForm = () => {
  const { mutate, isLoading } = createProduct();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      image: data.image[0],
    };
    mutate(formData, {
      onSuccess: () => {
        toast.success("Product Created Successfully");
        reset();
      },
      onError: () => {
        toast.error("Failed to create product");
      },
    });
  };
  return (
    <div className="max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormItem className="w-full">
          <Input
            type="file"
            placeholder="productImage"
            {...register("image")}
          />
        </FormItem>
        <div className="flex flex-wrap gap-3">
          <FormItem className=" flex-1">
            <Input
              type="text"
              placeholder="productName"
              {...register("name")}
            />
          </FormItem>
          <FormItem className="flex-1">
            <Input
              type="text"
              placeholder="productPrice"
              {...register("price")}
            />
          </FormItem>
          <FormItem className="flex-1">
            <Input
              type="text"
              placeholder="discountAmount"
              {...register("discount")}
            />
          </FormItem>
        </div>

        <Button className="bg-blue-400 rounded-3xl" type="submit">
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProductForm;

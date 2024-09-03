"use client";
import { editProductById, getProductById } from "@/api/product";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import NavBar from "@/components/NavBar";

const page = ({ params }: any) => {
  type formData = {
    name: String;
    price: String;
    discount: String;
    image?: String;
  };
  const { data } = getProductById(params.id);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      image: "",
      name: "",
      price: "234",
      discount: "234",
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        image: "",
        name: data.name || "",
        price: data.price || "",
        discount: data.discount || "",
      });
    }
  }, [data, reset]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { mutate, isLoading } = editProductById();
  const handleEdit = (data: any) => {
    console.log(data);
    const formData: formData = {
      name: data.name,
      price: data.price,
      discount: data.discount,
    };
    if (data.image.length === 0) {
      mutate(
        { id: params.id, data: formData },
        {
          onSuccess: () => {
            toast.success("edited Successfully");
            setDialogOpen(false);
          },
        }
      );
    } else {
      formData.image = data.image[0];
      mutate(
        { id: params.id, data: formData },
        {
          onSuccess: () => {
            toast.success("edited Successfully");
            setDialogOpen(false);
          },
        }
      );
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex  gap-5 m-5">
        <div className="w-1/4">
          <Image
            alt="image"
            className="w-full h-full"
            src={data?.image}
            width={100}
            height={100}
          />
        </div>
        <form action="" className="flex w-3/4 gap-5">
          <div className="flex-col gap-4 flex flex-1">
            <Input type="file" {...register("image")} />
            <Input type="text" placeholder="name" {...register("name")} />
            <Input type="text" placeholder="price" {...register("price")} />
            <Input
              type="text"
              placeholder="discount"
              {...register("discount")}
            />
            <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogTrigger className="bg-pink-300 rounded-xl p-3">
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you wanna edit ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit(handleEdit)}>
                    {isLoading ? "Editing" : "Edit"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;

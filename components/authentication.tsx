"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useOwnerLogin } from "@/api/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const OwnerLoginFrom = () => {
  const { register, handleSubmit } = useForm();
  const { mutate: ownerLogin } = useOwnerLogin();
  const router = useRouter();
  const pathname = usePathname();
  const onSubmit = (data: any) => {
    if (pathname === "/owner") {
      ownerLogin(data, {
        onSuccess: () => {
          toast.success("Login Success");
          router.push("/owner/products");
        },
      });
    }
  };
  return (
    <div className="flex-1 flex flex-col gap-4  ">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <Input type="email" placeholder="email" {...register("email")} />
        </FormItem>
        <FormItem>
          <Input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </FormItem>

        <Button className="bg-blue-400 rounded-3xl" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export const OwnerRegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <Input
            type="text"
            placeholder="full Name"
            {...register("fullName")}
          />
        </FormItem>
        <FormItem>
          <Input type="email" placeholder="email" {...register("email")} />
        </FormItem>
        <FormItem>
          <Input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </FormItem>
        <Button type="submit" className="bg-blue-400 rounded-3xl">
          Submit
        </Button>
      </form>
    </div>
  );
};

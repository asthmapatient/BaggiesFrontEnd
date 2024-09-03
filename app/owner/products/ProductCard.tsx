import Image from "next/image";
import React from "react";
import imageNotFound from "@/public/imagenotfound.jpeg"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProdcutById } from "@/api/product";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductCard = ({ _id, name, img, finalPrice }: any) => {
  const { mutate: deleteProduct, isLoading } = deleteProdcutById();
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/owner/products/${id}`);
  };
  const handleDelete = (id: number) => {
    console.log(id);
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("Deleted Item Successfully");
      },
    });
  };
  return (
    <div className="col-span-3  border-2 gap-4 flex flex-col items-center justify-center h-full ">
      <div className="flex justify-center w-full h-full self-center ">
        <Image
          src={img || imageNotFound}
          alt="image"
          width={100}
          className=""
          height={100}
        />
      </div>
      <p>{name}</p>
      <p>{finalPrice}</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleEdit(_id)}
          className="bg-pink-300 rounded-xl p-3"
        >
          Edit
        </button>
        <AlertDialog>
          <AlertDialogTrigger className="bg-pink-300 rounded-xl p-3">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                U will delete {name}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete(_id);
                }}
              >
                {isLoading ? "Deleting" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProductCard;

import NavBar from "@/components/NavBar";
import React from "react";
import CreateProductForm from "./CreateProductForm";

const CreateProduct = () => {
  
  return (
    <>
      {" "}
      <NavBar />
      <div className="max-w-screen-2xl mx-auto">
        <h1>Create Your Porduct</h1>s
        <h2>Product Details</h2>
        <CreateProductForm />
      </div>
    </>
  );
};

export default CreateProduct;

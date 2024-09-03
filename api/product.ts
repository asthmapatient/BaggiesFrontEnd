import { useMutation, useQuery, useQueryClient } from "react-query";
import { Axios } from "./axiosInterceptor";

export const createProduct = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = Axios.post("/products/createProduct", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
  });
};

export const getProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await Axios.get("/products");
      return await res.data;
    },
  });
};

export const getProductById = (id: String) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await Axios.get(`/products/${id}`);
      return res.data;
    },
  });
};
export const deleteProdcutById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await Axios.delete(`/products/${id}`);
      return await res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CurrentOwner");
      queryClient.invalidateQueries("products");
    },
  });
};
export const editProductById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: any; data: any }) => {
      const res = await Axios.patch(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CurrentOwner");
      queryClient.invalidateQueries("products");
    },
  });
};

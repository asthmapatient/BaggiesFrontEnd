import { useQuery } from "react-query";
import { Axios } from "./axiosInterceptor";

export const useGetCurrentOwner = () => {
  return useQuery({
    queryKey: ["CurrentOwner"],
    queryFn: async (): Promise<any> => {
      const res = await Axios.get("/owner/currentOwner");
      return await res.data;
    },
  });
};



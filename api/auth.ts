import { useMutation } from "react-query";
import { Axios } from "./axiosInterceptor";
export const useOwnerLogin = () => {
  return useMutation((data: { email: string; password: string }) => {
    const res = Axios.post("owner/loginOwner", data, {
      withCredentials: true,
    });
    return res;
  });
};


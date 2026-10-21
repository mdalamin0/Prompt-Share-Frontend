import { useMutation, useQuery } from "@tanstack/react-query";
import {  forgotPassword, getMe, resendVerficationCode, resetPassword, userLogin, userLogout, userRegister, verifyEmail } from "../auth.api";


export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

export const useResendVerificationCode = () => {
  return useMutation({
    mutationFn: resendVerficationCode,
  });
};



export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};


export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

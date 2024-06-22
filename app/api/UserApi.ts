import { Get, Login, Patch, Post } from "./AxiosRequester"

export const UserApi = {
  login: async (json: any) => Login<any>("/api_anganwadi/public/login/mpin", json),
  update: async (id: number | string, json: any) =>
    await Patch<any>(`/api_anganwadi/public/anganwadi_user/update/${id}`, json),
  // forgotPassword:async()=>await
  forgotMpin: async (json: any) =>
    await Post<any>("/api_anganwadi/public/ForgotMpin/forgotMpin", json),
  resetMpin: async (json: any) =>
    await Post<any>(`/api_anganwadi/public/ForgotMpin/resetMpin`, json),
  updateMpin: async (json: any) =>
    await Post<any>(`/api_anganwadi/public/ForgotMpin/updateMpin`, json),
}

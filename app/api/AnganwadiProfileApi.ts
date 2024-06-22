import { Delete, Get, Patch, Post, UploadFile } from "./AxiosRequester"

export const AngamwadiProfileApi = {
  updateAnganwadiType: async (anganwadiId: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/anganwadi/update/${anganwadiId}`, jsonData),
  updateAnganwadiSevikaWorkers: async (anganwadiId: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/AnganwadiStaff/update/${anganwadiId}`, jsonData),
  createStaff: async (jsonData: any) =>
    await Post<any>("/api_anganwadi/public/AnganwadiStaff/create", jsonData),
  getStaffList: async () => await Get<any>(`/api_anganwadi/public/AnganwadiStaff/listAll`),
  deleteStaff: async (id: number | string) =>
    await Delete<any>(`/api_anganwadi/public/AnganwadiStaff/delete/${id}`),
  updateStaff: async (anganwadiId: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/AnganwadiStaff/update/${anganwadiId}`, jsonData),
  
}

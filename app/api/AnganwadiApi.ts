import { Delete, Get, Patch, Post, UploadFile } from "./AxiosRequester"

export const AnganwadiApi = {
  createService: async (jsonData: any) =>
    await Post<any>("/api_anganwadi/public/service-issues/create", jsonData),
  createPlayingToyService: async (jsonData: any) =>
    await Post<any>(`/api_anganwadi/public/KhelaniServiceIssues/create`, jsonData),
  upload: async (jsonData: any) =>
    await UploadFile<any>("/storage/public/api/upload/asmita", jsonData),
  getService: async (anganwadi_id: string | number, service_id: string | number) =>
    await Get<any>(`/api_anganwadi/public/services/${anganwadi_id}/${service_id}`),
  getImediateReport: async (anganwadi_id: number | string) =>
    await Get<any>(`/api_anganwadi/public/getBuidlingReport/${anganwadi_id}`),
  postImediateInfo: async (jsonData: any) =>
    await Post<any>("/api_anganwadi/public/buildingStatus/report", jsonData),
  getSuvidhas: async () => Get<any>("/api_anganwadi/public/services/listAll"),
  getSubTypeSuvidha: async (suvidha_id: number | string) =>
    await Get<any>(`/api_anganwadi/public/services/showSubServices/${suvidha_id}`),
  getAnganwadiSuvidha: async (anganvadi_id: number | string, suvidha_id: number | string) =>
    await Get<any>(`/api_anganwadi/public/services/${anganvadi_id}/${suvidha_id}`),
  getAnganwadiPlayingToyExist: async (anganvadi_id: number | string, toy_id: string | number) =>
    await Get<any>(
      `/api_anganwadi/public/KhelaniServiceIssues/getService/${anganvadi_id}/${toy_id}`,
    ),
  getSchemes: async () => await Get<any>(`/api_anganwadi/public/schemeregister/lisAll`),
  createAnganwadiSmartStatus: async (json: any) =>
    await Post<any>(`/api_anganwadi/public/smartStatus/create`, json),
  getAnganwadiSmartStatus: async (anganvadi_id: number | string) =>
    await Get<any>(`/api_anganwadi/public/smartStatus/${anganvadi_id}`),
  createPlayingToy: async (jsonData: any) =>
    await Post<any>(`/api_anganwadi/public/KhelaniSubServices/create`, jsonData),
  getPlayingToys: async (anganwadiId: string | number) =>
    await Get<any>(`/api_anganwadi/public/KhelaniSubServices/listAll/${anganwadiId}`),
  updatePlayingToy: async (anaganwadiId: number | string, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/KhelaniSubServices/update/${anaganwadiId}`, jsonData),
  deletePlayingToy: async (playingToyID: number | string) =>
    await Delete<any>(`/api_anganwadi/public/KhelaniSubServices/delete/${playingToyID}`),
  getServicesesListByMonth: async (anganwadiId: number | string) =>
    await Get<any>(`/api_anganwadi/public/serviceissues/listServiceIssuesByMonth/${anganwadiId}`),
  getServiseByMonth: async (anganwadiId: number | string, jsonData: any) =>
    await Post<any>(
      `/api_anganwadi/public/serviceissues/ServiceIssuesByMonth/${anganwadiId}`,
      jsonData,
    ),
}

export const AngamwadiProfileApi = {
  updateAnganwadiType: async (anganwadiId: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/anganwadi/update/${anganwadiId}`, jsonData),
  updateAnganwadiSevikaWorkers: async (anganwadiId: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/AnganwadiStaff/update/${anganwadiId}`, jsonData),
  createStaff: async (jsonData: any) =>
    await Post<any>("/api_anganwadi/public/AnganwadiStaff/create", jsonData),
  updateSmartAnganwadi: async (id: string | number, jsonData: any) =>
    await Patch<any>(`/api_anganwadi/public/smartStatus/update/${id}`, jsonData),
  showSmartAnganwadi: async (anganwadi_id: number | string) => {
    return await Get<any>(`/api_anganwadi/public/smartStatus/${anganwadi_id}`)
  },
  showAnganwadiProfile: async (anganwadi_id: number | string) => {
    return await Get<any>(`/api_anganwadi/public/anganwadi/${anganwadi_id}`)
  },
}

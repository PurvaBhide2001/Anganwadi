import { Post, Get } from "./AxiosRequester"

export const ReportApi = {
  submitPSEReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/PSEReport/create`, jsonData)
  },
  submitBirthRateReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/BirthRate/create`, jsonData)
  },
  submitLBWReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/LBWReport/create`, jsonData)
  },
  submitHBOInfoReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/HbInfo/create`, jsonData)
  },
  submitFinalHealthReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/FinalHealthCheckup/create`, jsonData)
  },
  submitShauchalayReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/ShauchalayBandhkamDurusti/create`, jsonData)
  },
  submitAadharReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/FinalAadhar/create`, jsonData)
  },
  submitHBBMIKishori: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/KishoriHbBmi/create`, jsonData)
  },
  submitSuwMuwReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/SuwMuwSudharna/create`, jsonData)
  },
  submitBalaReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/Bala/create`, jsonData)
  },
  submitSamMamReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/SamMamReport/create`, jsonData)
  },
  submitVCDCReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/Vcdc/create`, jsonData)
  },
  submitNutritionalReport: async (jsonData: any) => {
    return await Post<any>(`/api_anganwadi/public/NutritonalStatus/create`, jsonData)
  },
}

export const ReportShowApi = {
  getAadharReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/FinalAadhar/show/${anganwadiId}/${yyyy_mm}`)
  },
  getBalaReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/Bala/show/${anganwadiId}/${yyyy_mm}`)
  },
  getPSEReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/PSEReport/show/${anganwadiId}/${yyyy_mm}`)
  },
  getBirthRateReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/BirthRate/show/${anganwadiId}/${yyyy_mm}`)
  },
  getLBWReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/LBWReport/show/${anganwadiId}/${yyyy_mm}`)
  },
  getHBinfoReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/HbInfo/show/${anganwadiId}/${yyyy_mm}`)
  },
  getFinalHealthReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/FinalHealthCheckup/show/${anganwadiId}/${yyyy_mm}`)
  },
  getShaucalayReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(
      `/api_anganwadi/public/ShauchalayBandhkamDurusti/show/${anganwadiId}/${yyyy_mm}`,
    )
  },

  getHBBMIKishori: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/KishoriHbBmi/show/${anganwadiId}/${yyyy_mm}`)
  },
  getSuwMuwReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/SuwMuwSudharna/show/${anganwadiId}/${yyyy_mm}`)
  },

  getSamMamReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/SamMamReport/show/${anganwadiId}/${yyyy_mm}`)
  },
  getVcdcReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/Vcdc/show/${anganwadiId}/${yyyy_mm}`)
  },
  getNutritionReport: async (anganwadiId: number | string, yyyy_mm: number | string) => {
    return await Get<any>(`/api_anganwadi/public/NutritonalStatus/show/${anganwadiId}/${yyyy_mm}`)
  },
}

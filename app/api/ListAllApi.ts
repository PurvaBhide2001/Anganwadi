import { Get, Post } from "./AxiosRequester"

export const ListAllApi = {
  getAnganwadiList: async () => await Get<any>("/api_anganwadi/public/anganwadi/listAll"),
  getStudentsOnAnganwadi: async () => await Get(`/api_anganwadi/public/anganwadi/listAll`),

  getPrakalpaList: async () => await Get<any>("/api_anganwadi/public/prakalpa/listAll"),
  getBitList: async () => await Get<any>("/api_anganwadi/public/bit"),
  getBitListAsPerPrakalapaID: async (jsonData: any) =>
    await Post<any>(`/api_anganwadi/public/bit/getReport`, jsonData),
  getSansadhaneList: async () => await Get<any>("/api_anganwadi/public/ResourceCenter/listAll"),

  getSuchanaList: async () => await Get<any>("/api_anganwadi/public/SuchnaFalak/listAll"),

  //   getBitList: async (id: number | string) => {
  //     return Get<any>(`/api_anganwadi/public/bit/${id}`)
  //   },
  getAakarList: async () => await Get<any>("/api_anganwadi/public/aakar/listAll"),
  getImportantLinkList: async () =>
    await Get<any>("/api_anganwadi/public/ImportantWebsites/listAll"),
}

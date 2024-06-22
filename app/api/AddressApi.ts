import { Get } from "./AxiosRequester"

export const AddressApi = {
  getStates: async () => {
    return Get<any>("/demographic-info/public/states/all")
  },
  getDistricts: async (stateCode: number | string) => {
    return Get<any>(`/demographic-info/public/districts/${stateCode}`)
  },
  getBlocks: async (districtCode: number | string) => {
    return Get<any>(`/demographic-info/public/blocks/${districtCode}`)
  },
  getVillage: async (blockCode: number | string) => {
    return Get<any>(`/demographic-info/public/block/get/villages/${blockCode}`)
  },
  getBit: async (prakalpaCode: number | string) => {
    return Get<any>(`/api_anganwadi/public/bit/${prakalpaCode}`)
  },
}

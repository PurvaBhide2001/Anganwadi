import { Get } from "./AxiosRequester"
export const GetParticularStateApi = {
  getParticularState: async (state_code: string | number) =>
    await Get<any>(`/demographic-info/public/state/find/${state_code}`),
}

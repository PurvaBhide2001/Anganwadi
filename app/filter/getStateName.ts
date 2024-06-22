import { GetParticularStateApi } from "../api/PerticularAddressApi"

export const getStateName = async (state_code: number | string) => {
  if (!state_code) return
  const {
    result: { data },
  } = await GetParticularStateApi.getParticularState(state_code)
  if (!data) return
  const [{ state_title }] = data
  return state_title
}

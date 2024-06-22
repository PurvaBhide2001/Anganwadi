import { createContext, useContext, useEffect, useState } from "react"
import { ListAllApi } from "../api/ListAllApi"

import { AddressApi } from "./../api/AddressApi"
interface AddressContextInterface {
  states: any
  districts: any[]
  talukas: any
  grampanchayats: any
  villages: any
  setSelectedState: Function
  setSelectedDistrict: Function
  setSelectedTaluka: Function
  setSelectedGrampanchayat: Function
  setSelectedVillage: Function
  selectedState: string | number
  selectedDistrict: string | number
  selectedTaluka: string | number
  selectedGrampanchayat: string | number
  selectedVillage: string | number
  selectedPrakalpa: any[]
  bitList: any[]
  setSelectedPrakalpaId: Function
}
type AddressContextType = { children: React.ReactNode }
const AddressContext = createContext<null | AddressContextInterface>(null)
export const AddressContextProvider = ({ children }: AddressContextType) => {
  const [states, setStates] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [talukas, setTalukas] = useState<any[]>([])
  const [grampanchayats, setGrampanchayats] = useState<any[]>([])
  const [villages, setVillages] = useState("")
  const [selectedState, setSelectedState] = useState<string | number>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string | number>("")
  const [selectedTaluka, setSelectedTaluka] = useState<string | number>("")
  const [selectedGrampanchayat, setSelectedGrampanchayat] = useState<string | number>("")
  const [selectedVillage, setSelectedVillage] = useState<string | number>("")
  const [selectedPrakalpa, setSelectedPrakalpa] = useState<any>([])
  const [bitList, setbitList] = useState<any>([])
  const [selectedPrakalpaId, setSelectedPrakalpaId] = useState<number | string>("")

  useEffect(() => {
    ;(async () => {
      const { result: { data: { data = [] } = {} } = {} } = await AddressApi.getStates()

      data && setStates(data)
    })()
  }, [])

  useEffect(() => {
    // console.log("selectedState", selectedState)
    if (!selectedState) return
    ;(async () => {
      const {
        result: {
          data: { data, status },
        },
      } = await AddressApi.getDistricts(selectedState)
      // console.log("district data", data, status)
      data && setDistricts(data)
    })()
  }, [selectedState])

  // useEffect(() => {
  //   ;(async () => {
  //     if (!selectedState) return
  //     const {
  //       result: {
  //         data: { data },
  //       },
  //     } = await AddressApi.getDistricts(selectedState)
  //     console.log("this is recent", data)
  //     data && setDistricts(data)
  //   })()
  // }, [selectedState])

  useEffect(() => {
    if (!selectedDistrict) return
    ;(async () => {
      const {
        result: {
          data: { data },
        },
      } = await AddressApi.getBlocks(selectedDistrict)
      data && setTalukas(data)
    })()
  }, [selectedDistrict])

  /*   useEffect(() => {
    if (!selectedTaluka) return;
    (async () => {
      const { result } = await GetGrampanchayatsApi.getGrampanchayats(selectedTaluka);
      result && setGrampanchayats(result);
    })();
  }, [selectedTaluka]); */

  useEffect(() => {
    if (selectedTaluka)
      (async () => {
        const {
          result: {
            data: { data },
          },
        } = await AddressApi.getVillage(selectedTaluka)
        data && setVillages(data)
      })()
  }, [selectedTaluka])

  useEffect(() => {
    ;(async () => {
      const {
        result: {
          data: { data },
        },
      } = await ListAllApi.getPrakalpaList()
      data && setSelectedPrakalpa(data)
    })()
  }, [])

  useEffect(() => {
    if (!selectedPrakalpaId) return
    ;(async () => {
      const {
        result: {
          data: { data, status },
        },
      } = await ListAllApi.getBitListAsPerPrakalapaID({ prakalpa: selectedPrakalpaId })
      // } = await ListAllApi.getBitList(selectedPrakalpaId)
      console.log("data, status data, status ", data, status)
      data && setbitList(data)
    })()
  }, [selectedPrakalpaId])
  // }, [selectedPrakalpaId])

  const value: AddressContextInterface = {
    states,
    districts,
    talukas,
    grampanchayats,
    villages,
    setSelectedState,
    setSelectedDistrict,
    setSelectedTaluka,
    setSelectedGrampanchayat,
    setSelectedVillage,
    selectedState,
    selectedDistrict,
    selectedTaluka,
    selectedGrampanchayat,
    selectedVillage,
    selectedPrakalpa,
    bitList,
    setSelectedPrakalpaId,
  }
  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
}

export const useAddressContext = () => {
  const context = useContext(AddressContext)
  if (!context) {
    throw new Error("useAddressContext must be used within a AddressContextProvider component")
  }
  return context
}

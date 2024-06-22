import { useToast } from "native-base"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"

import { Platform } from "react-native"
import { AnganwadiApi } from "../api/AnganwadiApi"
import { monthDateFormat } from "../filter/dateAndTimeFormat"
import { navigate } from "../navigators"
import { useCommanContextContext } from "./CommanContext"
import { useLoginContext } from "./LoginContext"

interface SuvidhaDetailShowContextInterface {
  OnPressToShowDoneServiceList: Function
  selectedServicesArray: any[]
  onPressShowParticularDoneItem: Function
  selectedParticularDoneItem: any
}
const SuvidhaDetailShowContext = createContext<null | SuvidhaDetailShowContextInterface>(null)

type SuvidhaDetailShowContextProps = { children: React.ReactNode }

export const SuvidhaDetailShowContextProvider = ({ children }: SuvidhaDetailShowContextProps) => {
  const [selectedParticularDoneItem, setSelectedParticularDoneItem] = useState<any>(null)
  const [selectedServicesArray, setSelectedServicesArray] = useState<any[]>([])

  const { useData } = useLoginContext()

  const OnPressToShowDoneServiceList = async (date: string) => {
    const jsonData = {
      month_year: date,
    }
    const { result: { data: { data = [], status = 204 } = {} } = {} } =
      await AnganwadiApi.getServiseByMonth(useData?.anganwadi_id, jsonData)
    console.log("data", data)
    status == 204 && setSelectedServicesArray([])
    status == 200 && setSelectedServicesArray(data)
    navigate("MahitiBaghaDetailList")
  }
  const onPressShowParticularDoneItem = (item: any) => {
    setSelectedParticularDoneItem(item)
    navigate("ShowParticularSuvidhaDetail")
  }

  const value: SuvidhaDetailShowContextInterface = {
    OnPressToShowDoneServiceList,
    selectedServicesArray,
    onPressShowParticularDoneItem,
    selectedParticularDoneItem,
  }
  return (
    <SuvidhaDetailShowContext.Provider value={value}>{children}</SuvidhaDetailShowContext.Provider>
  )
}

export const useSuvidhaDetailShowContext = () => {
  const context = useContext(SuvidhaDetailShowContext)
  if (!context)
    throw new Error("use SuvidhaDetailShow context use in SuvidhaDetailShow context provider")
  return context
}

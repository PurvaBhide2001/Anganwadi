import { createContext, useContext, useEffect, useState } from "react"
import { ListAllApi } from "../api/ListAllApi"
interface AakarContextInterface {
  Aakar: any[]
}
type AakarContextType = { children: React.ReactNode }
const AakarContext = createContext<null | AakarContextInterface>(null)
export const AakarContextProvider = ({ children }: AakarContextType) => {
  const [Aakar, setAakar] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const { result: { data: { data = [] } = {} } = {} } = await ListAllApi.getAakarList()
      console.log("aakar Data result", data)
      data && setAakar(data)
    })()
  }, [])

  const value: AakarContextInterface = {
    Aakar,
  }
  return <AakarContext.Provider value={value}>{children}</AakarContext.Provider>
}

export const useAakarContext = () => {
  const context = useContext(AakarContext)
  if (!context) {
    throw new Error("useAakarContext must be used within a AakarContextProvider component")
  }
  return context
}

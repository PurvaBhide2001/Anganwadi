import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { ListAllApi } from "../api/ListAllApi"
import { navigate } from "../navigators"
interface SansadhaneContextInterface {
  sansadhane: any[]
  onSelectSansadhan: Function
  particularSansadhan: any
  refreshSansadhan: boolean
  onRefreshSansadhan: Function
}
type SansadhaneContextType = { children: React.ReactNode }
const SansadhaneContext = createContext<null | SansadhaneContextInterface>(null)
export const SansadhaneContextProvider = ({ children }: SansadhaneContextType) => {
  const [sansadhane, setSansadhane] = useState<any[]>([])
  const [refreshSansadhan, setRefereshSansadhan] = useState(false)
  const [particularSansadhan, setParticularSansadhan] = useState<any>(null)
  const getSansandhan = useCallback(async () => {
    const { result: { data: { data = [] } = {} } = {} } = await ListAllApi.getSansadhaneList()
    data && setSansadhane(data)
  }, [])

  const onRefreshSansadhan = useCallback(async () => {
    // await getSchemeList()
    setRefereshSansadhan(true)
    await getSansandhan()
    setTimeout(() => {
      setRefereshSansadhan(false)
    }, 2000)
  }, [])
  useEffect(() => {
    ;(async () => {
      await getSansandhan()
    })()
  }, [])

  const onSelectSansadhan = (item: any) => {
    setParticularSansadhan(item)
    navigate("SpecificResource")
  }

  const value: SansadhaneContextInterface = {
    sansadhane,
    onSelectSansadhan,
    particularSansadhan,
    refreshSansadhan,
    onRefreshSansadhan,
  }
  return <SansadhaneContext.Provider value={value}>{children}</SansadhaneContext.Provider>
}

export const useSansadhaneContext = () => {
  const context = useContext(SansadhaneContext)
  if (!context) {
    throw new Error(
      "useSansadhaneContext must be used within a SansadhaneContextProvider component",
    )
  }
  return context
}

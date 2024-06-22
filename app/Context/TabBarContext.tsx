import React, { createContext, useContext, useRef, useState } from "react"
import { Dimensions } from "react-native"
import { TabView, SceneMap } from "react-native-tab-view"
import { navigate } from "../navigators"
import NewReport from "../screens/ImediateInformationReport/NewReport"
import SentReport from "../screens/ImediateInformationReport/SentReport"
import UnsentReport from "../screens/ImediateInformationReport/UnsentReport"
import QuestionsAndSurveyDetailItem from "../screens/OverallFeedBack/QuestionsAndSurveyDetailItem"
interface TabBarContextInterface {
  index: number
  setIndex: Function
  routes: any
  initialLayout: any
  renderScene: any
  setSceneData: Function
  setRoutes: Function
  selectedItem: any
  setSelectedItem: Function
  passToTheData: Function
}
const TabBarContext = createContext<null | TabBarContextInterface>(null)

type TabBarContextProps = { children: React.ReactNode }

export const TabBarContextProvider = ({ children }: TabBarContextProps) => {
  const [index, setIndex] = useState<number>(0)
  const [isImageComming, setIsImageCommig] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [sceneData, setSceneData] = useState<any>(null)
  const [routes, setRoutes] = useState([])

  const passToTheData = (item: any) => {
    setSelectedItem(item)
    navigate("Reporting")
  }
  const initialLayout = {
    width: Dimensions.get("window").width,
  }
  const renderScene = SceneMap(sceneData)

  const value: TabBarContextInterface = {
    index,
    setIndex,
    routes,
    initialLayout,
    renderScene,
    selectedItem,
    setSelectedItem,
    passToTheData,
    setSceneData,
    setRoutes,
  }
  return <TabBarContext.Provider value={value}>{children}</TabBarContext.Provider>
}

export const useTabBarContextContext = () => {
  const context = useContext(TabBarContext)
  if (!context) throw Error("use TabBarContext in  TabBarContext screen context provider!!")
  return context
}

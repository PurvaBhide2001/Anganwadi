import React, { createContext, useContext, useRef, useState } from "react"
import { Dimensions } from "react-native"
import { TabView, SceneMap } from "react-native-tab-view"
import { navigate } from "../navigators"
import NewReport from "../screens/ImediateInformationReport/NewReport"
import SentReport from "../screens/ImediateInformationReport/SentReport"
import UnsentReport from "../screens/ImediateInformationReport/UnsentReport"

interface ImediateInformationContextInterface {
  index: number
  setIndex: Function
  routes: any
  initialLayout: any
  renderScene: any
  NewReportData: any
  selectedItem: any
  setSelectedItem: Function
  passToTheData: Function
}
const ImediateInformationContext = createContext<null | ImediateInformationContextInterface>(null)

type ImediateInformationContextProps = { children: React.ReactNode }

export const ImediateInformationContextProvider = ({
  children,
}: ImediateInformationContextProps) => {
  const [index, setIndex] = useState<number>(0)
  const [isImageComming, setIsImageCommig] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [NewReportData] = useState<any>([
    {
      id: 1,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),
      name: "तत्काळ माहिती अहवाल ",
      format: "data pass to the pdf format",
    },
    {
      id: 2,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),
      name: "दुरुस्ती विषयी  अहवाल ",
      format: "data pass to the pdf format",
    },
    {
      id: 3,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),
      name: "वस्तू खरेदी अहवाल",
      format: "data pass to the pdf format",
    },
    {
      id: 4,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),
      name: "तत्काळ माहिती अहवाल",
      format: "data pass to the pdf format",
    },
    {
      id: 5,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),

      name: "दुरुस्ती विषयी अहवाल",
      format: "data pass to the pdf format",
    },
    {
      id: 6,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),

      name: "वस्तू खरेदी अहवाल",
      format: "data pass to the pdf format",
    },
    {
      id: 7,
      reportData: "",
      icon: require("../../assets/surveyimages/svgtopng/img4.png"),

      name: "तत्काळ माहिती अहवाल",
      format: "data pass to the pdf format",
    },
  ])
  const [routes] = useState([
    {
      key: "first",
      title: "नवीन अहवाल",
    },
    {
      key: "second",
      title: "न पाठवलेला अहवाल",
    },
    {
      key: "third",
      title: "पाठवलेला अहवाल",
    },
  ])
  const passToTheData = (item: any) => {
    setSelectedItem(item)
    navigate("Reporting")
  }
  const initialLayout = {
    width: Dimensions.get("window").width,
  }
  const renderScene = SceneMap({
    first: NewReport,
    second: UnsentReport,
    third: SentReport,
  })
  const value: ImediateInformationContextInterface = {
    index,
    setIndex,
    routes,
    initialLayout,
    renderScene,
    NewReportData,
    selectedItem,
    setSelectedItem,
    passToTheData,
  }
  return (
    <ImediateInformationContext.Provider value={value}>
      {children}
    </ImediateInformationContext.Provider>
  )
}

export const useImediateInformationContext = () => {
  const context = useContext(ImediateInformationContext)
  if (!context) throw Error("use ImediateInformation in  ImediateInformation context provider!!")
  return context
}

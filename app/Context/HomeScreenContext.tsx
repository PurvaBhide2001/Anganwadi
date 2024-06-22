import React, { createContext, useContext, useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { navigate } from "../navigators"
import { UserApi } from "../api/UserApi"
interface HomeScreenContextInterface {
  updateProfile: Function
  chooseStudent: Function
  evaluationDoIt: Function
  evaluationWatch: Function
  immediatelyInformation: Function
  anganwadiFacility: Function
  weeklyProgress: Function
  monthlyProgress: Function
  menuData: any
}
const HomeScreenContext = createContext<null | HomeScreenContextInterface>(null)

type HomeScreenContextProps = { children: React.ReactNode }

export const HomeScreenContextProvider = ({ children }: HomeScreenContextProps) => {
  const [menuData] = useState<any>([
    {
      title: "मूल्यमापन करा",
      icon: require("../../assets/surveyimages/svgtopng/img10.png"),
      bgcolor: "#e1efe3",
      bottomBorderColor: "#94e7a0",
      textColor: "#009a3e",
      event: () => navigate("ShowProfile"),
    },
    {
      title: "मूल्यमापन बघा",
      icon: require("../../assets/surveyimages/svgtopng/img11.png"),
      bgcolor: "#fdf3ea",
      bottomBorderColor: "#f8d1ae",
      textColor: "#ff0000",
      event: () => navigate("OverallFeedBack"),
    },
    {
      title: "प्रोफाइल अपडेट करा",
      icon: require("../../assets/surveyimages/svgtopng/img5.png"),
      bgcolor: "#f9f4e0",
      bottomBorderColor: "#fae490",
      textColor: "#ff9900",
      event: () => navigate("EditProfile"),
    },
{
      title: "लाभार्थी निवाडा",
      icon: require("../../assets/surveyimages/svgtopng/img6.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      textColor: "#0070ae",
      event: () => navigate("ChooseStudent"),
    },
    {
      title: "मासिक प्रगती अहवाल",
      icon: require("../../assets/surveyimages/svgtopng/img10.png"),
      bgcolor: "#e1efe3",
      bottomBorderColor: "#94e7a0",
      textColor: "#009a3e",
      event: () => navigate("FeedBack"),
    },
    {
      title: "साप्ताहिक प्रगती अहवाल",
      icon: require("../../assets/surveyimages/svgtopng/img11.png"),
      bgcolor: "#fdf3ea",
      bottomBorderColor: "#f8d1ae",
      textColor: "#f00",
      event: () => navigate("Student"),
    },
    {
      title: "अंगणवाडी सुविधा",
      icon: require("../../assets/surveyimages/svgtopng/img5.png"),
      bgcolor: "#f9f4e0",
      bottomBorderColor: "#fae490",
      textColor: "#ff9900",
      event: () => navigate("AnganwadiSuvidha"),
    },
    {
      title: "तत्काळ माहिती",
      icon: require("../../assets/surveyimages/svgtopng/img6.png"),
      bgcolor: "#e6e3f8",
      bottomBorderColor: "#a89aff",
      textColor: "#0070ae",
      event: () => navigate("ImediateInformation"),
    },
  ])

  const updateProfile = () => {
    // navigate.current.value()
  }

  const chooseStudent = () => {
    navigate("ChooseStudent")
  }
  const evaluationDoIt = () => {
    navigate("Evaluation")
  }
  const evaluationWatch = () => {
    navigate("LoginPage1")
  }
  const monthlyProgress = () => {
    navigate("Evaluation")
  }
  const weeklyProgress = () => {
    navigate("Student")
  }
  const anganwadiFacility = () => {
    navigate("AnganwadiSuvidha")
  }
  const immediatelyInformation = () => {
    navigate("ImediateInformation")
  }
  const value: HomeScreenContextInterface = {
    updateProfile,
    chooseStudent,
    evaluationDoIt,
    evaluationWatch,
    immediatelyInformation,
    anganwadiFacility,
    weeklyProgress,
    monthlyProgress,
    menuData,
  }
  return <HomeScreenContext.Provider value={value}>{children}</HomeScreenContext.Provider>
}

export const useHomeScreenContext = () => {
  const context = useContext(HomeScreenContext)
  if (!context) throw Error("use homescreen context in  home screen context provider!!")
  return context
}

//comment
